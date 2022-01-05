import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  UPDATE_CART_REQUEST,
  FETCH_CART_REQUEST,
  updateCartSuccess,
  updateCartFailed,
  fetchCartSuccess,
  fetchCartFailed,
} from '../ducks/cart';
import { alertDisplay } from '../ducks/feedback';
import { putRequestService, getRequestService } from '../api/apiRequest';

export const getUserID = state => state.user.profile._id;
export const getCartContent = state => state.cart;

export function* getCart() {
  try {
    const ownedBy = yield select(getUserID);
    const response = yield call(getRequestService, `/cart/${ownedBy}`);
    const {
      success,
      products,
      total,
      quantity,
      tally,
      message,
    } = response.data;
    if (success) {
      yield put(fetchCartSuccess(products, total, quantity, tally));
    } else {
      yield put(fetchCartFailed(message));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(fetchCartFailed(message));
  }
}

export function* updateCart(action) {
  try {
    const ownedBy = yield select(getUserID);
    const response = yield call(putRequestService, `/cart/${ownedBy}`, action);
    const {
      success,
      products,
      total,
      quantity,
      message,
      tally,
    } = response.data;
    if (success) {
      yield put(updateCartSuccess(products, total, quantity, tally));
      yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(updateCartFailed(message));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(updateCartFailed(message));
  }
}
export function* watchCartFlow() {
  yield [
    takeLatest(FETCH_CART_REQUEST, getCart),
    takeLatest(UPDATE_CART_REQUEST, updateCart),
  ];
}

const cartSagas = [watchCartFlow()];

export default cartSagas;
