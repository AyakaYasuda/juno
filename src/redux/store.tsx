import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './userThunkSlice';
import eventReducer from './eventThunkSlice';

export const store = configureStore({
  reducer: {
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
