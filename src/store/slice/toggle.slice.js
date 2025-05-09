import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    sidebar: false,
 };

const toggleSLice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar
        },
    }
})

export const { toggleSidebar } = toggleSLice.actions

export default toggleSLice.reducer