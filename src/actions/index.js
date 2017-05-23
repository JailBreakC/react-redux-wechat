import io from 'socket.io-client'
import * as types from '../constants/ActionTypes'
import API from '../config/api'

console.log(API)

export const socket = io(API, {'force new connection': true})

export const userSelectForm = form => ({type: types.USER_SELECT_FORM, form})

const userLoginSucceed = user => ({type: types.USER_LOGIN_SUCCEED, user})
const userSignupSucceed = user => ({type: types.USER_SIGNUP_SUCCEED, user})

export const userLogin = user => dispatch => {
  console.log(user)
  return new Promise((resolve,reject) => {
    socket.emit('login', user, (info) => {
      console.log(info)
      userLoginSucceed(info)
      resolve(info)
    })
  })
}

export const userSignup = user => dispatch => {
  console.log(user)
  return new Promise((resolve,reject) => {
    socket.emit('signUp', user, (info) => {
      console.log(info)
      userSignupSucceed(info)
      resolve(info)
    })
  })
}
