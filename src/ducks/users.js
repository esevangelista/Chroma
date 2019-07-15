export const CHECK_SESSION_EXISTS = 'CHECK_SESSION_EXISTS';
export const FETCH_SESSION_REQUEST = 'FETCH_SESSION_REQUEST';
export const FETCH_SESSION_SUCCESS = 'FETCH_SESSION_SUCCESS';
export const FETCH_SESSION_FAILED = 'FETCH_SESSION_FAILED';

export const UPDATE_ACCOUNT_REQUEST = 'UPDATE_ACCOUNT_REQUEST';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
export const UPDATE_ACCOUNT_FAILED = 'UPDATE_ACCOUNT_FAILED';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';

export const CHANGE_EMAIL_REQUEST = 'CHANGE_EMAIL_REQUEST';
export const CHANGE_EMAIL_SUCCESS = 'CHANGE_EMAIL_SUCCESS';
export const CHANGE_EMAIL_FAILED = 'CHANGE_EMAIL_FAILED';

export const CHANGE_ACCOUNT_TYPE_REQUEST = 'CHANGE_ACCOUNT_TYPE_REQUEST';
export const CHANGE_ACCOUNT_TYPE_SUCCESS = 'CHANGE_ACCOUNT_TYPE_SUCCESS';
export const CHANGE_ACCOUNT_TYPE_FAILED = 'CHANGE_ACCOUNT_TYPE_FAILED';

export const CLEAR_ACCOUNT_ALERT = 'CLEAR_ACCOUNT_ALERT';

export function checkUserSession() {
  return { type: CHECK_SESSION_EXISTS };
}

export function fetchSessionRequest() {
  return { type: FETCH_SESSION_REQUEST };
}

export function fetchSessionSuccess(user) {
  return { type: FETCH_SESSION_SUCCESS, user };
}

export function fetchSessionFailed(error) {
  return { type: FETCH_SESSION_FAILED, error };
}

export function updateAccountRequest(data) {
  return { type: UPDATE_ACCOUNT_REQUEST, data };
}

export function updateAccountSuccess(user) {
  return { type: UPDATE_ACCOUNT_SUCCESS, user };
}

export function updateAccountFailed(message) {
  return { type: UPDATE_ACCOUNT_FAILED, message };
}

export function updateProfileRequest(data) {
  return { type: UPDATE_PROFILE_REQUEST, data };
}

export function updateProfileSuccess(user) {
  return { type: UPDATE_PROFILE_SUCCESS, user };
}

export function updateProfileFailed(message) {
  return { type: UPDATE_PROFILE_FAILED, message };
}

export function changeEmailRequest(email) {
  return { type: CHANGE_EMAIL_REQUEST, email };
}

export function changeEmailSuccess(message) {
  return { type: CHANGE_EMAIL_SUCCESS, message };
}

export function changeEmailFailed(message) {
  return { type: CHANGE_EMAIL_FAILED, message };
}

export function changeAccountTypeRequest(toArtist) {
  return { type: CHANGE_ACCOUNT_TYPE_REQUEST, toArtist };
}

export function changeAccountTypeSuccess(message) {
  return { type: CHANGE_ACCOUNT_TYPE_SUCCESS, message };
}

export function changeAccountTypeFailed(message) {
  return { type: CHANGE_ACCOUNT_TYPE_FAILED, message };
}

export function clearAccountAlert() {
  return { type: CLEAR_ACCOUNT_ALERT };
}

const initialState = {
  isGettingSession: true,
  error: false,
  message: '',
  profile: {},
};

export default function userReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case FETCH_SESSION_REQUEST:
      return {
        ...state,
        isGettingSession: true,
      };
    case FETCH_SESSION_SUCCESS:
      return {
        ...state,
        isGettingSession: false,
        profile: action.user,
      };
    case FETCH_SESSION_FAILED:
      return {
        ...state,
        isGettingSession: false,
        error: true,
        message: action.error,
      };
    case CHECK_SESSION_EXISTS:
      return {
        ...state,
      };
    case UPDATE_ACCOUNT_REQUEST:
      return {
        ...state,
        isGettingSession: true,
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isGettingSession: false,
        profile: action.user,
        message: 'User information successfully updated.',
      };
    case UPDATE_ACCOUNT_FAILED:
      return {
        ...state,
        isGettingSession: false,
        error: true,
        message: action.message,
      };
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isGettingSession: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isGettingSession: false,
        profile: action.user,
        message: 'Successfully updated profile information.',
      };
    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        isGettingSession: false,
        error: true,
        message: action.message,
      };
    case CHANGE_EMAIL_REQUEST:
      return {
        ...state,
        isGettingSession: true,
      };
    case CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        isGettingSession: false,
        message: action.message,
      };
    case CHANGE_EMAIL_FAILED:
      return {
        ...state,
        isGettingSession: false,
        error: true,
        message: action.message,
      };
    case CHANGE_ACCOUNT_TYPE_REQUEST:
      return {
        ...state,
        isGettingSession: true,
      };
    case CHANGE_ACCOUNT_TYPE_SUCCESS:
      return {
        ...state,
        isGettingSession: false,
        message: action.message,
      };
    case CHANGE_ACCOUNT_TYPE_FAILED:
      return {
        ...state,
        isGettingSession: false,
        error: true,
        message: action.message,
      };
    case CLEAR_ACCOUNT_ALERT:
      return {
        ...state,
        message: '',
      };
    default:
      return state;
  }
}
