import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import './ChatList.less'

class ChatList extends Component {
  ajustListHeight = () => {
    let listHeight = document.getElementsByClassName('panel')[0].clientHeight - 153
    console.log(listHeight)
    this.chatList.style.height = listHeight + 'px'
  }
  componentDidMount() {
    this.ajustListHeight()
    window.addEventListener('resize', this.ajustListHeight)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.ajustListHeight)
  }
  renderChatItem () {
    return (
      <div className="chat-item-ct">
        <div className="chat_item slide-left top" >
            <div className="ext">
                <p className="attr ng-binding">11:51</p>
            </div>
            <div className="avatar">
                <img className="img" src="https://static.insta360.com/assets/operation/0054/c9916bbe2ef5ee76d22b2ae990e498d3/WechatIMG1.jpeg" alt="" />
            </div>

            <div className="info">
                <h3 className="nickname">
                    <span className="nickname_text ng-binding">文件传输助手</span>
                </h3>
                <p className="msg">
                  你好呀
                </p>
            </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="chat-list" ref={chatList => this.chatList = chatList}>
        <Scrollbars>
          {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map(index => {
            return this.renderChatItem()
          })}
        </Scrollbars>
      </div>
    )
  }
}

export default ChatList
