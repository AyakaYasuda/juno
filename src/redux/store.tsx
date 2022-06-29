import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './userThunkSlice';
import eventReducer from './eventThunkSlice';
import { authReducer } from './authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
