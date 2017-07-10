import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types'
import './Header.less'

class Header extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired
  }
  handleLogOut = () => {
    const { history, actions } = this.props
    actions.userLogout()
  }
  render() {
    const { info, actions } = this.props
    return (
      <div className="header">
        <div className="avatar">
            <img className="img" src={info.avatar} onClick="" alt="" />
        </div>
        <div className="info">
            <h3 className="nickname">
                <span className="display_name ng-binding">{info.nickname}</span>
                <a className="opt" onClick={this.handleLogOut}><i className="iconfont icon-guanji2"></i></a>
            </h3>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
