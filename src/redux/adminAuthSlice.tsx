import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { generateTokenExpirationTime } from 'services/session.services';
import { ILoginRequest, ISignupRequest } from 'types/UserData.type';

// FIXME: fix api url to auth?
const API_URL = process.env.REACT_APP_API_ENDPOINT + '/user';

type InitialState = {
  isLogin: boolean;
  tokenExpirationDate: string | null;
  token?: string;
  status?: string;
  errorMessages?: string[];
};

type SetIsLoginAction = Action & {
  payload: boolean;
};

type SetTokenExpirationDateAction = Action & {
  payload: string | null;
};

type SetTokenAction = Action & {
  payload: string;
};

type LoginAction = Action & {
  payload: { userId: string; token: string };
};

type SignupAction = Action & {
  payload: { userId: string; token: string };
};

const initialState: InitialState = {
  isLogin: false,
  tokenExpirationDate: null,
};

export const login = createAsyncThunk(
  'adminAuth/login',
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
  'adminAuth/signup',
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const adminAuthSlice = createSlice({
  name: 'adminAuth',
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
    initState(state) {
      // FIXME: any easy way to reset?
      state.isLogin = false;
      state.tokenExpirationDate = null;
      state.errorMessages = [];
      // FIXME: avoid using undefined
      state.token = undefined;
    },
  },

  // FIXME: search best practice of createAsyncThunk
  // maybe replace with RTK query?
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: LoginAction) => {
        const { token } = action.payload;

        state.status = 'pending';
        state.isLogin = true;
        state.token = token;
        state.tokenExpirationDate = String(generateTokenExpirationTime());
      })
      .addCase(signup.fulfilled, (state, action: SignupAction) => {
        const { token } = action.payload;
        console.log('signup action.payload', action.payload);

        state.status = 'pending';
        state.isLogin = true;
        state.token = token;
        state.tokenExpirationDate = String(generateTokenExpirationTime());
      });

    builder
      .addCase(login.rejected, (state, action) => {
        // FIXME: fix type
        const { message } = action.payload as { message: string[] };

        state.status = 'rejected';
        state.errorMessages = message;
      })
      .addCase(signup.rejected, (state, action) => {
        const { message } = action.payload as { message: string[] };

        state.status = 'rejected';
        state.errorMessages = message;
      });
  },
});

export const adminAuthActions = adminAuthSlice.actions;
export const adminAuthReducer = adminAuthSlice.reducer;
