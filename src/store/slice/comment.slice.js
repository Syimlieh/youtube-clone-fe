import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: []
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.value.push(action.payload);
        },
        setComments: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { addComment, setComments } = commentSlice.actions;
export default commentSlice.reducer;