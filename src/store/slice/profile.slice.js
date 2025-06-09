import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
    staticChannelData: { // as we are not adding some channdel data so i am keeping this static for now
        channelName: "Fleming Tech",
        subscriberCount: 18400,
        banner: "https://yt3.googleusercontent.com/VY9cGtWqW_xK136j6Kdqo1fNGuJHA3a94U6xtd3S0TBJZGGh6B0uruZQ7jXPRWlCm9jHr_1Ptw=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
        description: `Welcome to Fleming Tech! 🚀

            We share videos on software development, cloud computing, AI/ML, and building real-world projects using Next.js, MongoDB, and more. Subscribe to stay updated with the latest dev tips, tutorials, and tech reviews.

            📍 New videos every week.`,
    },
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.value = action.payload;
        },
        clearProfile: (state) => {
            state.value = initialState.value;
        },
    },
})

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;