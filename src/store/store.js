import { configureStore } from '@reduxjs/toolkit';
import toggleSlice from './slice/toggle.slice';

export const store = configureStore({
  reducer: {
    toggle: toggleSlice
  },
});
