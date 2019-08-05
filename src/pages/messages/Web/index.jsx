import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { CometChat } from '@cometchat-pro/chat';
import { Icon, Upload, message, Result, Row, Col, Tooltip, Avatar, Skeleton, PageHeader, Typography, Badge, Empty, Input } from 'antd';
import { fetchConvoRequest } from '../../../ducks/chat';
import './web.css';

const { Text } = Typography;

class Web extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      media: null,
      loading: false,
    };
    this.handleMsgChange = this.handleMsgChange.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.sendMsgMobile = this.sendMsgMobile.bind(this);
    this.sendMedia = this.sendMedia.bind(this);
    this.read = this.read.bind(this);
  }
  componentDidMount() {
    const { uid } = this.props.match.params;
    const { convo, convoWith } = this.props.chat;
    if (uid) this.props.fetchConvoRequest({}, {}, uid);
    const c = document.getElementsByClassName('loader');
    if (c.length >= 1) {
      c[c.length - 1].scrollIntoView();
    }
    this.read();
  }

  componentDidUpdate() {
    const c = document.getElementsByClassName('loader');
    if (c.length >= 1) {
      c[c.length - 1].scrollIntoView();
    }
  }

  async read() {
    const { uid } = this.props.match.params;
    const messagesRequest = await new CometChat.MessagesRequestBuilder().setLimit(15).setUID(uid).setUnread(true).build();
    try {
      const m = await messagesRequest.fetchPrevious();
      if (m.length >= 1) await Promise.all(m.map(n => CometChat.markMessageAsRead(n)));
    } catch (err) {
      console.log(err);
    }
  }

  handleMsgChange = e => this.setState({ msg: e.target.value });
  async sendMsg(e) {
    const { uid } = this.props.match.params;
    const { msg } = this.state;
    const { convo, convoWith } = this.props.chat;
    const messageType = CometChat.MESSAGE_TYPE.TEXT;
    const receiverType = CometChat.RECEIVER_TYPE.USER;
    if (e.keyCode === 13 && !e.shiftKey && /\S/.test(e.target.value)) {
      e.preventDefault();
      const m = msg;
      this.setState({ msg: '' });
      this.setState({ loading: true });
      try {
        const textMessage = new CometChat.TextMessage(uid, m, messageType, receiverType);
        await CometChat.sendMessage(textMessage);
        await this.props.fetchConvoRequest(convo, convoWith, uid);
      } catch (error) {
        message.error(error.message);
      }
      this.setState({ loading: false });
    }
  }
  async sendMsgMobile() {
    const { uid } = this.props.match.params;
    const { msg } = this.state;
    const { convo, convoWith } = this.props.chat;
    const messageType = CometChat.MESSAGE_TYPE.TEXT;
    const receiverType = CometChat.RECEIVER_TYPE.USER;
    if (/\S/.test(msg)) {
      const m = msg;
      this.setState({ msg: '' });
      this.setState({ loading: true });
      try {
        const textMessage = new CometChat.TextMessage(uid, m, messageType, receiverType);
        await CometChat.sendMessage(textMessage);
        await this.props.fetchConvoRequest(convo, convoWith, uid);
      } catch (error) {
        message.error(error.message);
      }
      this.setState({ loading: false });
    }
  }
  async sendMedia() {
    const { uid } = this.props.match.params;
    const { media } = this.state;
    const { convo, convoWith } = this.props.chat;
    const messageType = CometChat.MESSAGE_TYPE.FILE;
    const receiverType = CometChat.RECEIVER_TYPE.USER;
    if (media) {
      this.setState({ loading: true });
      try {
        const mediaMessage = new CometChat.MediaMessage(uid, media, messageType, receiverType);
        this.setState({ media: null });
        await CometChat.sendMediaMessage(mediaMessage);
        await this.props.fetchConvoRequest(convo, convoWith, uid);
      } catch (err) {
        message.error(err.message);
      }
      this.setState({ loading: false });
    }
  }

  render() {
    const { uid } = this.props.match.params;
    const { convo, isFetchingConvo, error, convoWith } = this.props.chat;
    const uploadProps = {
      showFileList: false,
      accept: '.png, .jpeg, .jpg',
      fileList: [],
      beforeUpload: (file) => {
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isImg) {
          message.error('You can only upload JPG, PNG, JPEG files!');
        } else {
          this.setState({ media: file });
        }
        return false;
      },
    };
    const listenerID = 'UNIQUE_LISTENER_ID_1';
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: () => this.props.fetchConvoRequest(convo, convoWith, uid),
        onMediaMessageReceived: () => this.props.fetchConvoRequest(convo, convoWith, uid),
        onMessageRead: () => this.props.fetchConvoRequest(convo, convoWith, uid),
      }),
    );
    const { _id } = this.props.profile;
    return (
      <div className="web-convo">
        {
          isFetchingConvo && Object.keys(convo).length === 0 ?
            <Skeleton avatar paragraph={{ rows: 1 }} />
          : convoWith && convoWith.uid ?
            <div className="convo-container">
              <PageHeader
                className="convo-header"
                title={
                  <div className="header-content">
                    <Badge status={convoWith.status === 'offline' ? 'default' : 'success'} >
                      {
                        convoWith.avatar ?
                          <Avatar src={convoWith.avatar} />
                        : <Avatar> {convoWith.name.charAt(0).toUpperCase()} </Avatar>
                      }
                    </Badge>
                    <Text> {convoWith.name}</Text>
                  </div>
                }
              />
              <div className="convo-content">
                {
                  Object.keys(convo).length >= 1 ?
                    <div className="has-messages">
                      {
                        Object.keys(convo).map(co => (
                          <div className="grp-msgs" key={co}>
                            <Text key={co} type="secondary" id="time-label">
                              {moment(moment.unix((convo[co])[0].sentAt)).calendar(null, {
                                sameDay: '[Today at] LT',
                                lastDay: '[Yesterday at] LT',
                                lastWeek: '[Last] dddd [at] LT',
                                sameElse: 'DD/MM/YYYY',
                              })}<br />
                            </Text>
                            {
                              (convo[co]).map(c => (
                              c.sender === _id ?
                                <div key={c.id} className={c.readAt ? 'msg-me seen' : 'msg-me'}>
                                  <div>
                                    <Tooltip placement="left" title={moment(moment(c.sentAt).unix()).format('h:mm A')}>
                                      {
                                        c.type === 'text' ?
                                          c.data.text.split('\n').map(p => p !== '\n' ? <Text id="msg"> {p} <br /></Text> : '')
                                        : c.type === 'file' ?
                                          <a href={c.data.url} target="_blank" rel="noopener noreferrer" ><img style={{ width: '100%' }} src={c.data.url} alt="Image cannot be displayed" /></a>
                                        : ''
                                      }
                                    </Tooltip>
                                  </div>
                                </div>
                              :
                                <div key={c._id} id="slc" className="for-me">
                                  <div>
                                    <Tooltip placement="right" title={moment(moment(c.sentAt).unix()).format('h:mm A')}>
                                      {
                                        c.type === 'text' ?
                                          c.data.text.split('\n').map(p => p !== '\n' ? <Text id="msg"> {p} <br /></Text> : '')
                                        : c.type === 'file' ?
                                          <a href={c.data.url} target="_blank" rel="noopener noreferrer" ><img style={{ width: '100%' }} src={c.data.url} alt="Image cannot be displayed" /></a>
                                        : ''
                                      }
                                    </Tooltip>
                                  </div>
                                </div>
                            ))}
                            <div id="slc" className="loader">
                              {
                                this.state.loading ?
                                  <div>
                                    <Icon type="loading" />
                                  </div>
                                : ''
                              }
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  : <div className="no-msg" />
                }
              </div>
              <div className="convo-action">
                <Row type="flex" align="middle" justify="center">
                  <Col xs={3} className="upl">
                    <Upload {...uploadProps} >
                      <Icon type="picture" />
                    </Upload>
                  </Col>
                  {
                    this.state.media ?
                      <Col xs={18} className="file-upload">
                        <Icon type="paper-clip" id="ppclip" />
                        <Text>{this.state.media.name}</Text>
                        <Icon type="delete" id="trash" onClick={() => this.setState({ media: null })} />
                      </Col>
                    :
                      <Col xs={18}>
                        <Input.TextArea
                          placeholder="Type a message..."
                          autosize={{ minRows: 1, maxRows: 4 }}
                          id="txtarea-mobile"
                          onChange={this.handleMsgChange}
                          value={this.state.msg}
                          size="large"
                        />
                        <Input.TextArea
                          placeholder="Type a message..."
                          autosize={{ minRows: 1, maxRows: 5 }}
                          id="txtarea"
                          onChange={this.handleMsgChange}
                          value={this.state.msg}
                          onPressEnter={this.sendMsg}
                        />
                      </Col>
                    }
                  <Col xs={3} className="send-btn">
                    {!this.state.media ?
                      <Icon type="double-right" id="send" onClick={this.sendMsgMobile} />
                    : <Icon type="double-right" id="send" onClick={this.sendMedia} />}
                  </Col>
                </Row>
              </div>
            </div>
          : error ?
            <Result
              status="500"
              title="500"
              subTitle="Sorry, something went wrong."
            />
          : ''
        }
      </div>
    );
  }
}


Web.propTypes = {
  fetchConvoRequest: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    // messages: PropTypes.arrayOf(PropTypes.shape({
    //   id: PropTypes.string,
    // })).isRequired,
    isFetchingConvo: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    message: PropTypes.string,
    convoWith: PropTypes.shape({
      uid: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: {
      uid: PropTypes.string.isRequired,
    }.isRequired,
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
  fetchConvoRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Web);
