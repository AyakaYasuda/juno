import { Action, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isLogin: boolean;
  tokenExpirationDate: Date | null;
  token?: string;
  status?: string;
};

type SetIsLoginAction = Action & {
  payload: boolean;
};

type SetTokenExpirationDateAction = Action & {
  payload: Date | null;
};

type SetTokenAction = Action & {
  payload: string;
};

const initialState: InitialState = {
  isLogin: false,
  tokenExpirationDate: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin(state, action: SetIsLoginAction) {
      state.isLogin = action.payload;
    },
    setTokenExpirationDate(state, action: SetTokenExpirationDateAction) {
      state.tokenExpirationDate = action.payload;
    },
    setToken(state, action: SetTokenAction) {
      state.token = action.payload;
    },
  },
  extraReducers: {},
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
