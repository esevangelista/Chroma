export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILED = 'FETCH_ARTISTS_FAILED';
export const ARTISTS_QUERY_NAME = 'ARTISTS_QUERY_NAME';
export const ARTISTS_QUERY_PAGE = 'ARTISTS_QUERY_PAGE';
export const ARTISTS_QUERY_LIMIT = 'ARTISTS_QUERY_LIMIT';
export const ARTIST_QUERY_RATE = 'ARTIST_QUERY_RATE';
export const ARTIST_QUERY_LOCATION = 'ARTIST_QUERY_LOCATION';
export const ARTIST_QUERY_ART_TYPE = 'ARTIST_QUERY_ART_TYPE';
export const ARTIST_CLEAR_QUERY = 'ARTIST_CLEAR_QUERY';
export const GET_ARTIST_REQUEST = 'GET_ARTIST_REQUEST';
export const GET_ARTIST_SUCCESS = 'GET_ARTIST_SUCCESS';
export const GET_ARTIST_FAILED = 'GET_ARTIST_FAILED';

export function fetchArtistsRequest() {
  return { type: FETCH_ARTISTS_REQUEST };
}

export function fetchArtistsSuccess(artists, pagination) {
  return { type: FETCH_ARTISTS_SUCCESS, artists, pagination };
}

export function fetchArtistsFailed(message) {
  return { type: FETCH_ARTISTS_FAILED, message };
}

export function handleQueryName(name) {
  return { type: ARTISTS_QUERY_NAME, name };
}

export function handleQueryLimit(limit) {
  return { type: ARTISTS_QUERY_LIMIT, limit };
}

export function handleQueryPage(page) {
  return { type: ARTISTS_QUERY_PAGE, page };
}

export function getArtistRequest(_id) {
  return { type: GET_ARTIST_REQUEST, _id };
}

export function getArtistSuccess(user) {
  return { type: GET_ARTIST_SUCCESS, user };
}

export function getArtistFailed(message) {
  return { type: GET_ARTIST_FAILED, message };
}

export function artistQueryRate(rate) {
  return { type: ARTIST_QUERY_RATE, rate };
}

export function artistQueryLocation(location) {
  return { type: ARTIST_QUERY_LOCATION, location };
}

export function artistQueryArtType(artform) {
  return { type: ARTIST_QUERY_ART_TYPE, artform };
}

export function artistClearQuery() {
  return { type: ARTIST_CLEAR_QUERY };
}

const initialState = {
  artists: [],
  pagination: {
    page: 1,
    total: 1,
    limit: 12,
  },
  isFetching: false,
  error: false,
  message: '',
  query: {
    isArtist: true,
  },
  artist: {},
};

function artistReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case GET_ARTIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ARTIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        artist: action.user,
      };
    case GET_ARTIST_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case FETCH_ARTISTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_ARTISTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        artists: action.artists,
        pagination: action.pagination,
      };
    case FETCH_ARTISTS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case ARTISTS_QUERY_NAME:
      return {
        ...state,
        query: {
          ...state.query,
          name: action.name,
        },
      };
    case ARTISTS_QUERY_LIMIT:
      return {
        ...state,
        query: {
          ...state.query,
          limit: action.limit,
          page: 1,
        },
      };
    case ARTISTS_QUERY_PAGE:
      return {
        ...state,
        query: {
          ...state.query,
          page: action.page,
        },
      };
    case ARTIST_QUERY_RATE:
      return {
        ...state,
        query: {
          ...state.query,
          rate: action.rate,
        },
      };
    case ARTIST_QUERY_LOCATION:
      return {
        ...state,
        query: {
          ...state.query,
          ...action.location,
        },
      };
    case ARTIST_QUERY_ART_TYPE:
      return {
        ...state,
        query: {
          ...state.query,
          artform: action.artform,
        },
      };
    case ARTIST_CLEAR_QUERY:
      return {
        ...state,
        query: {
          isArtist: true,
        },
      };
    default: return state;
  }
}

export default artistReducer;
