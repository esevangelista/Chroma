import { combineReducers } from 'redux';

export const UPLOAD_ART_IMG_REQUEST = 'UPLOAD_ART_IMG_REQUEST';
export const UPLOAD_ART_IMG_SUCCESS = 'UPLOAD_ART_IMG_SUCCESS';
export const UPLOAD_ART_IMG_FAILED = 'UPLOAD_ART_IMG_FAILED';

export const ADD_ART_REQUEST = 'ADD_ART_REQUEST';
export const ADD_ART_SUCESS = 'ADD_ART_SUCESS';
export const ADD_ART_FAILED = 'ADD_ART_FAILED';

export const UPDATE_ART_REQUEST = 'UPDATE_ART_REQUEST';
export const UPDATE_ART_SUCCESS = 'UPDATE_ART_SUCCESS';
export const UPDATE_ART_FAILED = 'UPDATE_ART_FAILED';

export const DELETE_ART_REQUEST = 'DELETE_ART_REQUEST';
export const DELETE_ART_SUCCESS = 'DELETE_ART_SUCCESS';
export const DELETE_ART_FAILED = 'DELETE_ART_FAILED';

export const FETCH_ART_REQUEST = 'FETCH_ART_REQUEST';
export const FETCH_ART_SUCCESS = 'FETCH_ART_SUCCESS';
export const FETCH_ART_FAILED = 'FETCH_ART_FAILED';

export const CHANGE_QUERY_TYPE = 'CHANGE_QUERY_TYPE';
export const CHANGE_QUERY_STYLE = 'CHANGE_QUERY_STYLE';
export const CHANGE_QUERY_MEDIUM = 'CHANGE_QUERY_MEDIUM';
export const CHANGE_QUERY_SUBJECT = 'CHANGE_QUERY_SUBJECT';
export const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS';
export const CHANGE_QUERY_PRICE = 'CHANGE_QUERY_PRICE';
export const CHANGE_QUERY_DIMENSIONS = 'CHANGE_QUERY_DIMENSIONS';
export const CHANGE_QUERY_STATUS = 'CHANGE_QUERY_STATUS';
export const CHANGE_QUERY_TITLE = 'CHANGE_QUERY_TITLE';
export const CHANGE_QUERY_ARTIST = 'CHANGE_QUERY_ARTIST';
export const CHANGE_ACTIVE_PRODUCT = 'CHANGE_ACTIVE_PRODUCT';
export const CHANGE_QUERY_LIMIT = 'CHANGE_QUERY_LIMIT';
export const CHANGE_QUERY_PAGE = 'CHANGE_QUERY_PAGE';

export const UPDATE_DRAWER = 'UPDATE_DRAWER';
export const UPDATE_ARTWORK_REQUEST = 'UPDATE_ARTWORK_REQUEST';
export const UPDATE_ARTWORK_SUCCESS = 'UPDATE_ARTWORK_SUCCESS';
export const UPDATE_ARTWORK_FAILED = 'UPDATE_ARTWORK_FAILED';

export const DELETE_ARTWORK_REQUEST = 'DELETE_ARTWORK_REQUEST';
export const DELETE_ARTWORK_SUCCESS = 'DELETE_ARTWORK_SUCCESS';
export const DELETE_ARTWORK_FAILED = 'DELETE_ARTWORK_FAILED';

export function uploadArtImgRequest(data) {
  return { type: UPLOAD_ART_IMG_REQUEST, data };
}

export function uploadArtImgSuccess(images, message) {
  return { type: UPLOAD_ART_IMG_SUCCESS, images, message };
}

export function uploadArtImgFailed(message) {
  return { type: UPLOAD_ART_IMG_FAILED, message };
}

export function addArtRequest(data) {
  return { type: ADD_ART_REQUEST, data };
}

export function addArtSuccess(message) {
  return { type: ADD_ART_SUCESS, message };
}

export function addArtFailed(message) {
  return { type: ADD_ART_FAILED, message };
}

export function fetchArtRequest() {
  return { type: FETCH_ART_REQUEST };
}
export function fetchArtSuccess(artworks, pagination, message) {
  return {
    type: FETCH_ART_SUCCESS,
    artworks,
    pagination,
    message,
  };
}
export function fetchArtFailed(message) {
  return { type: FETCH_ART_FAILED, message };
}

export function changeQueryType(artform) {
  return { type: CHANGE_QUERY_TYPE, artform };
}

export function changeQueryStyle(style) {
  return { type: CHANGE_QUERY_STYLE, style };
}

export function changeQueryMedium(medium) {
  return { type: CHANGE_QUERY_MEDIUM, medium };
}

export function changeQuerySubject(subject) {
  return { type: CHANGE_QUERY_SUBJECT, subject };
}

export function changeQueryPrice(price) {
  return { type: CHANGE_QUERY_PRICE, price };
}

export function changeQueryDimensions(dimensions) {
  return { type: CHANGE_QUERY_DIMENSIONS, dimensions };
}

export function changeQueryStatus(status) {
  return { type: CHANGE_QUERY_STATUS, status };
}

export function changeQueryTitle(title) {
  return { type: CHANGE_QUERY_TITLE, title };
}

export function changeQueryArtist(artist) {
  return { type: CHANGE_QUERY_ARTIST, artist };
}

export function clearFilter() {
  return { type: CLEAR_ALL_FILTERS };
}

export function changeActiveProduct(product) {
  return { type: CHANGE_ACTIVE_PRODUCT, product };
}

export function changeQueryLimit(limit) {
  return { type: CHANGE_QUERY_LIMIT, limit };
}

export function changeQueryPage(page) {
  return { type: CHANGE_QUERY_PAGE, page };
}
export function updateDrawer(product) {
  return { type: UPDATE_DRAWER, product };
}

export function updateArtRequest(data) {
  return { type: UPDATE_ARTWORK_REQUEST, data };
}

export function updateArtSucess(message) {
  return { type: UPDATE_ARTWORK_SUCCESS, message };
}

export function updateArtFailed(message) {
  return { type: UPDATE_ARTWORK_FAILED, message };
}

export function deleteArtRequest() {
  return { type: DELETE_ARTWORK_REQUEST };
}

export function deleteArtSuccess(message) {
  return { type: DELETE_ARTWORK_SUCCESS, message };
}

export function deleteArtFailed(message) {
  return { type: DELETE_ARTWORK_FAILED, message };
}

const initialUploadState = {
  isFetching: false,
  error: false,
  message: '',
  uploadedImages: [],
};

const initialAddState = {
  isFetching: false,
  error: false,
  message: '',
};

const initialFetchState = {
  products: [],
  pagination: {
    page: 0,
    total: 0,
    limit: 12,
  },
  query: {},
  activeProduct: {},
  isFetching: false,
  error: false,
  message: '',
};

const initialUpdateState = {
  selectedProduct: {},

  isFetching: false,
  error: false,
  message: '',
};

const initialDeleteState = {
  isFetching: false,
  error: false,
  message: '',
};

function uploadReducer(state = initialUploadState, action) {
  const { type } = action;
  switch (type) {
    case UPLOAD_ART_IMG_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UPLOAD_ART_IMG_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        message: action.message,
        uploadedImages: action.images,
      };
    case UPLOAD_ART_IMG_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    default:
      return state;
  }
}

function addReducer(state = initialAddState, action) {
  const { type } = action;
  switch (type) {
    case ADD_ART_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ADD_ART_SUCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        message: action.message,
      };
    case ADD_ART_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    default:
      return state;
  }
}

function fetchReducer(state = initialFetchState, action) {
  const { type } = action;
  switch (type) {
    case FETCH_ART_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_ART_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        message: action.message,
        products: action.artworks,
        pagination: action.pagination,
      };
    case FETCH_ART_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case CHANGE_QUERY_TYPE:
      return {
        ...state,
        query: { ...state.query, artform: action.artform, page: 1 },
      };
    case CHANGE_QUERY_STYLE:
      return {
        ...state,
        query: {
          ...state.query,
          style: action.style,
          page: 1,
        },
      };
    case CHANGE_QUERY_MEDIUM:
      return {
        ...state,
        query: {
          ...state.query,
          medium: action.medium,
          page: 1,
        },
      };
    case CHANGE_QUERY_SUBJECT:
      return {
        ...state,
        query: {
          ...state.query,
          subject: action.subject,
          page: 1,
        },
      };
    case CHANGE_QUERY_PRICE:
      return {
        ...state,
        query: {
          ...state.query,
          minPrice: action.price.minP,
          maxPrice: action.price.maxP,
          page: 1,
        },
      };
    case CHANGE_QUERY_DIMENSIONS:
      return {
        ...state,
        query: {
          ...state.query,
          minHeight: action.dimensions.minH,
          maxHeight: action.dimensions.maxH,
          minWidth: action.dimensions.minW,
          maxWith: action.dimensions.maxW,
          minDepth: action.dimensions.minD,
          maxDepth: action.dimensions.maxD,
          page: 1,
        },
      };
    case CHANGE_QUERY_STATUS:
      return {
        ...state,
        query: {
          ...state.query,
          status: action.status,
          page: 1,
        },
      };
    case CHANGE_QUERY_TITLE:
      return {
        ...state,
        query: {
          ...state.query,
          title: action.title,
          page: 1,
        },
      };
    case CHANGE_QUERY_ARTIST:
      return {
        ...state,
        query: {
          ...state.query,
          artist: action.artist,
          page: 1,
        },
      };
    case CLEAR_ALL_FILTERS:
      return {
        ...state,
        query: {},
      };
    case CHANGE_ACTIVE_PRODUCT:
      return {
        ...state,
        activeProduct: action.product,
      };
    case CHANGE_QUERY_LIMIT:
      return {
        ...state,
        query: {
          ...state.query,
          limit: action.limit,
          page: 1,
        },
      };
    case CHANGE_QUERY_PAGE:
      return {
        ...state,
        query: {
          ...state.query,
          page: action.page,
        },
      };
    default:
      return state;
  }
}

function updateReducer(state = initialUpdateState, action) {
  const { type } = action;
  switch (type) {
    case UPDATE_DRAWER:
      return {
        ...state,
        selectedProduct: action.product,
      };
    case UPDATE_ARTWORK_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATE_ARTWORK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        message: action.message,
        selectedProduct: {},
      };
    case UPDATE_ARTWORK_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
        selectedProduct: {},
      };
    default: return state;
  }
}

function deleteReducer(state = initialDeleteState, action) {
  const { type } = action;
  switch (type) {
    case DELETE_ARTWORK_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_ARTWORK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        message: action.message,
      };
    case DELETE_ARTWORK_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    default: return state;
  }
}
export default combineReducers({
  upload: uploadReducer,
  listArtwork: addReducer,
  fetch: fetchReducer,
  update: updateReducer,
  delete: deleteReducer,
});
