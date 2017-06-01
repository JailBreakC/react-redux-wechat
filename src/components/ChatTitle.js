import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ChatTitle.less'

class ChatTitle extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="box_hd">
        <div className="title_wrap">
          <div className="title poi">
            <a className="title_name">{this.props.userName}</a>
            <i className="web_wechat_down_icon"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatTitle


