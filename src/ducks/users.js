export const CHECK_SESSION_EXISTS = 'CHECK_SESSION_EXISTS';
export const FETCH_SESSION_REQUEST = 'FETCH_SESSION_REQUEST';
export const FETCH_SESSION_SUCCESS = 'FETCH_SESSION_SUCCESS';
export const FETCH_SESSION_FAILED = 'FETCH_SESSION_FAILED';

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

const initialState = {
  isGettingSession: true,
  errorMessage: null,
  profile: null,
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
        errorMessage: action.error,
      };
    case CHECK_SESSION_EXISTS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
