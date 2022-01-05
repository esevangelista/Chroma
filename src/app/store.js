import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import ErrorReporting from '../errorReporting';
import rootSaga from '../sagas';
import rootReducer from '../ducks';

export const history = createBrowserHistory();

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

const store = createStore(rootReducer, initialState, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
