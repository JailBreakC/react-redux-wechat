import {
  SET_ROOM_LIST,
  SET_ACTIIVE_LIST,
  UPDATE_PRIVATE_HISTORIES,
  UPDATE_ROOM_HISTORIES,
  USER_LOGOUT
} from '../actions'

const initialState = {
  roomList: {},
  activeList: {},
  privateMessages: {},
  roomMessages: {},
}

export default function user (state = initialState, action) {
  switch(action.type) {
    case SET_ROOM_LIST:
      return {
        ...state,
        roomList: action.data
      }
    case SET_ACTIIVE_LIST:
      return {
        ...state,
        activeList: action.data
      }
    case UPDATE_PRIVATE_HISTORIES: {
      const messages = state.privateMessages[action.fromUser] || []
      const updatedMessages = action.histories.concat(messages)
      return {
        ...state,
        privateMessages: {
          ...state.privateMessages,
          [action.fromUser]: updatedMessages
        }
      }
    }
    case UPDATE_ROOM_HISTORIES: {
      const messages = state.roomMessages[action.roomName] || []
      const updatedMessages = action.histories.concat(messages)
      return {
        ...state,
        roomMessages: {
          ...state.roomMessages,
          [action.roomName]: updatedMessages
        }
      }
    }
    case USER_LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}