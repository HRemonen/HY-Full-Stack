import { createSlice } from '@reduxjs/toolkit'

let timeoutID

const initialState = ""

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const newNotification = (content,  time = 5) => {
  return async dispatch => {
    dispatch(setNotification(content))
    console.log('Time:', time, 'Content:', content)

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}
export default notificationSlice.reducer