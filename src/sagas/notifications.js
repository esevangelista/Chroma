import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import {
  FETCH_NOTIFS_REQUEST,
  fetchNotifsSuccess,
  fetchNotifsFailed,
  READ_NOTIFS_REQUEST,
  readNotifsSuccess,
  readNotifsFailed,
} from '../ducks/notifications';
import { putRequestService, getRequestService } from '../api/apiRequest';

export const getUserID = state => state.user.profile._id;

export function* getNotifs() {
  try {
    const user = yield select(getUserID);
    const response = yield call(getRequestService, `/notifications/${user}`);
    const { success, notifications, message } = response.data;
    if (success) yield put(fetchNotifsSuccess(notifications));
    else yield put(fetchNotifsFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(fetchNotifsFailed(message));
  }
}

export function* readNotifs() {
  try {
    const user = yield select(getUserID);
    const response = yield call(putRequestService, `/notifications/${user}`);
    const { success, notifications, message } = response.data;
    if (success) yield put(readNotifsSuccess(notifications));
    else yield put(readNotifsFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(readNotifsFailed(message));
  }
}

export function* watchNotifsFlow() {
  yield [
    takeLatest(FETCH_NOTIFS_REQUEST, getNotifs),
    takeLatest(READ_NOTIFS_REQUEST, readNotifs),
  ];
}

const notifSagas = [watchNotifsFlow()];

export default notifSagas;
