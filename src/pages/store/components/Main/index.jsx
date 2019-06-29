import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Gallery from '../Gallery/';
import Products from '../Products/';

const { Content } = Layout;

class StoreMain extends Component {
  render() {
    return (
      <Content>
        <Layout>
          <Content className="site-content" style={{ 'marginTop': '80px' }}>
            <Switch>
              <Route exact path="/my-store" component={Gallery} />
              <Route exact path="/my-store/products" component={Products} />
            </Switch>
          </Content>
        </Layout>
      </Content>
    );
  }
}
export default withRouter(StoreMain);
