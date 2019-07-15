import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import AccountForm from './AccountForm/';
import ProfileForm from './ProfileForm/';
import { clearAccountAlert } from '../../../ducks/users';
import './update.css';

const { Content } = Layout;
// const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '2',
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }
  handleMenuClick = e => {
    this.setState({ current: e.key });
    this.props.clearAccountAlert();
  }

  render() {
    const { current } = this.state;
    return (
      <Content className="update-container">
        <Menu
          defaultSelectedKeys={['2']}
          mode="horizontal"
          onClick={this.handleMenuClick}
          className="menu"
        >
          <Menu.Item key="1">Account Information</Menu.Item>
          <Menu.Item key="2">Profile Information</Menu.Item>
        </Menu>
        {
          current === '1' ?
            <AccountForm />
          : <ProfileForm />
        }
      </Content>
    );
  }
}

Update.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  clearAccountAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.user;

const mapDispatchToProps = {
  clearAccountAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
