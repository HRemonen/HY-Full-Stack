import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    }
    
  }
})

export const { newNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer