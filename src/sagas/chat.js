import { takeLatest } from 'redux-saga';
import { all, call, put, select } from 'redux-saga/effects';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
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

const apiKey = 'c1b0d0cdc1c30c162982192c0842b8470975e453';
const APP_ID = '60893392e15857';
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
        url: `https://api.cometchat.com/v1.8/users/${subjectUid}/messages`,
        qs: { unread: 'true', count: 'true' },
        headers: {
          appId: APP_ID,
          apikey: apiKey,
          'content-type': 'application/json',
          accept: 'application/json',
        },
      },
    );
    const { data } = response.data;
    const grouped = data.filter(d => d.sender !== subjectUid && !d.readAt).length > 0 ? group(data.filter(d => d.sender !== subjectUid  && !d.readAt), 'sender') : [];
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
        url: `https://api.cometchat.com/v1.8/users/${subjectUid}/messages`,
        headers: {
          appid: APP_ID,
          apikey: apiKey,
          'content-type': 'application/json',
          accept: 'application/json',
        },
      },
    );
    const { data } = response.data;
    const grouped = data.length > 0 ? groupUser(data, subjectUid) : [];
    const res = yield all(Object.keys(grouped).map(g =>
      call(
        ccRequest,
        {
          method: 'GET',
          url: `https://api.cometchat.com/v1.8/users/${subjectUid}/users/${g}/messages`,
          headers: {
            appid: APP_ID,
            apikey: apiKey,
            'content-type': 'application/json',
            accept: 'application/json',
          },
        },
      )));
    const messages = [];
    res.map(r => r.status === 200 ? messages.push(r.data.data.filter(d => d.category === 'message' && !d.deletedAt)) : null);
    const sorted = messages.length > 0 ? messages.sort((a, b) => {
      return parseInt(b[b.length - 1].id) - parseInt(a[a.length - 1].id);
    }) : [];
    if (response.status === 200) yield put(fetchMsgsSuccess(sorted));
    else yield put(fetchMsgsFailed('Something went wrong.'));
  } catch (err) {
    const { message } = err;
    yield put(fetchMsgsFailed(message));
  }
}

export function* fetchConvo(action) {
  try {
    const subjectUid = yield select(getUserID);
    const res = yield call(
      ccRequest,
      {
        method: 'GET',
        url: `https://api.cometchat.com/v1.8/users/${subjectUid}/users/${action.uid}`,
        headers: {
          appid: APP_ID,
          apikey: apiKey,
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
          url: `https://api.cometchat.com/v1.8/users/${subjectUid}/users/${action.uid}/messages`,
          headers: {
            appid: APP_ID,
            apikey: apiKey,
            'content-type': 'application/json',
            accept: 'application/json',
          },
        },
      );
      if (response.status === 200) {
        let convo = response.data.data;
        convo = convo.filter(c => c.category === 'message' && !c.deletedAt);
        convo = groupBy(convo, (result => (moment.unix(result.sentAt)).startOf('day')));
        yield put(fetchConvoSuccess(convo, res.data.data));
      } else yield put(fetchConvoFailed(response.data.statusText));
    } else yield put(fetchConvoFailed('User not found.'));
  } catch (err) {
    const { message } = err;
    yield put(fetchConvoFailed(message));
  }
}

export function* watchChatFlow() {
  yield [
    takeLatest(FETCH_CONVO_REQUEST, fetchConvo),
    takeLatest(FETCH_UNREAD_COUNT_REQUEST, fetchUnreadCount),
    takeLatest(FETCH_MSGS_REQUEST, fetchMsgs),
  ];
}

const chatSagas = [watchChatFlow()];

export default chatSagas;
