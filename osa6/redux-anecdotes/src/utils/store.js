import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from '../reducers/anecdoteReducer'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: "",
  }
})

export default store