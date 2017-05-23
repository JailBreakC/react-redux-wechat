import React, { Component } from 'react'
import './Header.less'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="avatar">
            <img className="img" src="http://static.insta360.com/assets/operation/0054/058394960c1cbeae74475c3fba8ac3d7/doge.png" onClick="" alt="" />
        </div>
        <div className="info">
            <h3 className="nickname">
                <span className="display_name ng-binding">Bieber陈加贝</span>
                <a className="opt" onClick=""><i className="web_wechat_add"></i></a>
            </h3>
        </div>
      </div>
    )
  }
}

export default Header
