import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import qs from 'qs';
import { alertDisplay } from '../ducks/feedback';
import { postRequestService, putRequestService, getRequestService, deleteRequestService } from '../api/apiRequest';
import {
  // UPLOAD_ART_IMG_REQUEST,
  ADD_ART_REQUEST,
  FETCH_ART_REQUEST,
  UPDATE_ARTWORK_REQUEST,
  UPDATE_DRAWER,
  CHANGE_QUERY_TYPE,
  CHANGE_QUERY_STYLE,
  CHANGE_QUERY_MEDIUM,
  CHANGE_QUERY_SUBJECT,
  CHANGE_QUERY_PRICE,
  CHANGE_QUERY_DIMENSIONS,
  CHANGE_QUERY_STATUS,
  CHANGE_QUERY_TITLE,
  CHANGE_QUERY_ARTIST,
  CLEAR_ALL_FILTERS,
  CHANGE_QUERY_LIMIT,
  CHANGE_QUERY_PAGE,
  DELETE_ARTWORK_REQUEST,
  uploadArtImgRequest,
  uploadArtImgSuccess,
  uploadArtImgFailed,
  addArtSuccess,
  addArtFailed,
  fetchArtRequest,
  fetchArtSuccess,
  fetchArtFailed,
  updateArtSucess,
  updateArtFailed,
  changeActiveProduct,
  changeQueryArtist,
  deleteArtSuccess,
  deleteArtFailed,
} from '../ducks/products';

export const getUploadedImages = state => state.product.upload.uploadedImages;
export const getUploadStatus = state => state.product.upload.error;
export const getQuery = state => state.product.fetch.query;
export const getUser = state => state.user.profile._id;
export const getActiveProduct = state => state.product.fetch.activeProduct;
export const getSelectedProductID = state => state.product.update.selectedProduct._id;
export const getUploadedImagesID = (state) => {
  const { uploadedImages } = state.product.upload;
  const arr = [];
  uploadedImages.map(img => arr.push(img._id));
  return arr;
};
export function* uploadImages(action) {
  try {
    const response = yield call(postRequestService, '/upload-artwork-images', action.data);
    const { data } = response;
    const { success } = data;
    if (success) {
      const { images, message } = data;
      yield put(uploadArtImgSuccess(images, message));
    } else yield put(uploadArtImgFailed(data.message));
  } catch (err) {
    yield put(uploadArtImgFailed(err.response.data.message || 'Something went wrong.'));
  }
}

export function* listArtwork(action) {
  try {
    const { data } = action;
    yield put(uploadArtImgRequest(data.formData));
    yield call(uploadImages, { data: data.formData });
    data.data.images = yield select(getUploadedImagesID);
    const response = yield call(postRequestService, '/artwork', action.data.data);
    const { success, message } = response.data;
    if (success) {
      yield put(addArtSuccess(message));
      yield put(push('/my-store/products'));
      yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(addArtFailed(message || 'Something went wrong.'));
      yield put(push('/my-store/products'));
      yield put(alertDisplay({ alertType: 'error', message }));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(addArtFailed(message || 'Something went wrong.'));
    yield put(alertDisplay({ alertType: 'error', message }));
  }
}

export function* handleUpdateArtwork(action) {
  try {
    const { data } = action;
    if (data.newUpload) {
      yield put(uploadArtImgRequest(data.formData));
      yield call(uploadImages, { data: data.formData });
      const newFiles = yield select(getUploadedImagesID);
      data.data.images = [...data.data.images, ...newFiles];
    }
    if (yield select(getUploadStatus)) {
      yield put(updateArtFailed('Something went wrong while uploading images.'));
      yield put(push('/my-store/products'));
      yield put(alertDisplay({ alertType: 'error', message: 'Error on file upload' }));
    } else {
      const _id = yield select(getSelectedProductID);
      const response = yield call(putRequestService, `/artwork/${_id}`, data.data);
      const { success, message } = response.data;
      if (success) {
        yield put(updateArtSucess(message));
        yield put(push('/my-store/products'));
        yield put(alertDisplay({ alertType: 'success', message }));
      } else {
        yield put(updateArtFailed(message || 'Something went wrong.'));
        yield put(push('/my-store/products'));
        yield put(alertDisplay({ alertType: 'error', message }));
      }
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(updateArtFailed(message || 'Something went wrong.'));
    yield put(alertDisplay({ alertType: 'error', message }));
  }
}

export function* fetchArtProducts() {
  try {
    const query = yield select(getQuery);
    const response = yield call(getRequestService, `/artwork?${qs.stringify(query)}`);
    const { data } = response;
    const { success } = data;
    if (!success) {
      yield put(fetchArtFailed(data.message || 'Something went wrong.'));
    }
    const { artworks, pagination, message } = data;
    yield put(fetchArtSuccess(artworks, pagination, message));
  } catch (err) {
    yield put(fetchArtFailed(err.message || 'Something went wrong.'));
  }
}

export function* prepQuery() {
  try {
    yield put(fetchArtRequest());
  } catch (err) {
    yield put(fetchArtFailed(err.message || 'Something went wrong.'));
  }
}

export function* handleUpdateDrawer(action) {
  if (action.product) yield put(changeActiveProduct({}));
}

export function* handleDeleteArtwork() {
  try {
    const { _id } = yield select(getActiveProduct);
    const response = yield call(deleteRequestService, `/artwork/${_id}`);
    const { data } = response;
    const { success, message } = data;
    if (success) {
      yield put(deleteArtSuccess(message));
      yield put(changeActiveProduct({}));
      yield put(push('/my-store/products'));
      yield put(alertDisplay({ alertType: 'success', message }));
    } else {
      yield put(deleteArtFailed(data.message));
      yield put(alertDisplay({ alertType: 'error', message }));
    }
  } catch (err) {
    const { message } = err.response.data;
    yield put(deleteArtFailed(message || 'Something went wrong'));
    yield put(alertDisplay({ alertType: 'error', message }));
  }
}

export function* watchProductFlow() {
  yield [
    // takeLatest(UPLOAD_ART_IMG_REQUEST, uploadImages),
    takeLatest(ADD_ART_REQUEST, listArtwork),
    takeLatest(FETCH_ART_REQUEST, fetchArtProducts),
    takeLatest([
      CHANGE_QUERY_TYPE,
      CHANGE_QUERY_STYLE,
      CHANGE_QUERY_MEDIUM,
      CHANGE_QUERY_SUBJECT,
      CHANGE_QUERY_DIMENSIONS,
      CHANGE_QUERY_PRICE,
      CHANGE_QUERY_TITLE,
      CHANGE_QUERY_STATUS,
      CHANGE_QUERY_ARTIST,
      CHANGE_QUERY_LIMIT,
      CHANGE_QUERY_PAGE,
      CLEAR_ALL_FILTERS,
    ], prepQuery),
    takeLatest(UPDATE_DRAWER, handleUpdateDrawer),
    takeLatest(UPDATE_ARTWORK_REQUEST, handleUpdateArtwork),
    takeLatest(DELETE_ARTWORK_REQUEST, handleDeleteArtwork),
  ];
}

const productSagas = [watchProductFlow()];

export default productSagas;
