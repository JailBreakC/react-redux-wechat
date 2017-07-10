import io from 'socket.io-client'
import Promise from 'promise'
import store from 'storejs'
import API from '../config/api'
import browser from '../helpers/browser'

export const socket = io(API, { 'force new connection': true })

export const USER_SELECT_FORM = 'USER_SELECT_FORM'
export const USER_LOGIN_SUCCEED = 'USER_LOGIN_SUCCEED'
export const USER_SIGNUP_SUCCEED = 'USER_SIGNUP_SUCCEED'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_GET_INFO = 'USER_GET_INFO'
export const USER_GET_INFO_SUCCEED = 'USER_GET_INFO_SUCCEED'

const getToken = function() {
  return store('chatToken')
}

const removeToken = function() {
  return store.remove('chatToken')
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
  return new Promise((resolve, reject) => {
    socket.emit('login', user, (info) => {
      dispatch(userLoginSucceed(info))
      resolve(info)
    })
  })
}

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  }
}

export const userSignup = user => dispatch => {
  return new Promise((resolve, reject) => {
    socket.emit('signUp', user, (info) => {
      dispatch(userSignupSucceed(info))
      resolve(info)
    })
  })
}

export const getInitUserInfo = () => (dispatch, getState) => {
  return new Promise((resolve) => {
    const token = getToken()
    const device = browser.versions.mobile ? 'mobile' : 'PC'
    socket.emit('getInfo', {
      token,
      device
    }, (body) => {
      if (body.isError) {
        alert('用户已经在线')
        dispatch(userLogout())
      } else {
        body.token = token
        dispatch({
          type: USER_GET_INFO_SUCCEED,
          user: body
        })
        resolve(body)
      }
    })
  })
}

export const SET_ROOM_LIST = 'SET_ROOM_LIST'
export const SET_ACTIIVE_LIST = 'SET_ACTIIVE_LIST'
export const UPDATE_PRIVATE_HISTORIES = 'UPDATE_PRIVATE_HISTORIES'
export const UPDATE_ROOM_HISTORIES = 'UPDATE_ROOM_HISTORIES'

const LOAD_MESSAGE_LIMIT = 15

const setRoomList = data => ({ type: SET_ROOM_LIST, data })

export const getRoomList = () => dispatch => {
  return new Promise((resolve, reject) => {
    socket.emit('getRoomList', getToken(), (body) => {
      if (body.isError) {
        reject(body)
      } else {
        dispatch(setRoomList(body))
        resolve(body)
      }
    })
  })
}

const setActiveList = data => ({ type: SET_ACTIIVE_LIST, data })

export const getActiveList = () => dispatch => {
  return new Promise((resolve, reject) => {
    socket.emit('getActiveList', getToken(), (body) => {
      if (body.isError) {
        reject(body)
      } else {
        dispatch(setActiveList(body))
        resolve(body)
      }
    })
  })
}

const updatePrivateHistory = (fromUser, histories) => ({ 
  type: UPDATE_PRIVATE_HISTORIES,
  histories,
  fromUser
})

export const getPrivateHistory = info => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    if (!info) {
      const state = getState()
      const { user, chat } = state
      const fromUser = user.info.curRoom
      const toUser = user.info.nickname
      const messages = chat.privateMessages[fromUser] ? chat.privateMessages[fromUser] : []
      info = {
        fromUser: fromUser,
        toUser: toUser,
        timestamp: messages.length > 0 ? messages[0].timestamp : Date.now(),
        limit: LOAD_MESSAGE_LIMIT
      }
    }
    console.log(info)
    socket.emit('getPrivateHistory', info, (body) => {
      if (body.isError) {
        reject(body)
        alert(body.errMsg)
        console.error(body)
      } else {
        const histories = body.histories || []
        const isloadAll = histories.length < LOAD_MESSAGE_LIMIT
        console.log(histories)
        dispatch(updatePrivateHistory(info.fromUser, histories))
        resolve(isloadAll)
      }
    })
  })
}

const addHistoryMessage = (roomName, histories) => ({
  type: UPDATE_ROOM_HISTORIES,
  roomName,
  histories
})

export const getRoomHistory = info => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    if (!info) {
      const state = getState()
      const { user, chat } = state
      let roomName = user.info.curRoom
      let messages = chat.roomMessages[roomName] ? chat.roomMessages[roomName] : []
      info = {
        roomName: roomName,
        timestamp: messages.length > 0 ? messages[0].timestamp : Date.now(),
        limit: LOAD_MESSAGE_LIMIT
      }
    }
    socket.emit('getRoomHistory', info, (body) => {
      if (body.isError) {
        alert('error')
        console.error(body)
        reject(body)
      } else {
        let histories = body.histories || []
        let isloadAll = histories.length < LOAD_MESSAGE_LIMIT
        dispatch(addHistoryMessage(info.roomName, histories))
        resolve(isloadAll)
      }
    })
  })
}

export const getHistory = () => (dispatch, getState) => {
  const state = getState()
  state.user.info.isPrivate ? dispatch(getPrivateHistory()) : dispatch(getRoomHistory())
}

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const SWITCH_CHAT_ROOM = 'SWITCH_CHAT_ROOM'

export const updateUserInfo = info => ({type: UPDATE_USER_INFO, info})

export const switchChatRoom = roomInfo => (dispatch, getState) => {
  const state = getState()
  const { user, chat } = state
  const curRoom = roomInfo.curRoom
  console.log(roomInfo)
  let info = {}
  if(roomInfo.isPrivate) {
    const messages = chat.privateMessages[curRoom] ? chat.privateMessages[curRoom] : []
    info = {
      fromUser: curRoom,
      toUser: user.info.nickname,
      timestamp: messages.length > 0 ? messages[0].timestamp : Date.now(),
      limit: LOAD_MESSAGE_LIMIT
    }
    dispatch(getPrivateHistory(info))
  } else {
    let messages = chat.roomMessages[curRoom] ? chat.roomMessages[curRoom] : []
    info = {
      roomName: curRoom,
      timestamp: messages.length > 0 ? messages[0].timestamp : Date.now(),
      limit: LOAD_MESSAGE_LIMIT
    }
    dispatch(getRoomHistory(info))
  }
  dispatch(updateUserInfo(roomInfo))
}
