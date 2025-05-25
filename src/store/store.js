import { configureStore } from '@reduxjs/toolkit';
import toggleSlice from './slice/toggle.slice';
import videoSlice from './slice/video.slice';
import profileSlice from './slice/profile.slice';
import commentSlice from './slice/comment.slice';

export const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    videos: videoSlice,
    profile: profileSlice,
    comments: commentSlice,
  },
});
