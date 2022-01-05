
export const ALERT_DISPLAY = 'ALERT_DISPLAY';
export const ALERT_HIDE = 'ALERT_HIDE';

export function alertDisplay({ alertType, message }) {
  return { type: ALERT_DISPLAY, alertType, message };
}

export function alertHide() {
  return { type: ALERT_HIDE };
}

const initialState = {
  alertType: null,
  alertMessage: null,
};


export default function feedbackReducer(state = initialState, action) {
  switch (action.type) {
    case ALERT_DISPLAY:
      return {
        ...state,
        alertType: action.alertType,
        alertMessage: action.message,
      };
    case ALERT_HIDE:
      return {
        ...state,
        alertType: null,
        alertMessage: null,
      };
    default:
      return state;
  }
}

