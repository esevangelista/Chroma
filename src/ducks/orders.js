export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILED = 'FETCH_ORDERS_FAILED';

export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILED = 'ADD_ORDER_FAILED';

export const ORDER_QUERY = 'ORDER_QUERY';
export const HANDLE_NEW_ORDER = 'HANDLE_NEW_ORDER';

export const UPLOAD_PROOF_OF_PAYMENT_REQUEST = 'UPLOAD_PROOF_OF_PAYMENT_REQUEST';
export const UPLOAD_PROOF_OF_PAYMENT_SUCCESS = 'UPLOAD_PROOF_OF_PAYMENT_SUCCESS';
export const UPLOAD_PROOF_OF_PAYMENT_FAILED = 'UPLOAD_PROOF_OF_PAYMENT_FAILED';

export const CANCEL_ORDER_REQUEST = 'CANCEL_ORDER_REQUEST';
export const CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS';
export const CANCEL_ORDER_FAILED = 'CANCEL_ORDER_FAILED';

export function cancelOrderRequest(_id) {
  return { type: CANCEL_ORDER_REQUEST, _id };
}

export function cancelOrderSuccess(message) {
  return { type: CANCEL_ORDER_SUCCESS, message };
}

export function cancelOrderFailed(message) {
  return { type: CANCEL_ORDER_FAILED, message };
}

export function uploadProofOfPaymentRequest(_id, data) {
  return { type: UPLOAD_PROOF_OF_PAYMENT_REQUEST, _id, data };
}

export function uploadProofOfPaymentSuccess(message) {
  return { type: UPLOAD_PROOF_OF_PAYMENT_SUCCESS, message };
}

export function uploadProofOfPaymentFailed(message) {
  return { type: UPLOAD_PROOF_OF_PAYMENT_FAILED, message };
}

export function fetchOrdersRequest() {
  return { type: FETCH_ORDERS_REQUEST };
}

export function fetchOrdersSuccess(orders, pagination) {
  return { type: FETCH_ORDERS_SUCCESS, orders, pagination };
}

export function fetchOrdersFailed(message) {
  return { type: FETCH_ORDERS_FAILED, message };
}

export function orderQuery(query) {
  return { type: ORDER_QUERY, query };
}

export function handleNewOrder(order) {
  return { type: HANDLE_NEW_ORDER, order };
}

export function addOrderRequest() {
  return { type: ADD_ORDER_REQUEST };
}

export function addOrderSuccess() {
  return { type: ADD_ORDER_SUCCESS };
}

export function addOrderFailed(message) {
  return { type: ADD_ORDER_FAILED, message };
}

const initialState = {
  orders: [],
  pagination: {},
  newOrder: {},
  query: {},
  isFetching: false,
  message: '',
  error: false,
};


export default function orderReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case ORDER_QUERY:
      return {
        ...state,
        query: action.query,
        isFetching: true,
      };
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        orders: action.orders,
        pagination: action.pagination,
      };
    case FETCH_ORDERS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case ADD_ORDER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        newOrder: {},
      };
    case ADD_ORDER_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case HANDLE_NEW_ORDER:
      return {
        ...state,
        newOrder: action.order,
      };
    case UPLOAD_PROOF_OF_PAYMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UPLOAD_PROOF_OF_PAYMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        message: action.message,
      };
    case UPLOAD_PROOF_OF_PAYMENT_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case CANCEL_ORDER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        message: action.message,
      };
    case CANCEL_ORDER_FAILED:
      return {
        ...state,
        isFetching: false,
        message: action.message,
        error: true,
      };
    default:
      return state;
  }
}

