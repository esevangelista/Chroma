import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin, Icon, Layout } from 'antd';
import { connect } from 'react-redux';
import Header from '../header/';
import Footer from '../../global/footer/';
import Shipping from './Shipping/';
import Payment from './Payment/';
import { checkUserSession } from '../../ducks/users';

const { Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Checkout extends Component {
  componentDidMount() {
    this.props.checkUserSession();
    window.scrollTo(0, 0);
  }
  render() {
    const { isGettingSession, profile } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          isGettingSession ?
            <Spin indicator={antIcon} style={{ position: 'absolute', top: '50%', left: '50%' }} />
          :
            profile && profile._id ?
              <Layout>
                <Header {...this.props} />
                <Content className="site-content art-site-content">
                  <Switch>
                    <Route path="/checkout/shipping" component={Shipping} {...this.props} />
                    <Route path="/checkout/payment" component={Payment} {...this.props} />
                  </Switch>
                </Content>
                <Footer />
              </Layout>
            : <Redirect to="/" />
        }
      </div>
    );
  }
}

Checkout.propTypes = {
  checkUserSession: PropTypes.func.isRequired,
  isGettingSession: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => state.user;

const mapDispatchToProps = {
  checkUserSession,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
