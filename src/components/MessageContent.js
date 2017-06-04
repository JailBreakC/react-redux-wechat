import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types'
import MessageItem from './MessageItem'
import './MessageContent.less';

class MessageContent extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
  }
  render() {
    const { user, chat } = this.props
    let messages = user.info.isPrivate 
                   ? chat.privateMessages[user.info.curRoom]
                   : chat.roomMessages[user.info.curRoom]
    messages = messages ? messages : []
    return (
      <div className="message-content">
        <Scrollbars>
          <div className="top-placeholder" style={{'height': '0px'}}></div>
          {
            messages.map(function(message) {
              return <MessageItem key={message.timestamp} message={message} userInfo={user.info} />
            })
          }
          <div className="bottom-placeholder" style={{'height': '0px'}}></div>
        </Scrollbars>
      </div>
    )
  }
}

export default MessageContent;

