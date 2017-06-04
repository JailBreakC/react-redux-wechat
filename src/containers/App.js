import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { reduxConnect } from '../helpers'
import Panel from './Panel'
import ChatContent from './ChatContent'
import Copyleft from '../components/Copyleft'
import Promise from 'promise'
import './App.less';

class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  }

  initApp = () => {
    const { getActiveList, getInitUserInfo, getHistory } = this.props.actions
    Promise.all([getActiveList(), getInitUserInfo()])
      .then(() => {
        getHistory()
      })
  }

  componentDidMount() {
    this.initApp()
  }

  render() {
    return (
      <div className="app">
        <div className="app-inner">
          <Panel />
          <ChatContent />
        </div>
        <Copyleft />
      </div>
    );
  }
}

export default reduxConnect(App);
