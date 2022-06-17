import {
  IUser,
  ILoginRequest,
  ISignupRequest,
  IGuestSignupRequest,
  IUserState,
  IAuthState,
} from 'types/UserData.type';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import CreateAsyncThunkActions from 'constants/createAsyncThunkActions';
import { IAttendanceData } from 'types/AttendanceData.type';

// FIXME: high
const API_URL =
  'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user';

// initialize
const initialState: IUserState = {
  user: {
    PK: '',
    SK: '',
    userId: '',
    eventId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false,
    message: '',
    allergy: '',
    isAttending: true,
  },
  status: 'pending',
};

//create async payload callback function
//LOGIN
export const login = createAsyncThunk(
  'login',
  async (loginData: ILoginRequest, { rejectWithValue }) => {
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
  async (signupData: ISignupRequest, thunkAPI) => {
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

//GUEST SIGNUP
export const signupGuest = createAsyncThunk(
  'signup',
  async (signupData: IGuestSignupRequest, thunkAPI) => {
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
  CreateAsyncThunkActions.GET_USER,
  async (userId: string, { getState, rejectWithValue }) => {
    try {
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
  async (
    userData: Record<string, boolean | string> = {},
    { rejectWithValue }
  ) => {
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

export const createAttendanceData = createAsyncThunk(
  CreateAsyncThunkActions.CREATE_ATTENDANCE_DATA,
  async (attendanceData: IAttendanceData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${API_URL}/event/${attendanceData.eventId}`,
        JSON.stringify(attendanceData.attendanceReqBody)
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
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'pending';
        state.user = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = 'pending';
        state.user = action.payload;
      })
      .addCase(createAttendanceData.fulfilled, (state, action) => {
        state.status = 'pending';
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
