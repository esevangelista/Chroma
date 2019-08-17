import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Drawer, Button, Badge } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../global/logo';
import './header.css';
import LoginForm from '../login/';
import { logoutRequest } from '../../ducks/auth';
import Cart from '../cart/';
import Chat from '../chat/';
import Notifications from '../notifications/';

const { SubMenu } = Menu;

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

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  logout = async () => {
    this.props.logoutRequest();
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { unread } = this.props;
    const { profile, isGettingSession } = this.props.user;
    return (
      <Layout.Header className="site-header">
        <Menu mode="horizontal" >
          <Menu.Item key="logo" className="logo-container">
            <Link to="/">
              <Logo />
            </Link>
          </Menu.Item>
          <Menu.Item key="2" className="show-on-desktop discover">
            <Link to='/artists'> Artists </Link>
          </Menu.Item>
          <Menu.Item key="3" className="show-on-desktop discover">
            <Link to='/artworks'> Artworks </Link>
          </Menu.Item>
          {
            profile && profile.isArtist ?
              <SubMenu className="show-on-desktop submenu-store" key="3.5.0" title="Store">
                <Menu.ItemGroup key="group">
                  <Menu.Item key="3.5.1"><Link to="/my-store"> Overview </Link></Menu.Item>
                  <Menu.Item key="3.5.2"><Link to="/my-store/transactions"> Transactions </Link></Menu.Item>
                  <Menu.Item key="3.5.3"><Link to="/my-store/products"> My Artworks </Link></Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            : ''
          }
          <Menu.Item key="5" className="icons">
            {
              !isGettingSession && profile && profile._id ?
                <Cart />
              : <LoginForm isCartIcon />
            }
          </Menu.Item>
          {
            !isGettingSession && profile && profile._id ?
              <Menu.Item key="notif" className="icons"><Notifications /></Menu.Item>
              : <Menu.Item className="show-on-desktop"><LoginForm isBellIcon /></Menu.Item>
          }
          <Menu.Item key="msg" className="show-on-desktop">
            {
              !isGettingSession && profile && profile._id ?
                <Chat />
              : <LoginForm isMsgIcon />
            }
          </Menu.Item>

          { !isGettingSession && profile && profile._id ?
            <SubMenu className="show-on-desktop submenu-user" key="6" title={<Icon type="user" />}>
              <Menu.ItemGroup key="user-group">
                <Menu.Item key="6.1"><Link to="/account/profile"> Profile </Link></Menu.Item>
                <Menu.Item key="6.2"><Link to="/wishlist"> Wishlist </Link></Menu.Item>
                <Menu.Item key="6.3"><Link to="/orders"> My Orders </Link></Menu.Item>
                <Menu.Item key="6.4"><Link to="/account/settings"> Settings </Link></Menu.Item>
                <Menu.Item key="6.5"><a onClick={this.logout}> Logout </a></Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            :
            <Menu.Item className="show-on-desktop"><LoginForm /></Menu.Item>
          }
          <Menu.Item key="7" className="hide-on-desktop icons">
            <Badge dot={!!unread}>
              <Button id="btn-drawer" onClick={this.showDrawer} >
                <Icon type="menu-unfold" />
              </Button>
            </Badge>
            <Drawer
              placement="left"
              onClose={this.onClose}
              visible={this.state.visible}
            >
              {
                profile ?
                  <Menu defaultSelectedKeys={[]} className="mobile-menu" mode="inline">
                    <Menu.Item key="Home"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="art"><Link to="/artworks">Artworks</Link></Menu.Item>
                    <Menu.Item key="artist"><Link to="/artists">Artists</Link></Menu.Item>
                    <Menu.Item key="mobile-profile"><Link to="/account/profile">Profile</Link></Menu.Item>
                    <Menu.Item key="wishlist"><Link to="/wishlist">Wishlist</Link></Menu.Item>
                    <Menu.Item key="order"><Link to="/orders">My Orders</Link></Menu.Item>
                    <Menu.Item key="setting"><Link to="/account/settings">My Account</Link></Menu.Item>
                    <Menu.Item key="inbox"><Badge count={unread || 0} offset={[8,0]}><Link to="/messages">Messages</Link></Badge></Menu.Item>
                    {
                      profile && profile.isArtist ?
                        <SubMenu title="My Store" key="sub-store">
                          <Menu.ItemGroup key="store-group">
                            <Menu.Item key="over"><Link to="/my-store"> Overview </Link></Menu.Item>
                            <Menu.Item key="trans"><Link to="/my-store/transactions"> Transactions </Link></Menu.Item>
                            <Menu.Item key="products"><Link to="/my-store/products"> My Artworks </Link></Menu.Item>
                          </Menu.ItemGroup>
                        </SubMenu>
                      : ''
                    }
                    <Menu.Item key="faq"><Link to="/"> FAQs </Link></Menu.Item>
                    <Menu.Item key="logoutt"><a onClick={this.logout}> Logout </a></Menu.Item>
                  </Menu>
                :
                  <Menu defaultSelectedKeys={[]} className="mobile-menu" mode="inline">
                    <Menu.Item key="artt"><Link to="/artworks">Artworks</Link></Menu.Item>
                    <Menu.Item key="artists"><Link to="/artists">Artists</Link></Menu.Item>
                    <Menu.Item key="loginn"><LoginForm isMobile /></Menu.Item>
                  </Menu>
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
};

Header.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  const { error, isFetching } = state.auth.logout;
  const { user } = state;
  const { unread } = state.chat;
  return { error, isFetching, user, unread };
};

export default connect(mapStateToProps, { logoutRequest })(Header);
