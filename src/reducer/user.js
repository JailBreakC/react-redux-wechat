import {
  USER_SELECT_FORM,
} from '../constants/ActionTypes'

const initialState = {
  select_form: 'login'
}

export default function user (state = initialState, action) {
  switch(action.type) {
    case USER_SELECT_FORM:
      return {
        ...state,
        select_form: action.form
      }
    default:
      return state
  }
}