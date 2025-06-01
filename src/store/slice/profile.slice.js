import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            console.log('Setting profile:', action.payload);
            state.value = action.payload;
        },
        clearProfile: (state) => {
            state.value = initialState.value;
        },
    },
})

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;