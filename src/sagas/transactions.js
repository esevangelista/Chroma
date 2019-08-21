import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import qs from 'qs';
import { push } from 'react-router-redux';
import {
  FETCH_TRANSACTIONS_REQUEST,
  HANDLE_TRANSACTIONS_QUERY,
  GET_OVERVIEW_REQUEST,
  COMPLETE_ORDER_REQUEST,
  SHIP_ORDER_REQUEST,
  fetchTransactionsSuccess,
  fetchTransactionsFailed,
  getOverviewSuccess,
  getOverviewFailed,
  shipOrderSuccess,
  shipOrderFailed,
  completeOrderSuccess,
  completeOrderFailed,
} from '../ducks/transactions';
import { alertDisplay } from '../ducks/feedback';
import { getRequestService, putRequestService } from '../api/apiRequest';

export const getUserID = state => state.user.profile._id;
export const getActiveTransaction = state => state.transactions.active;
export const getQuery = state => state.transactions.query;

export function* fetchTransactions() {
  try {
    const query = yield select(getQuery);
    const seller = yield select(getUserID);
    const response = yield call(getRequestService, `/transactions/${seller}?${qs.stringify(query)}`);
    const {
      success,
      pagination,
      transactions,
      message,
    } = response.data;
    if (success) {
      yield put(fetchTransactionsSuccess(transactions, pagination));
    } else {
      yield put(fetchTransactionsFailed(message));
    }
  } catch (err) {
    const message = err.response.data;
    yield put(fetchTransactionsFailed(message || 'Something went wrong.'));
  }
}
export function* shipOrder(action) {
  try {
    const { _id, data } = action;
    const response = yield call(putRequestService, `/upload-shipping-receipt/${_id}`, data);
    const { success, message } = response.data;
    if (success) {
      yield put(shipOrderSuccess(message));
      yield put(push('/my-store/transactions'));
      yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(shipOrderFailed(message));
      yield put(push('/my-store/transactions'));
      yield put(alertDisplay({ alertType: 'error', message }));
    }
  } catch (err) {
    const message = err.response.data;
    yield put(shipOrderFailed(message));
    yield put(alertDisplay({ alertType: 'error', message }));
  }
}

export function* completeOrder(action) {
  try {
    const { _id, data } = action;
    const response = yield call(putRequestService, `/complete-transaction/${_id}`, data);
    const { success, message } = response.data;
    if (success) {
      yield put(completeOrderSuccess(message));
      yield put(push('/my-store/transactions'));
      yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(completeOrderFailed(message));
      yield put(push('/my-store/transactions'));
      yield put(alertDisplay({ alertType: 'error', message }));
    }
  } catch (err) {
    const message = err.response.data;
    yield put(completeOrderFailed(message));
    yield put(alertDisplay({ alertType: 'error', message }));
  }
}

export function* getOverview() {
  try {
    const _id = yield select(getUserID);
    const response = yield call(getRequestService, `/overview/${_id}`);
    const { success, stats, message } = response.data;
    if (success) yield put(getOverviewSuccess(stats));
    else yield put(getOverviewFailed(message));
  } catch (err) {
    const message = err.response.data;
    yield put(getOverviewFailed(message));
    yield put(alertDisplay({ alertType: 'error', message }));
  }
}
export function* watchTransactionFlow() {
  yield [
    takeLatest([
      FETCH_TRANSACTIONS_REQUEST,
      HANDLE_TRANSACTIONS_QUERY,
    ], fetchTransactions),
    takeLatest(SHIP_ORDER_REQUEST, shipOrder),
    takeLatest(COMPLETE_ORDER_REQUEST, completeOrder),
    takeLatest(GET_OVERVIEW_REQUEST, getOverview),
  ];
}

const transactionSagas = [watchTransactionFlow()];

export default transactionSagas;
