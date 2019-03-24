
// action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function loginRequest(data) {
  return { type: LOGIN_REQUEST, data };
}

export function loginSuccess(user) {
  return { type: LOGIN_SUCCESS, user };
}

export function loginFailure(message) {
  return { type: LOGIN_FAILURE, message };
}

const initialState = {
  isLoggingIn: false,
  isGettingSession: true,

  user: null,
  loginError: null,
};

function authReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginErrors: [],
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        loginError: action.message,
      };
    default:
      return state;
  }
}

export default authReducer;
