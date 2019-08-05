import { CometChat } from '@cometchat-pro/chat';

export default class CCManager {
  static LISTENER_KEY_MESSAGE = 'msglistener';
  static appId = '3998e1cbba3b89';
  static apiKey = 'cc5496065bfe7d67d2cf1f1f442e83853d07cdc8';

  static LISTENER_KEY_MESSAGE = 'msglistener';
  static LISTENER_KEY_USER = 'userlistener';

  static init() {
    return CometChat.init(CCManager.appId);
  }
  static getTextMessage(uid, text, msgType) {
    if (msgType === 'user') {
      return new CometChat.TextMessage(
        uid,
        text,
        CometChat.MESSAGE_TYPE.TEXT,
        CometChat.RECEIVER_TYPE.USER,
      );
    }
    return new CometChat.TextMessage(
      uid,
      text,
      CometChat.MESSAGE_TYPE.TEXT,
      CometChat.RECEIVER_TYPE.GROUP,
    );
  }
  static getMediaMessage(uid, file, msgType, mediaType) {
    if (msgType === 'user') {
      return new CometChat.MediaMessage(uid, file, mediaType, CometChat.RECEIVER_TYPE.USER);
    }
    return new CometChat.MediaMessage(uid, file, mediaType, CometChat.RECEIVER_TYPE.GROUP);
  }
  static getLoggedinUser() {
    return CometChat.getLoggedinUser();
  }
  static login(UID) {
    return CometChat.login(UID, this.apiKey);
  }

  static addMessageListener(callback) {
    CometChat.addMessageListener(
      this.LISTENER_KEY_MESSAGE,
      new CometChat.MessageListener({
        onTextMessageReceived: textMessage => callback(textMessage),
        onMediaMessageReceived: mediaMessage => callback(mediaMessage),
      }),
    );
  }
}
