import {
  ILoginRequest,
  ISignupRequest,
  IGuestSignupRequest,
  IUserState,
} from 'types/UserData.type';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import CreateAsyncThunkActions from 'constants/createAsyncThunkActions';
import { IAttendanceData } from 'types/AttendanceData.type';
import { RootState } from 'redux/store';
import { IUpdateUserReqBody } from 'types/IUpdateUserReqBody.type';
import SessionServices from 'services/session.services';
import { SessionKeys } from 'constants/sessionKeys';

const API_URL = process.env.REACT_APP_API_ENDPOINT + '/user';

// FIXME: delete dummy data
// initialize
const initialState: IUserState = {
  user: {
    PK: 'dummy PK',
    SK: 'dummy SK',
    userId: 'dummy userId',
    eventId: 'dummy eventId',
    firstName: 'dummy firstName',
    lastName: 'dummy lastName',
    email: 'dummy email',
    password: 'dummy password',
    isAdmin: false,
    message: 'dummy message',
    allergy: 'dummy allergy',
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
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = SessionServices.getItem(SessionKeys.USER_ID)
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
    updateUserReqBody: IUpdateUserReqBody,
    { rejectWithValue, getState }
  ) => {
    const userState = (getState() as RootState).user;

    console.log('editUser userState', userState);

    const userId =
      SessionServices.getItem(SessionKeys.USER_ID) || 'id not found';

    try {
      const result = await axios.patch(
        `${API_URL}/edit/${userId}`,
        JSON.stringify(updateUserReqBody)
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
        console.log('state.user', state.user);

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
