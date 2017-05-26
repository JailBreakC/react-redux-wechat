import storage from 'storejs'
import {
  USER_SELECT_FORM,
  USER_LOGIN_SUCCEED,
  USER_SIGNUP_SUCCEED,
  USER_GET_INFO_SUCCEED
} from '../actions'

const initialState = {
  select_form: 'login',
  token: storage('chatToken'),
  info: {},
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
      console.log('action')
      console.log(action)
      return {
        ...state,
        token: action.token.jwt
      }

    case USER_GET_INFO_SUCCEED:
      return {
        ...state,
        info: action.user
      }

    default:
      return state
  }
}