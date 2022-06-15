import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authThunkSlice';
// import { authApi } from 'app/services/authApi';
// import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    // [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(authApi.middleware);
  // },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
