import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
// import { push } from 'react-router-redux';

import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
} from './duck';

import { login } from '../../api/auth';

export function* loginFlow(action) {
  try {
    const response = yield call(login, { ...action.data });
    const { success } = response.data;
    if (success) {
      const { user } = response.data;
      yield put(loginSuccess(user));
    } else {
      yield put(loginFailure(response.data.message));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(loginFailure(message));
  }
}

export function* watchAuthFlow() {
  yield [
    takeEvery(LOGIN_REQUEST, loginFlow),
  ];
}

const authSagas = [watchAuthFlow()];

export default authSagas;
