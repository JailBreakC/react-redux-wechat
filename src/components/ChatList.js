import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars';
import './ChatList.less'

class ChatList extends Component {
  static propTypes = {
    activeList: PropTypes.object.isRequired
  }
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
  renderChatItem (val, key) {
    return (
      <div className="chat-item-ct" key={key}>
        <div className="chat_item slide-left top" >
            <div className="ext">
                <p className="attr ng-binding">11:51</p>
            </div>
            <div className="avatar">
                <img className="img" src={val.avatar} alt="" />
            </div>

            <div className="info">
                <h3 className="nickname">
                    <span className="nickname_text ng-binding">{val.roomName}</span>
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
    const { activeList } = this.props.activeList
    return (
      <div className="chat-list" ref={chatList => this.chatList = chatList}>
        <Scrollbars>
          { _.map(activeList, (val, key) => {
            return this.renderChatItem(val, key)
          })}
        </Scrollbars>
      </div>
    )
  }
}

export default ChatList
