import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin, Icon, Layout } from 'antd';
import { connect } from 'react-redux';
import Header from '../header/';
import Footer from '../../global/footer/';
import { checkUserSession } from '../../ducks/users';
import StoreMain from './components/Main/';

const { Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Store extends Component {
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
            <Spin indicator={antIcon} style={{ position: 'absolute', top: '50%' }} />
          :
            profile && profile.isArtist ?
              <Layout>
                <Header {...this.props} />
                <Content className="art-site-content">
                  <Switch>
                    <Route path="/(my-store|my-store/transactions|my-store/products|my-store/feedbacks|my-store/settings)/" component={StoreMain} {...this.props} />
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

Store.propTypes = {
  checkUserSession: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.user;

const mapDispatchToProps = {
  checkUserSession,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Store));
