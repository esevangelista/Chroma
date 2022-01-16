import { call, put, takeEvery } from 'redux-saga/effects';
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
import { postRequestService, putRequestService, ccRequest } from '../api/apiRequest';

const apiKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
export function* loginFlow(action) {
  try {
    const response = yield call(postRequestService, '/login', action.data);
    const { success, user } = response.data;
    if (success) {
      CometChat.login(user._id, apiKey).then(
        User => {
          console.log("Login Successful:", { User });
        },
        error => {
          console.log("Login failed with exception:", { error });
        },
      );
      yield put(loginSuccess(response.data.message));
      yield put(push('/'));
      yield put(alertDisplay({ alertType: 'success', message: `Welcome, ${user.firstName}!` }));
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
      CometChat.logout().then(
        console.log('Logout completed successfully'),
        error => console.log('Logout failed with exception:', { error }),
      );
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
    const { success, message, user } = response.data;
    if (success) {
      const cometChatUser = new CometChat.User(user.id);

      cometChatUser.setName(user.username);

      CometChat.createUser(user, process.env.REACT_APP_COMETCHAT_AUTH_KEY).then(
        (ccUser) => {
          console.log('comet chat user created', ccUser);
        },
        (error) => {
          console.log('error', error);
        },
      )
      yield put(registerSuccess(response.data.message));

    } else {
      yield put(registerFailed(message));
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
      // const APP_ID = '60893392e15857';
      // const res = yield call(ccRequest, {
      //   method: 'POST',
      //   mode: 'cors',
      //   url: 'https://api.cometchat.com/v1.8/users',
      //   headers: {
      //     appId: APP_ID,
      //     // apiKey: apiKey,
      //     appid: APP_ID,
      //     apiKey: apiKey,
      //     'content-type': 'application/json',
      //   },
      //   body: `{uid: ${u.id}, name: ${u.firstName}${u.lastName} }`,
      // });
      // if (res.status === 200) {
      yield put(confirmEmailSuccess(message));
      yield put(push('/'));
      yield put(alertDisplay({ alertType: 'success', message }));
      // } else {
      //   yield put(confirmEmailFailed(message));
      //   yield put(push('/'));
      //   yield put(alertDisplay({ alertType: 'error', message: res.statusText }));
      // }
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
