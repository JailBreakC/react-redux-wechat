import {
  SET_ROOM_LIST,
} from '../actions'

const initialState = {
  roomList: []
}

export default function user (state = initialState, action) {
  switch(action.type) {
    case SET_ROOM_LIST:
      return {
        ...state,
        roomList: action.data
      }
    default:
      return state
  }
}