import storage from 'storejs'
import {
  USER_SELECT_FORM,
  USER_LOGIN_SUCCEED,
  USER_SIGNUP_SUCCEED,
  USER_LOGOUT,
  USER_GET_INFO_SUCCEED,
  UPDATE_USER_INFO
} from '../actions'

const initialState = {
  select_form: 'login',
  token: storage('chatToken'),
  info: {},
}

const removeToken = function() {
  return storage.remove('chatToken')
}

export default function user (state = initialState, action) {
  switch(action.type) {
    case USER_SELECT_FORM:
      return {
        ...state,
        select_form: action.form
      }

    case USER_LOGIN_SUCCEED:
    case USER_SIGNUP_SUCCEED:
      return {
        ...state,
        token: action.token.jwt
      }

    case USER_GET_INFO_SUCCEED:
      return {
        ...state,
        info: action.user
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          ...action.info
        }
      }
    case USER_LOGOUT:
      removeToken()
      return {
        ...state,
        token: '',
        info: {}
      }
    default:
      return state
  }
}