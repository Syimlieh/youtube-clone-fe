import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: [
        {
            id: 1,
            comment: "This video helped a lot!",
            username: "user_1",
            userAvatar: "https://i.pravatar.cc/150?u=1",
            likes: 12,
            postedAt: "2024-07-01T10:00:00Z",
        },
        {
            id: 2,
            comment: "Awesome content, keep it up!",
            username: "user_2",
            userAvatar: "https://i.pravatar.cc/150?u=2",
            likes: 5,
            postedAt: "2025-05-20T12:30:00Z",
        },
        {
            id: 3,
            comment: "You just got a new subscriber 🔥",
            username: "user_3",
            userAvatar: "https://i.pravatar.cc/150?u=3",
            likes: 18,
            postedAt: "2024-07-03T08:15:00Z",
        },
        {
            id: 4,
            comment: "Finally someone explains it clearly!",
            username: "user_4",
            userAvatar: "https://i.pravatar.cc/150?u=4",
            likes: 9,
            postedAt: "2024-07-04T14:45:00Z",
        },
        {
            id: 5,
            comment: "Legend! This was super helpful.",
            username: "user_5",
            userAvatar: "https://i.pravatar.cc/150?u=5",
            likes: 25,
            postedAt: "2024-07-05T09:00:00Z",
        }
    ]
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
})

export default commentSlice.reducer;