import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Icon, Avatar, List, Typography, Row, Col, Skeleton, Empty, Result } from 'antd';
import { CometChat } from '@cometchat-pro/chat';
import { fetchMsgsRequest } from '../../../ducks/chat';
import Web from '../Web/';
import './main.css';

const { Text } = Typography;
const getName = (e, me) => {
  return me === e.sender.entity.uid ? e.receiver.entity.name : e.sender.entity.name;
};
const getUid = (e, me) => {
  return me === e.sender.entity.uid ? e.receiver.entity.uid : e.sender.entity.uid;
};


class Main extends Component {
  componentDidMount() {
    this.props.fetchMsgsRequest([]);
    window.scrollTo(0, 0);
  }
  render() {
    const listenerID = 'UNIQUE_LISTENER_ID_1';
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: () => this.props.fetchMsgsRequest(this.props.chat.messages),
        onMediaMessageReceived: () => this.props.fetchMsgsRequest(this.props.chat.messages),
        onMessageRead: () => this.props.fetchMsgsRequest(this.props.chat.messages),
      }),
    );
    const { messages, isFetchingMsgs } = this.props.chat;
    const { _id } = this.props.profile;
    return (
      <div className="messages-container">
        <Row type="flex" align="top" className="msg-row">
          <Col xs={24} lg={7} className="col-users">
            <div className="messages-header">
              <span id="label"> Messages </span>
            </div>
            <br />
            {
              isFetchingMsgs && messages.length === 0 ?
                [...Array(5).keys()].map(p => <Skeleton key={p} loading active paragraph={{ rows: 1 }} avatar />)
              : messages.length > 0 ?
                <List
                  className="msgs-list"
                  itemLayout="horizontal"
                  dataSource={messages}
                  renderItem={m => (
                    <List.Item onClick={() => this.props.history.push(`/messages/${getUid(m[m.length - 1].data.entities, _id)}`)}>
                      <List.Item.Meta
                        avatar={
                          m[m.length - 1].sender === _id && m[m.length - 1].data.entities.receiver.entity.avatar ?
                            <Avatar src={m[m.length - 1].data.entities.receiver.entity.avatar} />
                          : m[m.length - 1].sender !== _id && !m[m.length - 1].data.entities.sender.entity.avatar ?
                            <Avatar src={m[m.length - 1].data.entities.sender.entity.avatar} />
                          : <Avatar> {getName(m[m.length - 1].data.entities, _id).charAt(0).toUpperCase()} </Avatar>
                        }
                        title={<Text> {getName(m[m.length - 1].data.entities, _id)}</Text>}
                        description={m[m.length - 1].sender === _id ? <Text type="secondary"> You: {m[m.length - 1].type === 'file' ? 'sent a file' : m[m.length - 1].data.text}</Text> : <Text strong={m[m.length - 1].readAt ? false : true}> {m[m.length - 1].type === 'file' ? 'sent a file' :m[m.length - 1].data.text} </Text>}
                      />
                    </List.Item>
                  )}
                />
              : <Empty />
            }
          </Col>
          <Col className="web" lg={17}>
            <Switch>
              <Route exact path="/messages" component={() => <Result icon={<Icon type="message" />}title="Select a conversation on the panel to get started" />} />
              <Route path="/messages/:uid" component={Web} {...this.props} />
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

Main.propTypes = {
  fetchMsgsRequest: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    // messages: PropTypes.arrayOf(PropTypes.shape({
    //   id: PropTypes.string,
    // })).isRequired,
    isFetchingMsgs: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    message: PropTypes.string,
  }).isRequired,
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { profile } = state.user;
  const { chat } = state;
  return { profile, chat };
};

const mapDispatchToProps = {
  fetchMsgsRequest,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
