// // try to use createAsyncThunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =
  'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user';

// type definition

interface LoginForm {
  email: string;
  password: string;
}
interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IUser {
  firstName: string;
  lastName: string;
  message: string;
  allergy: string;
  isAttending: boolean;
  isAdmin: boolean;
}
interface SignupFormGuest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  allergy: string;
  isAttending: boolean;
  message: string;
  isAdmin: boolean;
}
export interface UserState {
  user:
    | {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        isAdmin: boolean;
        message: string;
        allergy: string;
        isAttending: boolean;
      }[]
    //FIXME: fix type
    | any
    | null;
  userId: string;
  status: 'pending' | 'loading' | 'failed';
}

export interface AuthState {
  user: UserState | null;
  status: 'pending' | 'loading' | 'failed';
}

// initialize
const initialState: UserState = {
  user: [],
  //FIXME: fix hard code
  userId: '',
  status: 'pending',
};

//create async payload callback function
//LOGIN
export const login = createAsyncThunk(
  'login',
  async (loginData: LoginForm, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${API_URL}/login`,
        JSON.stringify(loginData)
      );
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//SIGNUP
export const signup = createAsyncThunk(
  'signup',
  async (signupData: SignupForm, thunkAPI) => {
    try {
      const result = await axios.post(
        `${API_URL}/signup`,
        JSON.stringify(signupData)
      );
      return result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const signupGuest = createAsyncThunk(
  'signup',
  async (signupData: SignupFormGuest, thunkAPI) => {
    try {
      const result = await axios.post(
        `${API_URL}/signup`,
        JSON.stringify(signupData)
      );
      return result.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

//GET
export const getUser = createAsyncThunk(
  'get',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { userId } = (getState() as any).user;

      console.log('getUser createAsyncThunk userId', userId);

      const result = await axios.get(`${API_URL}/${userId}`);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//PATCH
export const editUser = createAsyncThunk(
  'edit',
  async (userData: UserState, { rejectWithValue }) => {
    try {
      const result = await axios.patch(
        `${API_URL}/${userData.userId}/edit`,
        userData
      );
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//create slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //FIXME: need test
    logout(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'pending';
        console.log('login extraReducers action.payload', action.payload);

        // FIXME: add user info to state
        // state.user = action.payload.user;
        state.userId = action.payload.userId;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'pending';
        state.userId = action.payload.userId;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'pending';
        state.user = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = 'pending';
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
