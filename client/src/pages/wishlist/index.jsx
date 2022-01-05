import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Spin, Icon } from 'antd';
import Header from '../header/';
import Footer from '../../global/footer/';
import { checkUserSession } from '../../ducks/users';
import Main from './Main/';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { Content } = Layout;

class Wishlist extends Component {
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
          : !isGettingSession && profile && profile._id ?
            <Layout>
              <Header {...this.props} />
              <Content className="site-content art-site-content">
                <Switch>
                  <Route exact path="/wishlist" component={Main} {...this.props} />
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

Wishlist.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wishlist));
