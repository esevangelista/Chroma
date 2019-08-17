import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import qs from 'qs';
import {
  CANCEL_ORDER_REQUEST,
  ADD_ORDER_REQUEST,
  FETCH_ORDERS_REQUEST,
  ORDER_QUERY,
  HANDLE_NEW_ORDER,
  UPLOAD_PROOF_OF_PAYMENT_REQUEST,
  ADD_REVIEW_REQUEST,
  EDIT_REVIEW_REQUEST,
  uploadProofOfPaymentSuccess,
  uploadProofOfPaymentFailed,
  addOrderSuccess,
  addOrderFailed,
  fetchOrdersSuccess,
  fetchOrdersFailed,
  cancelOrderSuccess,
  cancelOrderFailed,
  addReviewSuccess,
  addReviewFailed,
  editReviewSuccess,
  editReviewFailed,
} from '../ducks/orders';
import { alertDisplay } from '../ducks/feedback';
import { postRequestService, getRequestService, putRequestService } from '../api/apiRequest';

export const getUserID = state => state.user.profile._id;
export const getNewOrder = state => state.orders.newOrder;
export const getQuery = state => state.orders.query;
export const getCartContent = (state) => {
  const { products, tally, total } = state.cart;
  return { products, tally, total };
};

export function* addOrder() {
  try {
    const ownedBy = yield select(getUserID);
    const newOrder = yield select(getNewOrder);
    const cart = yield select(getCartContent);
    const body = { ...newOrder, ...cart };
    const response = yield call(postRequestService, `/orders/${ownedBy}`, body);
    const { success, message } = response.data;
    if (success) {
      yield put(addOrderSuccess());
      yield put(push('/orders'));
      yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(addOrderFailed(message));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(addOrderFailed(message));
  }
}

export function* handleNew() {
  yield put(push('/checkout/payment'));
}

export function* getOrders() {
  try {
    const ownedBy = yield select(getUserID);
    const query = yield select(getQuery);
    const response = yield call(getRequestService, `/orders/${ownedBy}?${qs.stringify(query)}`);
    const {
      success,
      pagination,
      orders,
      message,
    } = response.data;
    if (success) yield put(fetchOrdersSuccess(orders, pagination));
    else yield put(fetchOrdersFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(fetchOrdersFailed(message));
  }
}
export function* uploadProof(action) {
  try {
    const { _id, data } = action;
    const response = yield call(putRequestService, `/upload-proof-of-payment/${_id}`, data);
    const { success, message } = response.data;
    if (success) {
      yield put(uploadProofOfPaymentSuccess(message));
      yield put(push('/orders'));
      yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(uploadProofOfPaymentFailed(message));
      yield put(push('/orders'));
      yield put(alertDisplay({ alertType: 'error', message }));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(alertDisplay({ alertType: 'error', message }));
    yield put(uploadProofOfPaymentFailed(message));
  }
}
export function* cancelOrder(action) {
  try {
    const response = yield call(putRequestService, `/cancel-order/${action._id}`);
    const { success, message } = response.data;
    if (success) {
      yield put(cancelOrderSuccess(message));
      yield put(push('/orders'));
      yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(cancelOrderFailed(message));
      yield put(push('/orders'));
      yield put(alertDisplay({ alertType: 'error', message }));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(alertDisplay({ alertType: 'error', message }));
    yield put(cancelOrderFailed(message));
  }
}
export function* addReview(action) {
  try {
    const response = yield call(postRequestService, `/order-review/${action._id}`, action.data);
    const { success, message } = response.data;
    if (success) {
      yield put(addReviewSuccess(message));
      yield put(push('/orders'));
      yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(addReviewFailed(message));
      yield put(push('/orders'));
      yield put(alertDisplay({ alertType: 'error', message }));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(addReviewFailed(message));
    yield put(push('/orders'));
    yield put(alertDisplay({ alertType: 'error', message }));
  }
}

export function* editReview(action) {
  try {
    const response = yield call(putRequestService, `/order-review/${action._id}`, action.data);
    const { success, message } = response.data;
    if (success) {
      yield put(editReviewSuccess(message));
      yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(editReviewFailed(message));
      yield put(alertDisplay({ alertType: 'error', message }));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(editReviewFailed(message));
    yield put(alertDisplay({ alertType: 'error', message }));
  }
}

export function* watchOrderFlow() {
  yield [
    takeLatest(UPLOAD_PROOF_OF_PAYMENT_REQUEST, uploadProof),
    takeLatest([FETCH_ORDERS_REQUEST, ORDER_QUERY], getOrders),
    takeLatest(ADD_ORDER_REQUEST, addOrder),
    takeLatest(HANDLE_NEW_ORDER, handleNew),
    takeLatest(CANCEL_ORDER_REQUEST, cancelOrder),
    takeLatest(ADD_REVIEW_REQUEST, addReview),
    takeLatest(EDIT_REVIEW_REQUEST, editReview),
  ];
}

const orderSagas = [watchOrderFlow()];

export default orderSagas;
