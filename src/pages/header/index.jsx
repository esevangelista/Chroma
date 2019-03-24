import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Layout, Menu, Icon, Input, Drawer, Button } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../global/logo';
import './header.css';

const { Search } = Input;
// const menu = (
//   <Menu>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
//     </Menu.Item>
//   </Menu>
// );

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.onClose = this.onClose.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
  }
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
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
          <Menu.Item key="5" >
            <Icon type="shopping" />
          </Menu.Item>
          <Menu.Item key="6" className="show-on-desktop">
            <Icon type="user" />
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
              <p>Artworks</p>
              <p>Artists</p>
              <p>Profile</p>
              <p>Wishlist</p>
              <p>My Orders</p>
              <p>Gallery</p>
              <p>Inbox</p>
              <p>FAQs</p>
              <p>Logout</p>

            </Drawer>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}

export default Header;
