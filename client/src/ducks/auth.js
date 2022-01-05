import { combineReducers } from 'redux';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_FAILED = 'CONFIRM_EMAIL_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const ALERT_CLEAR = 'ALERT_CLEAR';

export const HANDLE_LOGIN_MODAL = 'HANDLE_LOGIN_MODAL';

export function handleLoginModal(visible) {
  return { type: HANDLE_LOGIN_MODAL, visible };
}
export function alertClear() {
  return { type: ALERT_CLEAR };
}

export function registerRequest(data) {
  return { type: REGISTER_REQUEST, data };
}

export function registerSuccess(message) {
  return { type: REGISTER_SUCCESS, message };
}

export function registerFailed(message) {
  return { type: REGISTER_FAILED, message };
}

export function confirmEmailRequest(data) {
  return { type: CONFIRM_EMAIL_REQUEST, data };
}

export function confirmEmailSuccess(message) {
  return { type: CONFIRM_EMAIL_SUCCESS, message };
}

export function confirmEmailFailed(message) {
  return { type: CONFIRM_EMAIL_FAILED, message };
}

export function loginRequest(data) {
  return { type: LOGIN_REQUEST, data };
}

export function loginSuccess(message) {
  return { type: LOGIN_SUCCESS, message };
}

export function loginFailed(message) {
  return { type: LOGIN_FAILED, message };
}

export function logoutRequest() {
  return { type: LOGOUT_REQUEST };
}

export function logoutSuccess() {
  return { type: LOGOUT_SUCCESS };
}

export function logoutFailed(message) {
  return { type: LOGOUT_FAILED, message };
}

const initialState = {
  isFetching: false,
  error: false,
  message: '',
  visible: false,
};

function createAuthReducer(actions) {
  return (state = initialState, action) => {
    switch (action.type) {
      case actions.alertclear:
        return {
          ...state,
          error: false,
          message: null,
        };
      case actions.request:
        return {
          ...state,
          isFetching: true,
          error: null,
          message: null,
        };
      case actions.success:
        return {
          ...state,
          isFetching: false,
          error: false,
          message: action.message,
        };
      case actions.failed:
        return {
          ...state,
          isFetching: false,
          error: true,
          message: action.message,
        };
      case actions.prompt:
        return {
          ...state,
          visible: action.visible,
        };
      default:
        return state;
    }
  };
}

export default combineReducers({
  register: createAuthReducer({
    alertclear: ALERT_CLEAR,
    request: REGISTER_REQUEST,
    success: REGISTER_SUCCESS,
    failed: REGISTER_FAILED,
  }),
  confirmEmail: createAuthReducer({
    request: CONFIRM_EMAIL_REQUEST,
    success: CONFIRM_EMAIL_SUCCESS,
    failed: CONFIRM_EMAIL_FAILED,
  }),
  login: createAuthReducer({
    alertclear: ALERT_CLEAR,
    prompt: HANDLE_LOGIN_MODAL,
    request: LOGIN_REQUEST,
    success: LOGIN_SUCCESS,
    failed: LOGIN_FAILED,
  }),
  logout: createAuthReducer({
    request: LOGOUT_REQUEST,
    success: LOGOUT_SUCCESS,
    failed: LOGOUT_FAILED,
  }),
});

