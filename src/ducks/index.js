import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './users';
import auth from './auth';
import feedback from './feedback';
import product from './products';
import artworks from './artworks';
import cart from './cart';
import wishlist from './wishlist';
import artists from './artists';

const appReducer = combineReducers({
  router: routerReducer,
  auth,
  user,
  cart,
  wishlist,
  feedback,
  product,
  artworks,
  artists,
});

const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export default (state, action) => {
  if (action.type === LOGOUT_REQUEST) {
    state = undefined; // eslint-disable-line
  }

  return appReducer(state, action);
};
