import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import createHistory from 'history/createBrowserHistory';
import ErrorReporting from '../errorReporting';
import authReducer from '../pages/login/duck';
import authSagas from '../pages/login/saga';

export const history = createHistory();

const initialState = {};
const enhancers = [];

const sagaMiddleware = createSagaMiddleware({
  onError(error) {
    ErrorReporting.captureException(error);
  },
});

const middleware = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer, initialState, composedEnhancers);

function* rootSaga() {
  yield all([...authSagas]);
}
sagaMiddleware.run(rootSaga);

export default store;
