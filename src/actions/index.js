import io from 'socket.io-client'
import store from 'storejs'
import * as types from '../constants/ActionTypes'
import API from '../config/api'

export const socket = io(API, {'force new connection': true})

export const userSelectForm = form => ({type: types.USER_SELECT_FORM, form})

const userLoginSucceed = token => {
  store('chatToken', token.jwt)
  return {
    type: types.USER_LOGIN_SUCCEED, 
    token
  }
}

const userSignupSucceed = token => {
  store('chatToken', token.jwt)
  return {
    type: types.USER_SIGNUP_SUCCEED, 
    token
  }
}

export const userLogin = user => dispatch => {
  console.log(user)
  return new Promise((resolve,reject) => {
    console.log('login')
    socket.emit('login', user, (info) => {
    console.log('login info')
      console.log(info)
      dispatch(userLoginSucceed(info))
      resolve(info)
    })
  })
}

export const userSignup = user => dispatch => {
  console.log(user)
  return new Promise((resolve,reject) => {
    socket.emit('signUp', user, (info) => {
      console.log(info)
      dispatch(userSignupSucceed(info))
      resolve(info)
    })
  })
}
