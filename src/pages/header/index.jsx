import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Drawer, Button, Row } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../global/logo';
import './header.css';
import LoginForm from '../login/';
import { logoutRequest } from '../../ducks/auth';
import Cart from '../cart/';

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

  logout = () => {
    this.props.logoutRequest();
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { profile, isGettingSession } = this.props.user;
    const userNav = (
      <Menu>
        <Menu.Item><a href="/account/profile"> Profile </a></Menu.Item>
        <Menu.Item><a onClick={this.logout}> Logout </a></Menu.Item>
      </Menu>
    );
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
                  <Menu.Item key="3.5.2"><Link to="/my-store"> Transactions </Link></Menu.Item>
                  <Menu.Item key="3.5.3"><Link to="/my-store/products"> My Artworks </Link></Menu.Item>
                  <Menu.Item key="3.5.4"><Link to="/my-store"> Feedback </Link></Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            : ''
          }
          <Menu.Item key="5">
            {
              !isGettingSession && profile && profile._id ?
                <Cart />
              : <LoginForm isCartIcon />
            }
          </Menu.Item>
          { !isGettingSession && profile && profile._id ?
            <SubMenu className="show-on-desktop submenu-user" key="6" title={<Icon type="user" />}>
              <Menu.ItemGroup key="user-group">
                <Menu.Item key="6.1"><Link to="/account/profile"> Profile </Link></Menu.Item>
                <Menu.Item key="6.2"><Link to="/wishlist"> Wishlist </Link></Menu.Item>
                <Menu.Item key="6.3"><Link to="/account/settings"> Settings </Link></Menu.Item>
                <Menu.Item key="6.4"><a onClick={this.logout}> Logout </a></Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            :
            <LoginForm />
          }
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
                  <Menu defaultSelectedKeys={[]} className="mobile-menu" mode="inline">
                    <Menu.Item key="Home"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="art"><Link to="/artworks">Artworks</Link></Menu.Item>
                    <Menu.Item key="artist"><Link to="/artists">Artists</Link></Menu.Item>
                    <Menu.Item key="mobile-profile"><Link to="/account/profile">Profile</Link></Menu.Item>
                    <Menu.Item key="wishlist"><Link to="/wishlist">Wishlist</Link></Menu.Item>
                    <Menu.Item key="order"><Link to="/">Orders</Link></Menu.Item>
                    <Menu.Item key="inbox"><Link to="/">Inbox</Link></Menu.Item>
                    {
                      profile && profile.isArtist ?
                        <SubMenu title="My Store" key="sub-store">
                          <Menu.ItemGroup key="store-group">
                            <Menu.Item key="over"><Link to="/my-store"> Overview </Link></Menu.Item>
                            <Menu.Item key="trans"><Link to="/my-store"> Transactions </Link></Menu.Item>
                            <Menu.Item key="products"><Link to="/my-store/products"> My Artworks </Link></Menu.Item>
                            <Menu.Item key="feed"><Link to="/my-store"> Feedback </Link></Menu.Item>
                          </Menu.ItemGroup>
                        </SubMenu>
                      : ''
                    }
                    <Menu.Item key="faq"><Link to="/"> FAQs </Link></Menu.Item>
                    <Menu.Item key="logoutt"><a onClick={this.logout}> Logout </a></Menu.Item>
                  </Menu>
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
};

Header.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  const { error, isFetching } = state.auth.logout;
  const { user } = state;
  return { error, isFetching, user };
};

export default connect(mapStateToProps, { logoutRequest })(Header);
