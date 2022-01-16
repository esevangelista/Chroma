import { all, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { CometChat } from '@cometchat-pro/chat';

import {
  FETCH_UNREAD_COUNT_REQUEST,
  fetchUnreadCountSuccess,
  fetchUnreadCountFailed,
  FETCH_MSGS_REQUEST,
  fetchMsgsSuccess,
  fetchMsgsFailed,
  FETCH_CONVO_REQUEST,
  fetchConvoSuccess,
  fetchConvoFailed,
} from '../ducks/chat';
import { ccRequest } from '../api/apiRequest';

const apiKey = process.env.REACT_APP_COMETCHAT_REST_API_KEY;
const APP_ID = process.env.REACT_APP_COMETCHAT_APP_ID;
const chatRegion = 'us';
export const getUserID = state => state.user.profile._id;

const group = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const groupUser = function (xs, me) {
  return xs.reduce(function (rv, x) {
    (rv[x[x.sender === me ? 'receiver' : 'sender']] = rv[x[x.sender === me ? 'receiver' : 'sender']] || []).push(x);
    return rv;
  }, {});
};

export function* fetchUnreadCount() {
  try {
    const subjectUid = yield select(getUserID);
    const response = yield call(
      ccRequest,
      {
        method: 'GET',
        url: `https://${APP_ID}.api-${chatRegion}.cometchat.io/v3/messages`,
        qs: { unread: 'true', count: 'true' },
        headers: {
          onBehalfOf: subjectUid,
          apikey: apiKey,
          'content-type': 'application/json',
          accept: 'application/json',
        },
      },
    );
    const { data } = response.data;
    const grouped = data.filter(d => d.sender !== subjectUid && !d.readAt && d.category === 'message' && !d.deletedAt).length > 0 ? group(data.filter(d => d.sender !== subjectUid && !d.readAt && d.category === 'message' && !d.deletedAt), 'sender') : [];
    if (response.status === 200) yield put(fetchUnreadCountSuccess(Object.keys(grouped).length));
    else yield put(fetchUnreadCountFailed('Something went wrong.'));
  } catch (err) {
    const { message } = err;
    yield fetchUnreadCountFailed(message);
  }
}

export function* fetchMsgs() {
  try {
    const subjectUid = yield select(getUserID);
    const response = yield call(
      ccRequest,
      {
        method: 'GET',
        url: `https://${APP_ID}.api-${chatRegion}.cometchat.io/v3/conversations`,
        headers: {
          apikey: apiKey,
          onBehalfOf: subjectUid,
          'content-type': 'application/json',
          accept: 'application/json',
        },
        params: {
          category: 'message',
          hideDeleted: true,
        },
      },
    );
    const { data } = response.data;
    if (response.status === 200) yield put(fetchMsgsSuccess(data));
    else yield put(fetchMsgsFailed('Something went wrong.'));
  } catch (err) {
    const { message } = err;
    yield put(fetchMsgsFailed(message));
  }
}

export function* fetchConvo(action) {
  const subjectUid = yield select(getUserID);
  try {
    const res = yield call(
      ccRequest,
      {
        method: 'GET',
        url: `https://${APP_ID}.api-${chatRegion}.cometchat.io/v3/users/${action.uid}/conversation`,
        headers: {
          apikey: apiKey,
          onBehalfOf: subjectUid,
          'content-type': 'application/json',
          accept: 'application/json',
        },
      },
    );
    if (res.status === 200) {
      const response = yield call(
        ccRequest,
        {
          method: 'GET',
          url: `https://${APP_ID}.api-${chatRegion}.cometchat.io/v3/messages`,
          headers: {
            apikey: apiKey,
            onBehalfOf: subjectUid,
            'content-type': 'application/json',
            accept: 'application/json',
          },
          params: {
            category: 'message',
            hideDeleted: true,
            conversationId: res.data.data.conversationId,
          },
        },
      );
      if (response.status === 200) {
        let convo = response.data.data;
        convo = groupBy(convo, (result => (moment.unix(result.sentAt)).startOf('day')));
        yield put(fetchConvoSuccess(convo, res.data.data.conversationWith));
      } else yield put(fetchConvoFailed(response.data.statusText));
    } else yield put(fetchConvoFailed('User not found.'));
  } catch (err) {
    const { message } = err;
    const userRequest = yield call(
      ccRequest,
      {
        method: 'GET',
        url: `https://${APP_ID}.api-${chatRegion}.cometchat.io/v3/users/${action.uid}`,
        headers: {
          apikey: apiKey,
          onBehalfOf: subjectUid,
          'content-type': 'application/json',
          accept: 'application/json',
        },
      },
    );
    if (userRequest.status === 200) {
      yield put(fetchConvoSuccess([], userRequest.data.data));
    } else {
      yield put(fetchConvoFailed(message));
    }
  }
}

export function* watchChatFlow() {
  yield [
    takeLatest(FETCH_CONVO_REQUEST, fetchConvo),
    takeEvery(FETCH_UNREAD_COUNT_REQUEST, fetchUnreadCount),
    takeLatest(FETCH_MSGS_REQUEST, fetchMsgs),
  ];
}

const chatSagas = [watchChatFlow()];

export default chatSagas;
