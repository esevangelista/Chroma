export const FETCH_NOTIFS_REQUEST = 'FETCH_NOTIFS_REQUEST';
export const FETCH_NOTIFS_SUCCESS = 'FETCH_NOTIFS_SUCCESS';
export const FETCH_NOTIFS_FAILED = 'FETCH_NOTIFS_FAILED';

export const READ_NOTIFS_REQUEST = 'READ_NOTIFS_REQUEST';
export const READ_NOTIFS_SUCCESS = 'READ_NOTIFS_SUCCESS';
export const READ_NOTIFS_FAILED = 'READ_NOTIFS_FAILED';

export function readNotifsRequest() {
  return { type: READ_NOTIFS_REQUEST };
}

export function readNotifsSuccess(notifications) {
  return { type: READ_NOTIFS_SUCCESS, notifications };
}

export function readNotifsFailed(message) {
  return { type: READ_NOTIFS_FAILED, message };
}
export function fetchNotifsRequest() {
  return { type: FETCH_NOTIFS_REQUEST };
}

export function fetchNotifsSuccess(notifications) {
  return { type: FETCH_NOTIFS_SUCCESS, notifications };
}

export function fetchNotifsFailed(message) {
  return { type: FETCH_NOTIFS_FAILED, message };
}
const initialState = {
  isFetching: false,
  message: '',
  error: false,
  notifications: [],
};

export default function notifReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case FETCH_NOTIFS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_NOTIFS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notifications: action.notifications,
      };
    case FETCH_NOTIFS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    case READ_NOTIFS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case READ_NOTIFS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notifications: action.notifications,
      };
    case READ_NOTIFS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
      };
    default: return state;
  }
}
