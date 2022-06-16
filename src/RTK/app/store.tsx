import { configureStore } from '@reduxjs/toolkit';
import fetchDataReducer from 'RTK/features/fetchData/fetchDataSlice';
import authReducer from 'RTK/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    fetchData: fetchDataReducer,
    authReducer: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
