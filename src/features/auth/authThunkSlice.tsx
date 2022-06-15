// try to use createAsyncThunk
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =
  'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user';

// type definition
interface LoginForm {
  email: string;
  password: string;
}

interface UserState {
  user: LoginForm | null;
  userId: string;
}

export interface AuthState {
  user: UserState | null;
  status: 'pending' | 'loading' | 'failed';
}

// initialize
const initialState: AuthState = {
  user: null,
  status: 'pending',
};

//create action
export const loginAction = createAsyncThunk(
  //1st Arg: type
  'login',
  //2nd Arg: payloadCreator
  async (loginData: LoginForm, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${API_URL}/login`,
        JSON.stringify({ loginData })
      );
      console.log(result);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//create slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        loginAction.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          state.status = 'pending';
          state.user = action.payload;
        }
      )
      .addCase(loginAction.rejected, (state) => {
        state.status = 'pending';
      });
  },
});

export default authSlice.reducer;
