export const FETCH_TRANSACTIONS_REQUEST = 'FETCH_TRANSACTIONS_REQUEST';
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
export const FETCH_TRANSACTIONS_FAILED = 'FETCH_TRANSACTIONS_FAILED';

export const HANDLE_TRANSACTIONS_QUERY = 'HANDLE_TRANSACTIONS_QUERY';
export const CHANGE_ACTIVE_TRANSACTION = 'CHANGE_ACTIVE_TRANSACTION';

export const GET_ACTIVE_TRANSACTION_REQUEST = 'GET_ACTIVE_TRANSACTION_REQUEST';
export const GET_ACTIVE_TRANSACTION_SUCCESS = 'GET_ACTIVE_TRANSACTION_SUCCESS';
export const GET_ACTIVE_TRANSACTION_FAILED = 'GET_ACTIVE_TRANSACTION_FAILED';

export const UPDATE_TRANSACTION_REQUEST = 'UPDATE_TRANSACTION_REQUEST';
export const UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS';
export const UPDATE_TRANSACTION_FAILED = 'UPDATE_TRANSACTION_FAILED';

export const SHIP_ORDER_REQUEST = 'SHIP_ORDER_REQUEST';
export const SHIP_ORDER_SUCCESS = 'SHIP_ORDER_SUCCESS';
export const SHIP_ORDER_FAILED = 'SHIP_ORDER_FAILED';

export const COMPLETE_ORDER_REQUEST = 'COMPLETE_ORDER_REQUEST';
export const COMPLETE_ORDER_SUCCESS = 'COMPLETE_ORDER_SUCCESS';
export const COMPLETE_ORDER_FAILED = 'COMPLETE_ORDER_FAILED';

export function completeOrderRequest(_id, data) {
  return { type: COMPLETE_ORDER_REQUEST, _id, data };
}

export function completeOrderSuccess(message) {
  return { type: COMPLETE_ORDER_SUCCESS, message };
}

export function completeOrderFailed(message) {
  return { type: COMPLETE_ORDER_FAILED, message };
}

export function shipOrderRequest(_id, data) {
  return { type: SHIP_ORDER_REQUEST, _id, data };
}

export function shipOrderSuccess(message) {
  return { type: SHIP_ORDER_SUCCESS, message };
}

export function shipOrderFailed(message) {
  return { type: SHIP_ORDER_FAILED, message };
}

export function changeActiveTransaction(active) {
  return { type: CHANGE_ACTIVE_TRANSACTION, active };
}
export function fetchTransactionsRequest() {
  return { type: FETCH_TRANSACTIONS_REQUEST };
}

export function fetchTransactionsSuccess(transactions, pagination) {
  return { type: FETCH_TRANSACTIONS_SUCCESS, transactions, pagination };
}

export function fetchTransactionsFailed(message) {
  return { type: FETCH_TRANSACTIONS_FAILED, message };
}

export function handleTransactionsQuery(query) {
  return { type: HANDLE_TRANSACTIONS_QUERY, query };
}

export function getActiveTransactionRequest(_id) {
  return { type: GET_ACTIVE_TRANSACTION_REQUEST, _id };
}

export function getActiveTransactionSuccess(active) {
  return { type: GET_ACTIVE_TRANSACTION_SUCCESS, active };
}

export function getActiveTransactionFailed(message) {
  return { type: GET_ACTIVE_TRANSACTION_FAILED, message };
}

export function updateTransactionRequest(data) {
  return { type: UPDATE_TRANSACTION_REQUEST, data };
}

export function uodateTransactionSuccess(transaction) {
  return { type: UPDATE_TRANSACTION_SUCCESS, transaction };
}

export function updateTransactionFailed(message) {
  return { type: UPDATE_TRANSACTION_FAILED, message };
}

const initialState = {
  transactions: [],
  query: {},
  active: null,
  isFetching: false,
  message: '',
  error: false,
  pagination: {
    page: 0,
    total: 0,
    limit: 12,
  },
};

export default function transactionReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case FETCH_TRANSACTIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        transactions: action.transactions,
        pagination: action.pagination,
      };
    case FETCH_TRANSACTIONS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case HANDLE_TRANSACTIONS_QUERY:
      return {
        ...state,
        isFetching: true,
        query: action.query,
      };
    case GET_ACTIVE_TRANSACTION_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ACTIVE_TRANSACTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        active: action.active,
      };
    case GET_ACTIVE_TRANSACTION_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case UPDATE_TRANSACTION_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        active: action.transaction,
      };
    case UPDATE_TRANSACTION_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case CHANGE_ACTIVE_TRANSACTION:
      return {
        ...state,
        active: action.active,
      };
    case SHIP_ORDER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SHIP_ORDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        message: action.message,
      };
    case SHIP_ORDER_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case COMPLETE_ORDER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case COMPLETE_ORDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        message: action.message,
      };
    case COMPLETE_ORDER_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    default: return state;
  }
}
