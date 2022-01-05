export const SET_USER_SESSION = 'SET_USER_SESSION';
export const UNSET_USER_SESSION = 'UNSET_USER_SESSION';

export const LOGIN_CC_REQUEST = 'LOGIN_CC_REQUEST';
export const LOGIN_CC_SUCCESS = 'LOGIN_CC_SUCCESS';
export const LOGIN_CC_FAILED = 'LOGIN_CC_FAILED';

export const LOGOUT_CC_REQUEST = 'LOGOUT_CC_REQUEST';
export const LOGOUT_CC_SUCCESS = 'LOGOUT_CC_SUCCESS';
export const LOGOUT_CC_FAILED = 'LOGOUT_CC_FAILED';

export const SET_USER_ONLINE = 'SET_USER_ONLINE';
export const SET_USER_OFFLINE = 'SET_USER_OFFLINE';

export const SET_ACTIVE_MESSAGES = 'SET_ACTIVE_MESSAGES';
export const SET_ACTIVE_MESSAGE = 'SET_ACTIVE_MESSAGE';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';

export const UPDATE_USER_UNREAD_MESSAGE = 'UPDATE_USER_UNREAD_MESSAGE';

export const FETCH_UNREAD_COUNT_REQUEST = 'FETCH_UNREAD_COUNT_REQUEST';
export const FETCH_UNREAD_COUNT_SUCCESS = 'FETCH_UNREAD_COUNT_SUCCESS';
export const FETCH_UNREAD_COUNT_FAILED = 'FETCH_UNREAD_COUNT_FAILED';

export const FETCH_MSGS_REQUEST = 'FETCH_MSGS_REQUEST';
export const FETCH_MSGS_SUCCESS = 'FETCH_MSGS_SUCCESS';
export const FETCH_MSGS_FAILED = 'FETCH_MSGS_FAILED';

export const FETCH_CONVO_REQUEST = 'FETCH_CONVO_REQUEST';
export const FETCH_CONVO_SUCCESS = 'FETCH_CONVO_SUCCESS';
export const FETCH_CONVO_FAILED = 'FETCH_CONVO_FAILED';


export function fetchConvoRequest(convo, convoWith, uid) {
  return { type: FETCH_CONVO_REQUEST, convo, convoWith, uid };
}

export function fetchConvoSuccess(convo, convoWith) {
  return { type: FETCH_CONVO_SUCCESS, convo, convoWith };
}

export function fetchConvoFailed(message) {
  return { type: FETCH_CONVO_FAILED, message };
}

export function fetchUnreadCountRequest() {
  return { type: FETCH_UNREAD_COUNT_REQUEST };
}

export function fetchUnreadCountSuccess(unread) {
  return { type: FETCH_UNREAD_COUNT_SUCCESS, unread };
}

export function fetchUnreadCountFailed(message) {
  return { type: FETCH_UNREAD_COUNT_FAILED, message };
}

export function fetchMsgsRequest(msgs) {
  return { type: FETCH_MSGS_REQUEST, msgs };
}

export function fetchMsgsSuccess(messages) {
  return { type: FETCH_MSGS_SUCCESS, messages };
}

export function fetchMsgsFailed(message) {
  return { type: FETCH_MSGS_FAILED, message };
}

const initialState = {
  user: {},
  unread: 0,
  messages: {},
  convo: {},
  convoWith: {},
  isFetching: false,
  isFetchingMsgs: false,
  isFetchingConvo: false,
  error: false,
  message: '',
};

export default function chatReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case FETCH_UNREAD_COUNT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_UNREAD_COUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        unread: action.unread,
      };
    case FETCH_UNREAD_COUNT_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case FETCH_MSGS_REQUEST:
      return {
        ...state,
        isFetchingMsgs: true,
        messages: action.msgs,
      };
    case FETCH_MSGS_SUCCESS:
      return {
        ...state,
        isFetchingMsgs: false,
        messages: action.messages,
      };
    case FETCH_MSGS_FAILED:
      return {
        ...state,
        isFetchingMsgs: false,
        error: true,
        message: action.message,
      };
    case FETCH_CONVO_REQUEST:
      return {
        ...state,
        isFetchingConvo: true,
        convo: action.convo,
        convowith: action.convoWith,
      };
    case FETCH_CONVO_SUCCESS:
      return {
        ...state,
        isFetchingConvo: false,
        convo: action.convo,
        convoWith: action.convoWith,
      };
    case FETCH_CONVO_FAILED:
      return {
        ...state,
        isFetchingConvo: false,
        error: true,
        message: action.message,
      };
    default: return state;
  }
}
