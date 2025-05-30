import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        firstName: "Fleming",
        lastName: "Syiemlieh",
        email: "fleming@gmail.com",
        channelName: "fleming1234",
        channelId: "@channel5",
        profile: "",
    }
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
})

export default profileSlice.reducer;