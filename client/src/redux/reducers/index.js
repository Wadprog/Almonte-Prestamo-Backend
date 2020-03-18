import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from'./profile'
import loan from './loan'
export default combineReducers({
  alert,
  auth,
  profile,
  loan
})
