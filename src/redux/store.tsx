import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import adminUserReducer from './adminUserSlice';
import eventReducer from './eventSlice';
import { adminAuthReducer } from './adminAuthSlice';
import { guestAuthReducer } from './guestAuthSlice';
import guestUserReducer from './guestUserSlice';

export const store = configureStore({
  reducer: {
    adminUser: adminUserReducer,
    guestUser: guestUserReducer,
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
