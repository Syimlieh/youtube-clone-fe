import { configureStore } from '@reduxjs/toolkit';
import toggleSlice from './slice/toggle.slice';
import videoSlice from './slice/video.slice';

export const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    videos: videoSlice,
  },
});
