import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { generateTokenExpirationTime } from 'services/session.services';
import {
  IGuestSignupRequest,
  ILoginRequest,
  ISignupRequest,
} from 'types/UserData.type';

// FIXME: fix api url to auth?
const API_URL = process.env.REACT_APP_API_ENDPOINT + '/user';

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

export const login = createAsyncThunk(
  'login',
  async (loginData: ILoginRequest, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${API_URL}/login`,
        JSON.stringify(loginData)
      );

      console.log('login result.data', result.data);

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  'signup',
  async (signupData: ISignupRequest, thunkAPI) => {
    console.log('signupData', signupData);

    try {
      const result = await axios.post(
        `${API_URL}/signup`,
        JSON.stringify(signupData)
      );

      console.log('signup result.data', result.data);

      return result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

//GUEST SIGNUP
export const signupGuest = createAsyncThunk(
  'signup',
  async (signupData: IGuestSignupRequest, thunkAPI) => {
    try {
      const result = await axios.post(
        `${API_URL}/signup`,
        JSON.stringify(signupData)
      );

      console.log('guest signup result.data', result.data);

      return result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

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

  // FIXME: search best practice of createAsyncThunk
  // maybe replace with RTK query?
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'pending';
        const { token } = action.payload;

        state.isLogin = true;
        state.token = token;
        state.tokenExpirationDate = generateTokenExpirationTime();
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'pending';
      });
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
