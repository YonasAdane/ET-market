import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Reducer, Slice } from '@reduxjs/toolkit'

export interface SidebarState {
  value: boolean
}

const initialState: SidebarState = {
  value: true,
}

const sidebarSlice= createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    on: (state) => {
      state.value =true
    },
    off: (state) => {
      state.value =false
    },
    toggle:(state)=>{
        state.value=!state.value
    }
  },
})

export const { on, off, toggle } = sidebarSlice.actions

export default sidebarSlice.reducer as Reducer<SidebarState>
