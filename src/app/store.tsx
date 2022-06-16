import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authThunkSlice';
import userReducer from '../features/user/userThunkSlice';
import eventReducer from '../features/event/eventThunkSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    event: eventReducer,
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
