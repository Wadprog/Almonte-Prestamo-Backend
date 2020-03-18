
import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOG_OUT,
  LOG_IN_FAIL,
  LOG_IN_SUCCESS
} from './Const'
import { setAlert } from './alert'
import setAuthToken from '../../utils/setAuthToken'
export const logout = () => async dispatch => {
  dispatch({
    type: LOG_OUT
  })
  
}
export const login = ({ name, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, password })
  try {
    const res = await axios.post('api/auth', body, config)
    console.log(res)
    dispatch({
      type: LOG_IN_SUCCESS,
      payload: res.data
    })
  
  } catch (error) {
    console.log(` Error registering ${error}`)
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
    }
    dispatch({
      type: LOG_IN_FAIL
    })
  }
}
//register user
export const loadUser = () => async dispatch => {
  if (localStorage.token) setAuthToken(localStorage.token)
  try {
    const res = await axios.get('/api/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}
export const register = ({ name, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, password })
  try {
    const res = await axios.post('api/user', body, config)
    console.log(res)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    console.log(` Error registering ${error}`)
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}
