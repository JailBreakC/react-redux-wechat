import React, { Component } from 'react'
import { Tabs } from 'antd'
import Header from '../components/Header'
import Search from '../components/Search'
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
        <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
          <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Panel
