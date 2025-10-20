import { configureStore } from '@reduxjs/toolkit';
import bountiesReducer from './bountiesSlice';

export const store = configureStore({
  reducer: {
    bounties: bountiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
