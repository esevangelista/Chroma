import { combineReducers } from 'redux';

export const GET_ART_REQUEST = 'GET_ART_REQUEST';
export const GET_ART_SUCCESS = 'GET_ART_SUCCESS';
export const GET_ART_FAILED = 'GET_ART_FAILED';

export const HANDLE_QUERY_TYPE = 'HANDLE_QUERY_TYPE';
export const HANDLE_QUERY_STYLE = 'HANDLE_QUERY_STYLE';
export const HANDLE_QUERY_MEDIUM = 'HANDLE_QUERY_MEDIUM';
export const HANDLE_QUERY_SUBJECT = 'HANDLE_QUERY_SUBJECT';
export const REMOVE_ALL_FILTERS = 'REMOVE_ALL_FILTERS';
export const HANDLE_QUERY_PRICE = 'HANDLE_QUERY_PRICE';
export const HANDLE_QUERY_DIMENSIONS = 'HANDLE_QUERY_DIMENSIONS';
export const HANDLE_QUERY_STATUS = 'HANDLE_QUERY_STATUS';
export const HANDLE_QUERY_TITLE = 'HANDLE_QUERY_TITLE';
export const HANDLE_QUERY_ARTIST = 'HANDLE_QUERY_ARTIST';
export const HANDLE_ACTIVE_ARTWORK = 'HANDLE_ACTIVE_ARTWORK';
export const HANDLE_QUERY_LIMIT = 'HANDLE_QUERY_LIMIT';
export const HANDLE_QUERY_PAGE = 'HANDLE_QUERY_PAGE';

export const GET_ACTIVE_ART_REQUEST = 'GET_ACTIVE_ART_REQUEST';
export const GET_ACTIVE_ART_SUCCESS = 'GET_ACTIVE_ART_SUCCESS';
export const GET_ACTIVE_ART_FAILED = 'GET_ACTIVE_ART_FAILED';

export function getArtRequest() {
  return { type: GET_ART_REQUEST };
}
export function getArtSuccess(artworks, pagination, message) {
  return {
    type: GET_ART_SUCCESS,
    artworks,
    pagination,
    message,
  };
}
export function getArtFailed(message) {
  return { type: GET_ART_FAILED, message };
}

export function getActiveArtRequest(_id) {
  return { type: GET_ACTIVE_ART_REQUEST, _id };
}

export function getActiveArtSuccess(artwork) {
  return { type: GET_ACTIVE_ART_SUCCESS, artwork };
}
export function getActiveArtFailed(message) {
  return { type: GET_ACTIVE_ART_FAILED, message };
}

export function handleQueryType(artform) {
  return { type: HANDLE_QUERY_TYPE, artform };
}

export function handleQueryStyle(style) {
  return { type: HANDLE_QUERY_STYLE, style };
}

export function handleQueryMedium(medium) {
  return { type: HANDLE_QUERY_MEDIUM, medium };
}

export function handleQuerySubject(subject) {
  return { type: HANDLE_QUERY_SUBJECT, subject };
}

export function handleQueryPrice(price) {
  return { type: HANDLE_QUERY_PRICE, price };
}

export function handleQueryDimensions(dimensions) {
  return { type: HANDLE_QUERY_DIMENSIONS, dimensions };
}

export function handleQueryStatus(status) {
  return { type: HANDLE_QUERY_STATUS, status };
}

export function handleQueryTitle(title) {
  return { type: HANDLE_QUERY_TITLE, title };
}

export function handleQueryArtist(artist) {
  return { type: HANDLE_QUERY_ARTIST, artist };
}

export function cleanFilter() {
  return { type: REMOVE_ALL_FILTERS };
}

export function handleActiveArtwork(artwork) {
  return { type: HANDLE_ACTIVE_ARTWORK, artwork };
}

export function handleQueryLimit(limit) {
  return { type: HANDLE_QUERY_LIMIT, limit };
}

export function handleQueryPage(page) {
  return { type: HANDLE_QUERY_PAGE, page };
}

const initialFetchState = {
  artworks: [],
  pagination: {
    page: 0,
    total: 0,
    limit: 12,
  },
  query: {},
  isFetching: false,
  error: false,
  message: '',
};

function fetchReducer(state = initialFetchState, action) {
  const { type } = action;
  switch (type) {
    case GET_ART_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ART_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        message: action.message,
        artworks: action.artworks,
        pagination: action.pagination,
      };
    case GET_ART_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case HANDLE_QUERY_TYPE:
      return {
        ...state,
        query: { ...state.query, artform: action.artform, page: 1 },
      };
    case HANDLE_QUERY_STYLE:
      return {
        ...state,
        query: {
          ...state.query,
          style: action.style,
          page: 1,
        },
      };
    case HANDLE_QUERY_MEDIUM:
      return {
        ...state,
        query: {
          ...state.query,
          medium: action.medium,
          page: 1,
        },
      };
    case HANDLE_QUERY_SUBJECT:
      return {
        ...state,
        query: {
          ...state.query,
          subject: action.subject,
          page: 1,
        },
      };
    case HANDLE_QUERY_PRICE:
      return {
        ...state,
        query: {
          ...state.query,
          minPrice: action.price.minP,
          maxPrice: action.price.maxP,
          page: 1,
        },
      };
    case HANDLE_QUERY_DIMENSIONS:
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
    case HANDLE_QUERY_STATUS:
      return {
        ...state,
        query: {
          ...state.query,
          status: action.status,
          page: 1,
        },
      };
    case HANDLE_QUERY_TITLE:
      return {
        ...state,
        query: {
          ...state.query,
          title: action.title,
          page: 1,
        },
      };
    case HANDLE_QUERY_ARTIST:
      return {
        ...state,
        query: {
          ...state.query,
          artist: action.artist,
          page: 1,
        },
      };
    case REMOVE_ALL_FILTERS:
      return {
        ...state,
        query: {},
      };
    case HANDLE_QUERY_LIMIT:
      return {
        ...state,
        query: {
          ...state.query,
          limit: action.limit,
          page: 1,
        },
      };
    case HANDLE_QUERY_PAGE:
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

const initialFetchActiveState = {
  activeArtwork: {},
  isFetching: true,
  error: false,
  message: '',
};

function fetchActiveReducer(state = initialFetchActiveState, action) {
  const { type } = action;
  switch (type) {
    case HANDLE_ACTIVE_ARTWORK:
      return {
        ...state,
        activeArtwork: action.artwork,
      };
    case GET_ACTIVE_ART_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ACTIVE_ART_SUCCESS:
      return {
        ...state,
        isFetching: false,
        activeArtwork: action.artwork,
      };
    case GET_ACTIVE_ART_FAILED:
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
  fetch: fetchReducer,
  active: fetchActiveReducer,
});
