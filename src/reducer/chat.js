import {
  SET_ROOM_LIST,
  SET_ACTIIVE_LIST
} from '../actions'

const initialState = {
  roomList: {},
  activeList: {}
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
    default:
      return state
  }
}