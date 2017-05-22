import React from 'react'
import App from './App'
import Login from './Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
const Routers = () => (
  <Router>
    <div className="wrap">
      <Route exact path="/" component={App}/>
      <Route exact path="/login" component={Login}/>
    </div>
  </Router>
)
export default Routers
