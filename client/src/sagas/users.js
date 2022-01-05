import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  CHECK_SESSION_EXISTS,
  FETCH_SESSION_REQUEST,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_PROFILE_REQUEST,
  CHANGE_EMAIL_REQUEST,
  CHANGE_ACCOUNT_TYPE_REQUEST,
  fetchSessionRequest,
  fetchSessionSuccess,
  fetchSessionFailed,
  updateAccountSuccess,
  updateAccountFailed,
  updateProfileSuccess,
  updateProfileFailed,
  changeEmailSuccess,
  changeEmailFailed,
  changeAccountTypeSuccess,
  changeAccountTypeFailed,
} from '../ducks/users';
import { postRequestService, putRequestService } from '../api/apiRequest';

export const getUserID = state => state.user.profile._id;
export const getSession = state => state.user.profile;


export function* fetchSession() {
  try {
    const response = yield call(postRequestService, '/session');
    const { data } = response;
    const { success } = data;
    if (success) yield put(fetchSessionSuccess(data.user));
  } catch (err) {
    yield put(fetchSessionFailed(err || 'Something went wrong.'));
  }
}
export function* checkSessionExists() {
  try {
    const profile = yield select(getSession);
    if (!profile || !profile.email) {
      yield put(fetchSessionRequest());
    }
  } catch (err) {
    yield put(fetchSessionFailed(err || 'Something went wrong'));
  }
}

export function* updateAccount(action) {
  try {
    const _id = yield select(getUserID);
    const response = yield call(putRequestService, `/users/${_id}`, action.data);
    const { success, message, user } = response.data;
    if (success) yield put(updateAccountSuccess(user));
    else yield put(updateAccountFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(updateAccountFailed(message));
  }
}

export function* changeEmail(action) {
  try {
    const _id = yield select(getUserID);
    const response = yield call(putRequestService, `/change-email/${_id}`, action.email);
    const { success, message } = response.data;
    if (success) yield put(changeEmailSuccess(message));
    else yield put(changeEmailFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(changeEmailFailed(message));
  }
}

export function* changeAccountType(action) {
  try {
    const _id = yield select(getUserID);
    const response = yield call(putRequestService, `/change-account-type/${_id}`, action.toArtist);
    const { success, message } = response.data;
    if (success) {
      yield put(fetchSessionRequest());
      yield put(changeAccountTypeSuccess(message));
    } else yield put(changeAccountTypeFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(changeAccountTypeFailed(message));
  }
}

export function* updateProfile(action) {
  try {
    const _id = yield select(getUserID);
    if (action.data.formData) {
      const res = yield call(putRequestService, `/upload-profile-image/${_id}`, action.data.formData);
      if (!res.data.success) return yield put(updateProfileFailed('Something went wrong while uploading your photo. Please try again.'));
      delete action.data.formData;
    }
    const response = yield call(putRequestService, `/update-artist-info/${_id}`, action.data);
    const { success, message, user } = response.data;
    if (success) return yield put(updateProfileSuccess(user));
    return yield put(updateProfileFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    return yield put(updateProfileFailed(message));
  }
}
export function* watchUserFlow() {
  yield [
    takeLatest(CHECK_SESSION_EXISTS, checkSessionExists),
    takeLatest(FETCH_SESSION_REQUEST, fetchSession),
    takeLatest(UPDATE_ACCOUNT_REQUEST, updateAccount),
    takeLatest(UPDATE_PROFILE_REQUEST, updateProfile),
    takeLatest(CHANGE_EMAIL_REQUEST, changeEmail),
    takeLatest(CHANGE_ACCOUNT_TYPE_REQUEST, changeAccountType),
  ];
}

const userSagas = [watchUserFlow()];

export default userSagas;

