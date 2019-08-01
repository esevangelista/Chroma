import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { CometChat } from '@cometchat-pro/chat';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  CONFIRM_EMAIL_REQUEST,
  loginSuccess,
  loginFailed,
  logoutSuccess,
  logoutFailed,
  registerSuccess,
  registerFailed,
  confirmEmailSuccess,
  confirmEmailFailed,
} from '../ducks/auth';
import { alertDisplay } from '../ducks/feedback';
import { postRequestService, putRequestService } from '../api/apiRequest';

const apiKey = 'cc5496065bfe7d67d2cf1f1f442e83853d07cdc8';
export function* loginFlow(action) {
  try {
    const response = yield call(postRequestService, '/login', action.data);
    const { success, user } = response.data;
    if (success) {
      yield put(loginSuccess(response.data.message));
      yield put(push('/'));
      // CometChat.login(user._id, apiKey).then(
      //   user => {
      //     console.log("Login Successful:", { user });    
      //   },
      //   error => {
      //     console.log("Login failed with exception:", { error });    
      //   },
      // );
    } else {
      yield put(loginFailed(response.data.message));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(loginFailed(message));
  }
}

export function* logoutFlow() {
  try {
    const response = yield call(postRequestService, '/logout');
    const { success } = response.data;
    if (success) {
      yield put(logoutSuccess());
      yield put(push('/'));
    } else {
      yield put(logoutFailed(response.data.message));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(logoutFailed(message));
  }
}

export function* registerFlow(action) {
  try {
    const response = yield call(postRequestService, '/users', action.data);
    const { success } = response.data;
    if (success) {
      yield put(registerSuccess(response.data.message));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(registerFailed(message));
  }
}

export function* confirmEmailFlow(action) {
  try {
    const response = yield call(putRequestService, `/verify-account/${action.data}`);
    const { success, message } = response.data;
    if (success) {
      yield put(confirmEmailSuccess(message));
      yield put(push('/'));
      yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(confirmEmailFailed(message));
      yield put(push('/notfound'));
      yield put(alertDisplay({ alertType: 'error', message }));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(confirmEmailFailed(message));
  }
}

export function* watchAuthFlow() {
  yield [
    takeEvery(LOGIN_REQUEST, loginFlow),
    takeEvery(LOGOUT_REQUEST, logoutFlow),
    takeEvery(REGISTER_REQUEST, registerFlow),
    takeEvery(CONFIRM_EMAIL_REQUEST, confirmEmailFlow),
  ];
}

const authSagas = [watchAuthFlow()];

export default authSagas;
