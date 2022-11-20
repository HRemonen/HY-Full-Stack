import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    newFilter(state, action) {
      return action.payload
    },
    clearFilter(state, action) {
      return initialState
    }
    
  }
})

export const { newFilter, clearFilter } = filterSlice.actions
export default filterSlice.reducer