import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import qs from 'qs';
import { getRequestService } from '../api/apiRequest';
import {
  FETCH_ARTISTS_REQUEST,
  GET_ARTIST_REQUEST,
  ARTISTS_QUERY_PAGE,
  ARTISTS_QUERY_LIMIT,
  ARTISTS_QUERY_NAME,
  ARTIST_QUERY_RATE,
  ARTIST_QUERY_LOCATION,
  ARTIST_QUERY_ART_TYPE,
  ARTIST_CLEAR_QUERY,
  fetchArtistsRequest,
  fetchArtistsSuccess,
  fetchArtistsFailed,
  getArtistSuccess,
  getArtistFailed,
} from '../ducks/artists';
import { fetchWishlistRequest } from '../ducks/wishlist';

export const getQuery = state => state.artists.query;

export function* fetchArtists() {
  try {
    const query = yield select(getQuery);
    const response = yield call(getRequestService, `/artists?${qs.stringify(query)}`);
    const {
      success,
      message,
      pagination,
      artists,
    } = response.data;
    if (success) yield put(fetchArtistsSuccess(artists, pagination));
    else yield put(fetchArtistsFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(fetchArtistsFailed(message));
  }
}
export function* getArtist(action) {
  try {
    const { _id } = action;
    const response = yield call(getRequestService, `/users/${_id}`);
    const { success, user, message } = response.data;
    if (success) {
      yield put(getArtistSuccess(user));
      yield put(fetchWishlistRequest());
    } else yield put(getArtistFailed(message));
  } catch (err) {
    const { message } = err.response.data;
    yield put(getArtistFailed(message));
  }
}
export function* prepQuery() {
  try {
    yield put(fetchArtistsRequest());
  } catch (err) {
    const { message } = err.response.data;
    yield put(fetchArtistsFailed(message));
  }
}
export function* watchArtistFlow() {
  yield [
    takeLatest(FETCH_ARTISTS_REQUEST, fetchArtists),
    takeLatest(GET_ARTIST_REQUEST, getArtist),
    takeLatest([
      ARTISTS_QUERY_NAME,
      ARTISTS_QUERY_LIMIT,
      ARTISTS_QUERY_PAGE,
      ARTIST_QUERY_RATE,
      ARTIST_QUERY_LOCATION,
      ARTIST_QUERY_ART_TYPE,
      ARTIST_CLEAR_QUERY,
    ], prepQuery),
  ];
}
const artistSagas = [watchArtistFlow()];

export default artistSagas;
