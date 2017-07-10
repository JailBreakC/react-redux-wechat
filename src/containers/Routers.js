import React from 'react'
import App from './App'
import Login from './Login'
import store from '../store'
import { reduxConnect } from '../helpers'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    store.getState().user.token ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )}/>
)

const Routers = () => {
  return  (
    <Router>
      <div className="wrap">
        <PrivateRoute exact path="/" component={App}/>
        <Route exact path="/login" component={Login}/>
      </div>
    </Router>
  )
}

export default reduxConnect(Routers);
