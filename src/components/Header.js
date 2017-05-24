import React, { Component } from 'react'
import './Header.less'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="avatar">
            <img className="img" src="https://static.insta360.com/assets/operation/0054/c9916bbe2ef5ee76d22b2ae990e498d3/WechatIMG1.jpeg" onClick="" alt="" />
        </div>
        <div className="info">
            <h3 className="nickname">
                <span className="display_name ng-binding">Bieber陈加贝</span>
                <a className="opt" onClick=""><i className="iconfont icon-guanji2"></i></a>
            </h3>
        </div>
      </div>
    )
  }
}

export default Header
