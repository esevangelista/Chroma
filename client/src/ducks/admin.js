import { combineReducers } from 'redux';

export const CHECK_ADMIN_SESSION = 'CHECK_ADMIN_SESSION';
export const FETCH_ADMIN_SESSION_REQUEST = 'FETCH_ADMIN_SESSION_REQUEST';
export const FETCH_ADMIN_SESSION_SUCCESS = 'FETCH_ADMIN_SESSION_SUCCESS';
export const FETCH_ADMIN_SESSION_FAILED = 'FETCH_ADMIN_SESSION_FAILED';

export const ADMIN_LOGIN_REQUEST = 'ADMIN_LOGIN_REQUEST';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';
export const ADMIN_LOGIN_FAILED = 'ADMIN_LOGIN_FAILED';

export const ADMIN_LOGOUT_REQUEST = 'ADMIN_LOGOUT_REQUEST';
export const ADMIN_LOGOUT_SUCCESS = 'ADMIN_LOGOUT_SUCCESS';
export const ADMIN_LOGOUT_FAILED = 'ADMIN_LOGOUT_FAILED';


export function checkAdminSession() {
  return { type: CHECK_ADMIN_SESSION };
}

export function fetchAdminSessionRequest() {
  return { type: FETCH_ADMIN_SESSION_REQUEST };
}

export function fetchAdminSessionSuccess(admin) {
  return { type: FETCH_ADMIN_SESSION_SUCCESS, admin };
}

export function fetchAdminSessionFailed(message) {
  return { type: FETCH_ADMIN_SESSION_FAILED, message };
}

export function adminLoginRequest(data) {
  return { type: ADMIN_LOGIN_REQUEST, data };
}

export function adminLoginSuccess(admin) {
  return { type: ADMIN_LOGIN_SUCCESS, admin };
}

export function adminLoginFailed(message) {
  return { type: ADMIN_LOGIN_FAILED, message };
}

export function adminLogoutRequest() {
  return { type: ADMIN_LOGOUT_REQUEST };
}

export function adminLogoutSuccess() {
  return { type: ADMIN_LOGOUT_SUCCESS };
}

export function adminLogoutFailed(message) {
  return { type: ADMIN_LOGOUT_FAILED, message };
}

const initialAuthState = {
  admin: null,
  isGettingSession: false,
  error: false,
  message: '',
};

function authReducer(state = initialAuthState, action) {
  const { type } = action;
  switch (type) {
    case CHECK_ADMIN_SESSION:
      return {
        ...state,
        isGettingSession: true,
      };
    case FETCH_ADMIN_SESSION_REQUEST:
      return {
        ...state,
        isGettingSession: true,
      };
    case FETCH_ADMIN_SESSION_SUCCESS:
      return {
        ...state,
        isGettingSession: false,
        admin: action.admin,
      };
    case FETCH_ADMIN_SESSION_FAILED:
      return {
        ...state,
        isGettingSession: false,
        message: action.message,
        error: true,
      };
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        isGettingSession: true,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isGettingSession: false,
        admin: action.admin,
      };
    case ADMIN_LOGIN_FAILED:
      return {
        ...state,
        isGettingSession: false,
        error: true,
        message: action.message,
      };
    case ADMIN_LOGOUT_REQUEST:
      return {
        ...state,
        isGettingSession: true,
      };
    case ADMIN_LOGOUT_SUCCESS:
      return {
        ...state,
        isGettingSession: false,
        message: action.message,
      };
    case ADMIN_LOGOUT_FAILED:
      return {
        ...state,
        isGettingSession: false,
        error: true,
        message: action.message,
      };
    default: return state;
  }
}

export const ADMIN_USERS_REQUEST = 'ADMIN_USERS_REQUEST';
export const ADMIN_USERS_SUCCESS = 'ADMIN_USERS_SUCCESS';
export const ADMIN_USERS_FAILED = 'ADMIN_USERS_FAILED';

export const ADMIN_USERS_QUERY = 'ADMIN_USERS_QUERY';

export const ADMIN_USER_REQUEST = 'ADMIN_USER_REQUEST';
export const ADMIN_USER_SUCCESS = 'ADMIN_USER_SUCCESS';
export const ADMIN_USER_FAILED = 'ADMIN_USER_FAILED';


export function adminUsersRequest() {
  return { type: ADMIN_USERS_REQUEST };
}

export function adminUsersSuccess(users, pagination) {
  return { type: ADMIN_USERS_SUCCESS, users, pagination };
}

export function adminUsersFailed(message) {
  return { type: ADMIN_USERS_FAILED, message };
}

export function adminUsersQuery(query) {
  return { type: ADMIN_USERS_QUERY, query };
}

export function adminUserRequest(_id) {
  return { type: ADMIN_USER_REQUEST, _id };
}

export function adminUserSuccess(user) {
  return { type: ADMIN_USER_SUCCESS, user };
}

export function adminUserFailed(message) {
  return { type: ADMIN_USER_FAILED, message };
}

const initialUsersState = {
  isFetching: false,
  error: false,
  message: '',
  users: [],
  query: {},
  pagination: {},
  user: null,
};

function usersReducer(state = initialUsersState, action) {
  const { type } = action;
  switch (type) {
    case ADMIN_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ADMIN_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.users,
        pagination: action.pagination,
      };
    case ADMIN_USERS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case ADMIN_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ADMIN_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.user,
      };
    case ADMIN_USER_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case ADMIN_USERS_QUERY:
      return {
        ...state,
        query: action.query,
      };
    default: return state;
  }
}

export const ADMIN_TRANSACTIONS_REQUEST = 'ADMIN_TRANSACTIONS_REQUEST';
export const ADMIN_TRANSACTIONS_SUCCESS = 'ADMIN_TRANSACTIONS_SUCCESS';
export const ADMIN_TRANSACTIONS_FAILED = 'ADMIN_TRANSACTIONS_FAILED';

export const ADMIN_TRANSACTIONS_QUERY = 'ADMIN_TRANSACTIONS_QUERY';
export const ADMIN_TRANSACTION_REQUEST = 'ADMIN_TRANSACTION_REQUEST';
export const ADMIN_TRANSACTION_SUCCESS = 'ADMIN_TRANSACTION_SUCCESS';
export const ADMIN_TRANSACTION_FAILED = 'ADMIN_TRANSACTION_FAILED';

export function adminTransactionsRequest(_id) {
  return { type: ADMIN_TRANSACTIONS_REQUEST, _id };
}

export function adminTransactionsSuccess(transactions, pagination) {
  return { type: ADMIN_TRANSACTIONS_SUCCESS, transactions, pagination };
}

export function adminTransactionsFailed(message) {
  return { type: ADMIN_TRANSACTIONS_FAILED, message };
}

export function adminTransactionsQuery(query) {
  return { type: ADMIN_TRANSACTIONS_QUERY, query };
}

export function adminTransactionRequest(_id) {
  return { type: ADMIN_TRANSACTION_REQUEST, _id };
}

export function adminTransactionSuccess(transaction) {
  return { type: ADMIN_TRANSACTION_SUCCESS, transaction };
}

export function adminTransactionFailed(message) {
  return { type: ADMIN_TRANSACTION_FAILED, message };
}


const initialTransactionsState = {
  transactions: [],
  pagination: {},
  user: null,
  active: null,
  isFetching: false,
  error: false,
  message: '',
  query: {},
};

function transactionsReducer(state = initialTransactionsState, action) {
  switch (action.type) {
    case ADMIN_TRANSACTIONS_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case ADMIN_TRANSACTIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ADMIN_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        transactions: action.transactions,
        pagination: action.pagination,
        user: action.user,
      };
    case ADMIN_TRANSACTIONS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case ADMIN_TRANSACTION_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ADMIN_TRANSACTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        active: action.transaction,
      };
    case ADMIN_TRANSACTION_FAILED:
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
  auth: authReducer,
  users: usersReducer,
  transactions: transactionsReducer,
});

