import { takeLatest, takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  CHECK_SESSION_EXISTS,
  fetchSessionSuccess,
  fetchSessionFailed,
} from '../ducks/users';
import { postRequestService, putRequestService, getRequestService } from '../api/apiRequest';

export const getSession = state => state.user.profile;


export function* fetchSession() {
  try {
    const response = yield call(postRequestService, '/session');
    const { data } = response;
    const { success } = data;
    if (success) {
      yield put(fetchSessionSuccess(data.user));
    }
  } catch (err) {
    yield put(fetchSessionFailed(err || 'Something went wrong.'));
  }
}
export function* checkSessionExists() {
  try {
    const profile = yield select(getSession);
    if (!profile || !profile.email) {
      yield call(fetchSession);
    }
  } catch (err) {
    yield put(fetchSessionFailed(err || 'Something went wrong'));
  }
}

export function* watchUserFlow() {
  yield [
    takeLatest(CHECK_SESSION_EXISTS, checkSessionExists),
  ];
}

const userSagas = [watchUserFlow()];

export default userSagas;

