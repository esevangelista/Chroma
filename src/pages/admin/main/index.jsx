import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { Menu, Icon, Layout } from 'antd';
import Logo from '../../../global/logo/';
import { adminLogoutRequest } from '../../../ducks/admin';
import Users from '../users/';
import './main.css';

const { Content, Sider, Header } = Layout;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.onCollapse = this.onCollapse.bind(this);
  }
  onCollapse = () => this.setState({ collapsed: !this.state.collapsed }); 
  render() {
    return (
      <Layout className="admin-users-content">
        <Sider collapsible trigger={null} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/admin/users">
                <Icon type="user" />
                <span>Users</span>
              </Link>
            </Menu.Item>
           {
            // <Menu.Item key="2">
            //   <Icon type="audit" />
            //   <span>Transactions</span>
            // </Menu.Item>
            }
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.onCollapse}
            />
            <Link to="/admin/users"><Logo /></Link>
            <a className="logout" onClick={() => this.props.adminLogoutRequest()}> Logout </a>
          </Header>
          <Content>
            <Switch>
              <Route path="/(admin|admin/users)/" component={Users} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

Main.propTypes = {
  adminLogoutRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.admin;
const mapDispatchToProps = { adminLogoutRequest };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
