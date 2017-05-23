import React, { Component } from 'react'
import './Search.less'

class Search extends Component {
  render() {
    return (
      <div className="search_bar" id="search_bar">
        <i className="web_wechat_search"></i>
        <input className="frm_search" type="text" onInput="" placeholder="搜索" />
      </div>
    )
  }
}

export default Search
