import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import qs from 'qs';
import {
  UPDATE_WISHLIST_REQUEST,
  WISH_QUERY_PAGE,
  WISH_QUERY_LIMIT,
  FETCH_WISHLIST_REQUEST,
  updateWishlistSuccess,
  updateWishlistFailed,
  fetchWishlistSuccess,
  fetchWishlistFailed,
  fetchWishlistRequest,
} from '../ducks/wishlist';
// import { alertDisplay } from '../ducks/feedback';
import { putRequestService, getRequestService } from '../api/apiRequest';

export const getQuery = state => state.wishlist.query;
export const getUserID = state => state.user.profile._id;

export function* getWishlist() {
  try {
    const ownedBy = yield select(getUserID);
    const query = yield select(getQuery);
    const response = yield call(getRequestService, `/wishlist/${ownedBy}/${qs.stringify(query)}`);
    const {
      success,
      message,
      wishlist,
      pagination,
    } = response.data;
    if (success) {
      yield put(fetchWishlistSuccess(wishlist, pagination, message));
    } else {
      yield put(fetchWishlistFailed(message));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(fetchWishlistFailed(message));
  }
}

export function* updateWishlist(action) {
  try {
    const ownedBy = yield select(getUserID);
    const response = yield call(putRequestService, `wishlist/${ownedBy}`, action);
    const { success, message } = response.data;
    if (success) {
      yield put(updateWishlistSuccess(message));
      yield put(fetchWishlistRequest());
      // yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(updateWishlistFailed(message));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(updateWishlistFailed(message));
  }
}

export function* watchWishlistFlow() {
  yield [
    takeLatest([
      FETCH_WISHLIST_REQUEST,
      WISH_QUERY_PAGE,
      WISH_QUERY_LIMIT,
    ], getWishlist),
    takeLatest(UPDATE_WISHLIST_REQUEST, updateWishlist),
  ];
}
const wishlistSagas = [watchWishlistFlow()];

export default wishlistSagas;
