import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
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
import Messages from '../pages/messages/';
import NotFound from '../global/notFound/';
import './App.css';


const { Content } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Layout>
        <AlertContainer />
        <Content className="ayokona">
          <Switch>
            <Route path="/verify-account/:confirmToken" component={ConfirmAccount} />
            <Route exact path="/" component={props => <Main {...props} />} />
            <Route path="/artworks" component={props => <Artworks {...props} />} />
            <Route path="/my-store" component={props => <Store {...props} />} />
            <Route exact path="/wishlist" component={props => <Wishlist {...props} />} />
            <Route exact path="/orders" component={props => <Orders {...props} />} />
            <Route path="/artists" component={props => <Artists {...props} />} />
            <Route path="/(messages|messages/:uid)/" component={props => <Messages {...props} />} />
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
