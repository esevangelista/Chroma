import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import qs from 'qs';
import { getRequestService } from '../api/apiRequest';
import {
  GET_ART_REQUEST,
  GET_ACTIVE_ART_REQUEST,
  HANDLE_QUERY_TYPE,
  HANDLE_QUERY_STYLE,
  HANDLE_QUERY_MEDIUM,
  HANDLE_QUERY_SUBJECT,
  HANDLE_QUERY_PRICE,
  HANDLE_QUERY_DIMENSIONS,
  HANDLE_QUERY_STATUS,
  HANDLE_QUERY_TITLE,
  HANDLE_QUERY_ARTIST,
  REMOVE_ALL_FILTERS,
  HANDLE_QUERY_LIMIT,
  HANDLE_QUERY_PAGE,
  // handleAllQuery,
  getArtRequest,
  getArtSuccess,
  getArtFailed,
  getActiveArtSuccess,
  getActiveArtFailed,
} from '../ducks/artworks';
import { fetchWishlistRequest } from '../ducks/wishlist';

export const getQuery = state => state.artworks.fetch.query;
export const getActiveArtwork = state => state.artworks.fetch.activeArtwork;
export const getSearch = state => state.router.location.search;
export const getUser = state => state.user.profile;
export function* getArtworks() {
  try {
    const query = yield select(getQuery);
    // const queryParams = yield select(getSearch);
    // const q = qs.parse(queryParams, { ignoreQueryPrefix: true });
    // if (q) {
    //   query = { ...q, ...query };
    //   yield put(handleAllQuery(query));
    // }
    const response = yield call(getRequestService, `/artwork?${qs.stringify(query)}`);
    const { data } = response;
    const { success } = data;
    if (!success) {
      yield put(getArtFailed(data.message || 'Something went wrong.'));
    } else {
      const { artworks, pagination, message } = data;
      const user = yield select(getUser);
      if (user && user._id) yield put(fetchWishlistRequest());
      yield put(getArtSuccess(artworks, pagination, message));
    }
  } catch (err) {
    yield put(getArtFailed(err.message || 'Something went wrong.'));
  }
}

export function* prepQuery() {
  try {
    yield put(getArtRequest());
  } catch (err) {
    yield put(getArtFailed(err.message || 'Something went wrong.'));
  }
}

export function* fetchActiveArtwork(action) {
  try {
    const { _id } = action;
    const response = yield call(getRequestService, `/artwork/${_id}`);
    const { success, artwork, message } = response.data;
    if (success) yield put(getActiveArtSuccess(artwork));
    else {
      yield put(push('/notfound'));
      yield put(getActiveArtFailed(message));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(getActiveArtFailed(message || 'Something went wrong.'));
  }
}

export function* watchProductFlow() {
  yield [
    takeLatest(GET_ART_REQUEST, getArtworks),
    takeLatest(GET_ACTIVE_ART_REQUEST, fetchActiveArtwork),
    takeLatest([
      HANDLE_QUERY_TYPE,
      HANDLE_QUERY_STYLE,
      HANDLE_QUERY_MEDIUM,
      HANDLE_QUERY_SUBJECT,
      HANDLE_QUERY_DIMENSIONS,
      HANDLE_QUERY_PRICE,
      HANDLE_QUERY_TITLE,
      HANDLE_QUERY_STATUS,
      HANDLE_QUERY_ARTIST,
      HANDLE_QUERY_LIMIT,
      HANDLE_QUERY_PAGE,
      REMOVE_ALL_FILTERS,
    ], prepQuery),
  ];
}

const artworkSagas = [watchProductFlow()];

export default artworkSagas;
