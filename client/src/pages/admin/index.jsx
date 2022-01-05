import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Spin, Icon } from 'antd';
import { checkAdminSession } from '../../ducks/admin';
import Login from './login/';
import Main from './main/';
import './admin.css';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { Content } = Layout;

class Admin extends Component {
  componentDidMount() {
    this.props.checkAdminSession();
  }
  render() {
    const { isGettingSession, admin } = this.props;
    return (
      <div className="admin-main">
        {
          isGettingSession ?
            <Spin indicator={antIcon} style={{ position: 'absolute', top: '50%' }} />
          : admin ?
            <Layout>
              <Content>
                <Switch>
                  <Route path="/(admin|admin/users)/" component={() => <Main />} />
                </Switch>
              </Content>
            </Layout>
          :
            <div className="admin-login">
              <Login />
            </div>
        }
      </div>
    );
  }
}

Admin.propTypes = {
  checkAdminSession: PropTypes.func.isRequired,
  isGettingSession: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
  admin: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
};

const mapStateToProps = state => state.admin.auth;
const mapDispatchToProps = { checkAdminSession };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
