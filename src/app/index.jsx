import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { CometChat } from '@cometchat-pro/chat';
import Main from '../pages/Main/';
import ConfirmAccount from '../pages/confirmEmail';
import AlertContainer from '../global/alertContainer';
import Artworks from '../pages/artworks/';
import Store from '../pages/store/';
import Wishlist from '../pages/wishlist/';
import Profile from '../pages/profile/';
import Artists from '../pages/artists/';
import Checkout from '../pages/checkout/';
import Orders from '../pages/orders';
import NotFound from '../global/notFound/';
import './App.css';

const APP_ID = '3998e1cbba3b89';

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

const { Content } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Layout>
        <AlertContainer />
        <Content>
          <Switch>
            <Route path="/verify-account/:confirmToken" component={ConfirmAccount} />
            <Route exact path="/" component={props => <Main {...props} />} />
            <Route path="/artworks" component={props => <Artworks {...props} />} />
            <Route path="/my-store" component={props => <Store {...props} />} />
            <Route exact path="/wishlist" component={props => <Wishlist {...props} />} />
            <Route exact path="/orders" component={props => <Orders {...props} />} />
            <Route path="/artists" component={props => <Artists {...props} />} />
            <Route path="/(account/profile|account/settings)/" component={props => <Profile {...props} />} />
            <Route path="/(checkout/shipping|checkout/payment|checkout/confirm)/" component={props => <Checkout {...props} />} />
            <Route component={NotFound} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(App);
