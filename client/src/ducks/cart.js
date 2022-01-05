
export const UPDATE_CART_REQUEST = 'UPDATE_CART_REQUEST';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const UPDATE_CART_FAILED = 'UPDATE_CART_FAILED';

export const FETCH_CART_REQUEST = 'FETCH_CART_REQUEST';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILED = 'FETCH_CART_FAILED';

export function updateCartRequest(products, tally) {
  return { type: UPDATE_CART_REQUEST, products, tally };
}

export function updateCartSuccess(products, total, quantity, tally) {
  return {
    type: UPDATE_CART_SUCCESS,
    products,
    total,
    quantity,
    tally,
  };
}

export function updateCartFailed(message) {
  return { type: UPDATE_CART_FAILED, message };
}

export function fetchCartRequest() {
  return { type: FETCH_CART_REQUEST };
}

export function fetchCartSuccess(products, total, quantity, tally) {
  return {
    type: FETCH_CART_SUCCESS,
    products,
    total,
    quantity,
    tally,
  };
}

export function fetchCartFailed(message) {
  return { type: FETCH_CART_FAILED, message };
}


const initialState = {
  products: [],
  total: 0,
  quantity: 0,
  tally: [],
  isFetching: false,
  error: false,
  message: '',
};

function cartReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case UPDATE_CART_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        products: action.products,
        total: action.total,
        quantity: action.quantity,
        tally: action.tally,
        isFetching: false,
      };
    case UPDATE_CART_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case FETCH_CART_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        products: action.products,
        total: action.total,
        quantity: action.quantity,
        tally: action.tally,
        isFetching: false,
      };
    case FETCH_CART_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    default: return state;
  }
}
export default cartReducer;

