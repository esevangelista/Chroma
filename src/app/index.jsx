import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Main from '../pages/Main/';
// import LoginForm from '../pages/login/components/loginForm';
import './App.css';


const { Content } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Layout>
        <Content>
          <Switch>
            <Route exact path="/"component={Main} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(App);
