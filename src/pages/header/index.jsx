import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Input, Drawer, Button, Popover, Row } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../global/logo';
import './header.css';
import LoginForm from '../login/';
import { logoutRequest } from '../../ducks/auth';
import { checkUserSession } from '../../ducks/users';

const { Search } = Input;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.onClose = this.onClose.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    // this.props.checkUserSession();
    // console.log(this.props)
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  logout = () => {
    this.props.logoutRequest();
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { profile } = this.props;
    return (
      <Layout.Header className="site-header">
        <Menu mode="horizontal" >
          <Menu.Item key="logo" className="logo-container">
            <Link to="/">
              <Logo />
            </Link>
          </Menu.Item>
          <Menu.Item key="1" className="show-on-desktop discover">
            <Search
              placeholder="Search"
              onSearch={value => console.log(value)}
              style={{ width: 300 }}
              allowClear
            />
          </Menu.Item>
          <Menu.Item key="2" className="show-on-desktop discover">
            Artists
          </Menu.Item>
          <Menu.Item key="3" className="show-on-desktop discover">
            Artworks
          </Menu.Item>
          <Menu.Item key="4" className="hide-on-desktop">
            <Icon type="search" />
          </Menu.Item>
          <Menu.Item key="5">
            <Popover
              className="popover"
              placement="bottom"
              content={"Your cart is empty."}
              trigger="click"
              arrowPointAtCenter
            >
              <Icon type="shopping" />
            </Popover>
          </Menu.Item>
          <Menu.Item key="6" className="show-on-desktop">
            { profile ?
              <Popover
                className="popover"
                placement="bottomRight"
                content={<a onClick={this.logout}> Logout </a>}
                trigger="click"
                arrowPointAtCenter
              >
                <Icon type="user" />
              </Popover>
              :
              <LoginForm />
            }
          </Menu.Item>
          <Menu.Item key="7" className="hide-on-desktop">
            <Button id="btn-drawer" onClick={this.showDrawer} >
              <Icon type="menu-unfold" />
            </Button>
            <Drawer
              placement="left"
              onClose={this.onClose}
              visible={this.state.visible}
            >
              {
                profile ?
                  <div>
                    <p>Artworks</p>
                    <p>Artists</p>
                    <p>Profile</p>
                    <p>Wishlist</p>
                    <p>My Orders</p>
                    <p>Gallery</p>
                    <p>Inbox</p>
                    <p>FAQs</p>
                    <p> Logout </p>
                  </div>
                :
                  <div>
                    <p>Artworks</p>
                    <p>Artists</p>
                    <p>FAQs</p>
                    <Row><LoginForm isMobile /></Row>
                  </div>
              }

            </Drawer>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}

Header.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  logoutRequest: PropTypes.func.isRequired,
  checkUserSession: PropTypes.func.isRequired,
};

Header.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  const { error, isFetching } = state.auth.logout;
  const { profile } = state.user;
  return { error, isFetching, profile };
};

// export default connect(mapStateToProps, { checkUserSession, logoutRequest })(Header);
export default connect(mapStateToProps, { logoutRequest })(Header);
