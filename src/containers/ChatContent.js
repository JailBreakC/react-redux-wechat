import React, { Component } from 'react';
import ChatTitle from '../components/ChatTitle'
import MessageContent from '../components/MessageContent'
import { reduxConnect } from '../helpers'
import './ChatContent.less';

class ChatContent extends Component {
  render() {
    return (
      <div className="chat-content">
        <div className="chat-area">
          <ChatTitle userName="JailBreak" />
          <MessageContent user={this.props.user} chat={this.props.chat}/>
        </div>
      </div>
    )
  }
}

export default reduxConnect(ChatContent)
