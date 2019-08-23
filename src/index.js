/* eslint-disable import/first */
// import './errorReporting';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './app/store';
import { CometChat } from '@cometchat-pro/chat';
import App from './app';
import * as serviceWorker from './serviceWorker';
import './index.css';

const APP_ID = '60893392e15857';

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

CometChat.init(APP_ID).then(
  () => {
    /* eslint-disable-next-line no-console */
    console.log('CometChat: Initialization completed successfully');
    // You can now call login function.
  },
  error => {
    /* eslint-disable-next-line no-console */
    console.log('Initialization failed with error:', error);
    // Check the reason for error and take appropriate action.
  },
);
