import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import qs from 'qs';
import { postRequestService, getRequestService } from '../api/apiRequest';
import {
  CHECK_ADMIN_SESSION,
  FETCH_ADMIN_SESSION_REQUEST,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_USERS_REQUEST,
  ADMIN_USER_REQUEST,
  ADMIN_USERS_QUERY,
  ADMIN_TRANSACTIONS_QUERY,
  ADMIN_TRANSACTIONS_REQUEST,
  ADMIN_TRANSACTION_REQUEST,
  fetchAdminSessionRequest,
  fetchAdminSessionSuccess,
  fetchAdminSessionFailed,
  adminLoginSuccess,
  adminLoginFailed,
  adminLogoutSuccess,
  adminLogoutFailed,
  adminUsersRequest,
  adminUsersSuccess,
  adminUsersFailed,
  adminUserSuccess,
  adminUserFailed,
  adminTransactionsSuccess,
  adminTransactionsFailed,
  adminTransactionSuccess,
  adminTransactionFailed,
} from '../ducks/admin';

export const getSession = state => state.admin.auth.admin;
export const getUsersQuery = state => state.admin.users.query;
export const getTransactionsQuery = state => state.admin.transactions.query;


export function* login(action) {
  try {
    const response = yield call(postRequestService, '/admin/login', action.data);
    const { success, admin, message } = response.data;
    if (success) yield put(adminLoginSuccess(admin));
    else yield put(adminLoginFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(adminLoginFailed(message));
  }
}

export function* logout() {
  try {
    const response = yield call(postRequestService, '/admin/logout');
    const { success, message } = response.data;
    if (success) {
      yield put(adminLogoutSuccess());
    } else {
      yield put(adminLogoutFailed(message));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(adminLogoutFailed(message));
  }
}

export function* fetchSession() {
  try {
    const response = yield call(postRequestService, '/admin/session');
    const { success, admin } = response.data;
    if (success) yield put(fetchAdminSessionSuccess(admin));
  } catch (err) {
    yield put(fetchAdminSessionFailed(err || 'Something went wrong.'));
  }
}

export function* checkSession() {
  try {
    yield put(fetchAdminSessionRequest());
  } catch (err) {
    yield put(fetchAdminSessionFailed(err || 'Something went wrong'));
  }
}

export function* getUsers() {
  try {
    const query = yield select(getUsersQuery);
    const response = yield call(getRequestService, `/admin/users?${qs.stringify(query)}`);
    const { success, message, users, pagination } = response.data;
    if (success) yield put(adminUsersSuccess(users, pagination));
    else yield put(adminUsersFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(adminUsersFailed(message));
  }
}

export function* getTransactions(action) {
  try {
    const query = yield select(getTransactionsQuery);
    const response = yield call(getRequestService, `/admin/transactions/${action._id}?${qs.stringify(query)}`);
    const { success, message, transactions, pagination } = response.data;
    if (success) yield put(adminTransactionsSuccess(transactions, pagination));
    else yield put(adminTransactionsFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(adminTransactionsFailed(message));
  }
}

export function* getTransaction(action) {
  try {
    const response = yield call(getRequestService, `/admin/transaction/${action._id}`);
    const { success, message, transaction } = response.data;
    if (success) yield put(adminTransactionSuccess(transaction));
    else yield put(adminTransactionFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(adminTransactionFailed(message));
  }
}

export function* getUser(action) {
  try {
    const response = yield call(getRequestService, `/admin/users/${action._id}`);
    const { success, message, user } = response.data;
    if (success) yield put(adminUserSuccess(user));
    else yield put(adminUserFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(adminUserFailed(message));
  }
}
export function* prepFetch() {
  yield put(adminUsersRequest());
}

export function* watchAdminFlow() {
  yield [
    takeLatest(CHECK_ADMIN_SESSION, checkSession),
    takeLatest(FETCH_ADMIN_SESSION_REQUEST, fetchSession),
    takeLatest(ADMIN_LOGIN_REQUEST, login),
    takeLatest(ADMIN_LOGOUT_REQUEST, logout),
    takeLatest(ADMIN_USERS_QUERY, prepFetch),
    takeLatest(ADMIN_USERS_REQUEST, getUsers),
    takeLatest(ADMIN_USER_REQUEST, getUser),
    takeLatest([ADMIN_TRANSACTIONS_REQUEST, ADMIN_TRANSACTIONS_QUERY], getTransactions),
    takeLatest(ADMIN_TRANSACTION_REQUEST, getTransaction),
  ];
}

const adminSagas = [watchAdminFlow()];

export default adminSagas;
