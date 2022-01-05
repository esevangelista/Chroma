import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin, Icon, Layout } from 'antd';
import { connect } from 'react-redux';
import Header from '../header/';
import Footer from '../../global/footer/';
import { checkUserSession } from '../../ducks/users';
import { orderQuery } from '../../ducks/orders';

import Main from './Main/';

const { Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Orders extends Component {
  componentDidMount() {
    this.props.checkUserSession();
    window.scrollTo(0, 0);
  }
  componentWillUnmount() {
    this.props.orderQuery({});
  }
  render() {
    const { isGettingSession, profile } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          isGettingSession ?
            <Spin indicator={antIcon} style={{ position: 'absolute', top: '50%' }} />
          :
            profile && profile._id ?
              <Layout>
                <Header {...this.props} />
                <Content className="site-content art-site-content">
                  <Switch>
                    <Route path="/orders" component={Main} {...this.props} />
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

Orders.propTypes = {
  orderQuery: PropTypes.func.isRequired,
  checkUserSession: PropTypes.func.isRequired,
  isGettingSession: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => state.user;

const mapDispatchToProps = {
  checkUserSession,
  orderQuery,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
