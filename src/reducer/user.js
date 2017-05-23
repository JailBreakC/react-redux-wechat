import storage from 'storejs'
import {
  USER_SELECT_FORM,
  USER_LOGIN_SUCCEED,
  USER_SIGNUP_SUCCEED,
} from '../constants/ActionTypes'

const initialState = {
  select_form: 'login',
  token: storage('chatToken')
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
    default:
      return state
  }
}