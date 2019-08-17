import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Spin, Icon, Button, Drawer, List, Result, Typography, Badge, Empty } from 'antd';
import { fetchNotifsRequest, readNotifsRequest } from '../../ducks/notifications';
import './notifications.css';

const { Text } = Typography;

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    this.props.fetchNotifsRequest();
  }
  toggleDrawer = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }
  render() {
    const {
      isFetching,
      error,
      message,
      notifications,
    } = this.props;
    return (
      <div className="cart-container">
        <Button id="btn-drawer" onClick={this.toggleDrawer} >
          <Badge count={notifications.filter(n => n.read === false).length}>
            <Icon type="bell" />
          </Badge>
        </Button>
        <Drawer
          className="cart-drawer"
          placement="left"
          onClose={this.toggleDrawer}
          visible={this.state.isVisible}
          afterVisibleChange={visible => visible ? this.props.readNotifsRequest() : ''}
        >
          {
            isFetching ?
              <Spin />
            : error ?
              <div className="cart-loaded">
                <p id="title"> Notifications </p>
                <div className="cart-content">
                  <Result
                    status="500"
                    title="500"
                    subTitle="Sorry, something went wrong."
                    extra={<Text type="secondary">{message}</Text>}
                  />
                </div>
              </div>
            : notifications.length > 0 ?
              <div className="cart-loaded">
                <p id="title"> Notifications </p>
                <div className="cart-content">
                  <List
                    dataSource={notifications}
                    header={null}
                    footer={null}
                    renderItem={item => (
                      <List.Item key={item._id}>
                        <Link to={item.link}>
                          <div>
                            <Text> {item.content} </Text><br />
                            <Text type="secondary">
                              {moment(new Date(item.createdAt)).calendar(null, {
                                  sameDay: '[Today at]  h:mm A',
                                  lastDay: '[Yesterday at] h:mm A',
                                  lastWeek: '[Last] dddd [at] h:mm A',
                                  sameElse: 'DD/MM/YYYY',
                              })}
                            </Text>
                          </div>
                        </Link>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            :
              <div className="cart-loaded">
                <p id="title"> Notifications </p>
                <div className="cart-content">
                  <Empty description="No notifications yet" />
                </div>
              </div>

          }
        </Drawer>
      </div>
    );
  }
}

Notifications.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  fetchNotifsRequest: PropTypes.func.isRequired,
  readNotifsRequest: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
};
const mapStateToProps = state => state.notifications;
const mapDispatchToProps = { fetchNotifsRequest, readNotifsRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

