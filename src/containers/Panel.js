import React, { Component } from 'react'
import { Tabs } from 'antd'
import Header from '../components/Header'
import Search from '../components/Search'
import ChatList from '../components/ChatList'
import './Panel.less'
const TabPane = Tabs.TabPane

class Panel extends Component {
  onTabChange = () => {

  }

  render() {
    return (
      <div className="panel">
        <Header />
        <Search />
        <Tabs defaultActiveKey="1" onChange={this.onTabChange} size="small">
          <TabPane tab={<i className="iconfont icon-liaotian" />} key="1">
            <ChatList />
          </TabPane>
          <TabPane tab={<i className="iconfont icon-wenzhang" />} key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab={<i className="iconfont icon-lianxiren" />} key="3">Content of Tab Pane 3</TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Panel
