import React, { Component } from 'react';
import Panel from './Panel'
import ChatContent from './ChatContent'
import Copyleft from '../components/Copyleft'
import './App.less';

class App extends Component {
  static propTypes = {
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

export default App;
