import io from 'socket.io-client'
import history from '../history'
import store from 'storejs'
import API from '../config/api'
import browser from '../helpers/browser'

export const socket = io(API, { 'force new connection': true })

export const USER_SELECT_FORM = 'USER_SELECT_FORM'
export const USER_LOGIN_SUCCEED = 'USER_LOGIN_SUCCEED'
export const USER_SIGNUP_SUCCEED = 'USER_SIGNUP_SUCCEED'
export const USER_GET_INFO = 'USER_GET_INFO'
export const USER_GET_INFO_SUCCEED = 'USER_GET_INFO_SUCCEED'

const getToken = function() {
  return store('chatToken')
}

export const userSelectForm = form => ({ type: USER_SELECT_FORM, form })


const userLoginSucceed = token => {
  store('chatToken', token.jwt)
  return {
    type: USER_LOGIN_SUCCEED,
    token
  }
}

const userSignupSucceed = token => {
  store('chatToken', token.jwt)
  return {
    type: USER_SIGNUP_SUCCEED,
    token
  }
}

export const userLogin = user => dispatch => {
  console.log(user)
  return new Promise((resolve, reject) => {
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
  return new Promise((resolve, reject) => {
    socket.emit('signUp', user, (info) => {
      console.log(info)
      dispatch(userSignupSucceed(info))
      resolve(info)
    })
  })
}

export const getInitUserInfo = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const token = getToken()
      const device = browser.versions.mobile ? 'mobile' : 'PC';
      socket.emit('getInfo', {
        token,
        device
      }, (body) => {
        console.log(body)
        if (body.isError) {
          alert('用户已经在线');
          history.push('/login');
        } else {
          body.token = token;
          dispatch({
            type: USER_GET_INFO_SUCCEED,
            user: body
          });
          resolve(body);
        }
      })
    })
  }
}

export const SET_ROOM_LIST = 'SET_ROOM_LIST'
export const SET_ACTIIVE_LIST = 'SET_ACTIIVE_LIST'

const setRoomList = data => ({ type: SET_ROOM_LIST, data })

export const getRoomList = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      socket.emit('getRoomList', getToken(), (body) => {
        if (body.isError) {
          reject(body);
        } else {
          dispatch(setRoomList(body))
          resolve(body);
        }
      })
    })
  }
}

const setActiveList = data => ({ type: SET_ACTIIVE_LIST, data })

export const getActiveList = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      socket.emit('getActiveList', getToken(), (body) => {
        if (body.isError) {
          reject(body);
        } else {
          dispatch(setActiveList(body))
          resolve(body);
        }
      })
    })
  }
}