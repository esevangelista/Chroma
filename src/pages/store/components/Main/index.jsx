import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Gallery from '../Gallery/';
import Products from '../Products/';
import Transactions from '../Transactions/';

const { Content } = Layout;

class StoreMain extends Component {
  render() {
    return (
      <Content>
        <Layout>
          <Content className="site-content">
            <Switch>
              <Route exact path="/my-store" component={Gallery} />
              <Route exact path="/my-store/products" component={Products} />
              <Route exact path="/my-store/transactions" component={Transactions} />
            </Switch>
          </Content>
        </Layout>
      </Content>
    );
  }
}
export default withRouter(StoreMain);
