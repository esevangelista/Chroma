import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './users';
import auth from './auth';
import feedback from './feedback';

const appReducer = combineReducers({
  router: routerReducer,
  auth,
  user,
  feedback,
});

const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export default (state, action) => {
  if (action.type === LOGOUT_REQUEST) {
    state = undefined; // eslint-disable-line
  }

  return appReducer(state, action);
};
