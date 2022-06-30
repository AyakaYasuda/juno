import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import eventReducer from './eventSlice';
import { adminAuthReducer } from './adminAuthSlice';
import { guestAuthReducer } from './guestAuthSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    adminAuth: adminAuthReducer,
    guestAuth: guestAuthReducer,
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
