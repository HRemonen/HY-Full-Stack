import { createSlice } from '@reduxjs/toolkit'
import loginService from "../services/login"
import blogService from '../services/blogs'

const initialState = null

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state, action) {
        return action.payload
      },
      logout(state, action) {
        return initialState
      }
    }
})

export const { login, logout } = authSlice.actions

export const isLogged = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(login(user))
    }
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    dispatch(login(user))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
  }
}

export default authSlice.reducer