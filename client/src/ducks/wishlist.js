export const UPDATE_WISHLIST_REQUEST = 'UPDATE_WISHLIST_REQUEST';
export const UPDATE_WISHLIST_SUCCESS = 'UPDATE_WISHLIST_SUCCESS';
export const UPDATE_WISHLIST_FAILED = 'UPDATE_WISHLIST_FAILED';

export const FETCH_WISHLIST_REQUEST = 'FETCH_WISHLIST_REQUEST';
export const FETCH_WISHLIST_SUCCESS = 'FETCH_WISHLIST_SUCCESS';
export const FETCH_WISHLIST_FAILED = 'FETCH_WISHLIST_FAILED';

export const WISH_QUERY_LIMIT = 'WISH_QUERY_LIMIT';
export const WISH_QUERY_PAGE = 'WISH_QUERY_PAGE';

export function updateWishlistRequest(products) {
  return { type: UPDATE_WISHLIST_REQUEST, products };
}

export function updateWishlistSuccess(message) {
  return { type: UPDATE_WISHLIST_SUCCESS, message };
}

export function updateWishlistFailed(message) {
  return { type: UPDATE_WISHLIST_FAILED, message };
}

export function fetchWishlistRequest() {
  return { type: FETCH_WISHLIST_REQUEST };
}

export function fetchWishlistSuccess(wishlist, pagination, message) {
  return {
    type: FETCH_WISHLIST_SUCCESS,
    wishlist,
    pagination,
    message,
  };
}

export function fetchWishlistFailed(message) {
  return { type: FETCH_WISHLIST_FAILED, message };
}

export function wishQueryLimit(limit) {
  return { type: WISH_QUERY_LIMIT, limit };
}

export function wishQueryPage(page) {
  return { type: WISH_QUERY_PAGE, page };
}

export const initialState = {
  isFetching: false,
  error: false,
  message: '',
  wishlist: [],
  query: {},
  page: 1,
  total: 1,
  limit: 12,
};

export default function wishlistReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case UPDATE_WISHLIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATE_WISHLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        message: action.message,
      };
    case UPDATE_WISHLIST_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case FETCH_WISHLIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_WISHLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        wishlist: action.wishlist,
        page: action.pagination.page,
        total: action.pagination.total,
        limit: action.pagination.limit,
        message: action.message,
      };
    case FETCH_WISHLIST_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case WISH_QUERY_LIMIT:
      return {
        ...state,
        query: {
          ...state.query,
          limit: action.limit,
        },
      };
    case WISH_QUERY_PAGE:
      return {
        ...state,
        query: {
          ...state.query,
          page: action.page,
        },
      };
    default: return state;
  }
};

