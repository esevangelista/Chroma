import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Main from '../pages/Main/';
import ConfirmAccount from '../pages/confirmEmail';
import AlertContainer from '../global/alertContainer';
import Artworks from '../pages/artworks/';
import Store from '../pages/store/';
import Wishlist from '../pages/wishlist/';

import './App.css';


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
            <Route path="/wishlist" component={props => <Wishlist {...props} />} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(App);
