import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars';
import './ChatList.less'

class ChatList extends Component {
  static propTypes = {
    activeList: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  ajustListHeight = () => {
    let listHeight = document.getElementsByClassName('panel')[0].clientHeight - 153
    this.chatList.style.height = listHeight + 'px'
  }

  componentDidMount() {
    this.ajustListHeight()
    window.addEventListener('resize', this.ajustListHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.ajustListHeight)
  }

  switchChatRoom = (val)=> {
    console.log(val)
    this.props.actions.switchChatRoom({
      isPrivate: val.isPrivate,
      curRoom: val.roomName
    })
  }

  renderChatItem (val, key) {
    const { curRoom } = this.props.user.info
    const { roomHistories, privateHistories } = this.props.activeList
    let lastHistory
    if(val.isPrivate) {
      const message = privateHistories[key] || []
      lastHistory = message[message.length - 1]
    } else {
      const message = roomHistories[key] || []
      lastHistory = message[message.length - 1]
    }

    if(!lastHistory) {
      return null
    }

    lastHistory.time = moment(lastHistory.timestamp).format('HH:mm')

    return (
      <div className="chat-item-ct" key={key} onClick={e => {this.switchChatRoom(val)}}>
        <div className={classNames(
          'chat_item',
          'slide-left',
          'top',
          {active: val.roomName === curRoom}
          )} >
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
