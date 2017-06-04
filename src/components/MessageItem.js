import React, { Component } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './MessageItem.less'

class MessageItem extends Component {
  static propTypes = {
    message: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      content: PropTypes.string,
      nickname: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }),
    userInfo: PropTypes.object.isRequired,
  }
  render() {
    let { message, userInfo } = this.props
    let selfMessage = message.nickname === userInfo.nickname
    message.time = moment(message.timestamp).format('HH:mm')
    return (
      <div className="message-item">
        <div className="clearfix">
          <div style={{'overflow': 'hidden'}}>
            <div className={classNames({
              message: true,
              me: selfMessage,
              you: !selfMessage,
            })}>
              <div className="message_system">
                <div className="content">{message.time}</div>
              </div>
              <img className="avatar" src={message.avatar} alt={message.nickname} />
              <div className="content">
                <div className={classNames(
                  'bubble',
                  'js_message_bubble',
                  {
                    bubble_default: !selfMessage,
                    bubble_primary: selfMessage,
                    left: !selfMessage,
                    right: selfMessage,
                  }
                )}>
                  <div className="bubble_cont">
                    <div className="plain">
                      <pre className="js_message_plain">{message.content}</pre>
                      <img className="ico_loading hide" src="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/25x4Rho.gif" alt="" />
                      <i className="ico_fail web_wechat_message_fail hide" title="重新发送"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageItem
