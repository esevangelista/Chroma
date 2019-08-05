import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, notification, Badge, Button } from 'antd';
import { CometChat } from '@cometchat-pro/chat';
import { Link } from 'react-router-dom';
import { fetchUnreadCountRequest } from '../../ducks/chat';
import './chat.css';

const openNotification = (info) => {
  notification.open({
    message: `${info.sender.name}`,
    description: info.type === 'text' ? `${info.data.text}` : 'Sent an attachment',
    icon: <Icon type="message" />,
  });
};


class Chat extends Component {
  componentDidMount() {
    this.props.fetchUnreadCountRequest();
  }

  render() {
    const listenerID = 'UNIQUE_LISTENER_ID';
    const { unread } = this.props.chat;
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage) => {
          openNotification(textMessage);
          this.props.fetchUnreadCountRequest();
        },
        onMediaMessageReceived: (mediaMessage) => {
          openNotification(mediaMessage);
          this.props.fetchUnreadCountRequest();
        },
        onMessageRead: () => this.props.fetchUnreadCountRequest(),
      }),
    );
    return (
      <div className="cart-container">
        <Link to="/messages">
          <Button id="btn-drawer">
            <Badge count={unread || 0} overflowCount={20} >
              <Icon type="message" />
            </Badge>
          </Button>
        </Link>
      </div>
    );
  }
}

Chat.propTypes = {
  fetchUnreadCountRequest: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    unread: PropTypes.number,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    message: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { profile } = state.user;
  const { chat } = state;
  return { profile, chat };
};

const mapDispatchToProps = {
  fetchUnreadCountRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
