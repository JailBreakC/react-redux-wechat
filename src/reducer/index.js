import { combineReducers } from 'redux'
import user from './user'
import chat from './chat'

const rootReducer = combineReducers({
  user,
  chat
})

export default rootReducer