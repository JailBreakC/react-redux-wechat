import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
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
    const { roomHistories, privateHistories } = this.props.activeList
    console.log(this.props.activeList)
    let lastHistory
    if(val.isPrivate) {
      console.log(privateHistories)
      const message = privateHistories[key]
      console.log(message)
      lastHistory = message[message.length - 1]
    } else {
      const message = roomHistories[key]
      lastHistory = message[message.length - 1]
    }
    lastHistory.time = moment(lastHistory.timestamp).format('HH:mm')
    console.log('lastHistory', lastHistory)

    return (
      <div className="chat-item-ct" key={key}>
        <div className="chat_item slide-left top" >
            <div className="ext">
                <p className="attr ng-binding">{ lastHistory.time }</p>
            </div>
            <div className="avatar">
                <img className="img" src={val.avatar} alt="" />
            </div>

            <div className="info">
                <h3 className="nickname">
                    <span className="nickname_text ng-binding">{val.roomName}</span>
                </h3>
                <p className="msg">
                  { lastHistory.content }
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
