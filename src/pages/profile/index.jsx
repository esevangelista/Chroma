import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin, Icon, Layout } from 'antd';
import { connect } from 'react-redux';
import Header from '../header/';
import Footer from '../../global/footer/';
import { checkUserSession } from '../../ducks/users';
import View from './View/';
import Update from './Update/';

const { Content } = Layout;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Profile extends Component {
  componentDidMount() {
    this.props.checkUserSession();
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
                    <Route path="/account/profile" component={View} {...this.props} />
                    <Route path="/account/settings" component={Update} {...this.props} />
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

Profile.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
