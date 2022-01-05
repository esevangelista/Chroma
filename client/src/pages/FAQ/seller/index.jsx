import React, { Component } from 'react';
import { Link, Switch, withRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Logo from '../../../global/logo/';
import NotFound from '../../../global/notFound/';
import Main from './main/';
import WhySell from './whysell/';
import GettingStarted from './get-started/';
import ListArtwork from './list-artwork/';
import Artworks from './artworks/';
import Transactions from './transactions/';
import Payments from './payments/';
import ReturnsRefunds from './returns-and-refunds/';
import Deactivate from './deactivate/';
import Delivery from './delivery/';
import './seller.css';

const { Content, Header } = Layout;

class SellerFAQ extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <Layout>
        <Header className="faq-header">
          <Link to="/">
            <Logo />
          </Link>
        </Header>
        <Content className="faq-content">
          <Switch>
            <Route exact path="/FAQs/artists" component={Main} />
            <Route exact path="/FAQs/artists/why-sell" component={WhySell} />
            <Route exact path="/FAQs/artists/getting-started" component={GettingStarted} />
            <Route exact path="/FAQs/artists/artworks" component={Artworks} />
            <Route exact path="/FAQs/artists/transactions" component={Transactions} />
            <Route exact path="/FAQs/artists/listing-an-artwork" component={ListArtwork} />
            <Route exact path="/FAQs/artists/payment" component={Payments} />
            <Route exact path="/FAQs/artists/delivery" component={Delivery} />
            <Route exact path="/FAQs/artists/returns-and-refunds" component={ReturnsRefunds} />
            <Route exact path="/FAQs/artists/deactivate" component={Deactivate} />
            <Route component={NotFound} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(SellerFAQ);
