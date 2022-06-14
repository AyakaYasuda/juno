import { configureStore } from '@reduxjs/toolkit';
import fetchDataReducer from 'RTK/features/fetchData/fetchDataSlice';

export const store = configureStore({
  reducer: {
    fetchData: fetchDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
