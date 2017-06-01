import React, { Component } from 'react';
import ChatTitle from '../components/ChatTitle'
import MessageContent from '../components/MessageContent'
import './ChatContent.less';

class ChatContent extends Component {
  render() {
    return (
      <div className="chat-content">
        <div className="chat-area">
          <ChatTitle userName="JailBreak" />
          <MessageContent />
        </div>
      </div>
    )
  }
}

export default ChatContent;
