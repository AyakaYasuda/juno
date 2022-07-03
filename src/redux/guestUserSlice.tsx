import { IGetUserByIdRequest, IUserState } from 'types/UserData.type';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAttendanceData } from 'types/AttendanceData.type';
import { IUpdateUserRequest } from 'types/UserData.type';
import SessionServices from 'services/session.services';
import { getGuestAuth } from 'services/auth.service';

const API_URL = process.env.REACT_APP_API_ENDPOINT + '/user';

// FIXME: delete duplicate code
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
  errorMessages: [],
};

//GET
export const getUserById = createAsyncThunk(
  'guestUser/getUserById',
  async (getUserByIdRequest: IGetUserByIdRequest, { rejectWithValue }) => {
    const { userId, token } = getUserByIdRequest;

    try {
      const url = `${API_URL}/${userId}`;

      const result = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      return result.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//PATCH
export const editUser = createAsyncThunk(
  'guestUser/edit',
  async (updateUserReqBody: IUpdateUserRequest, { rejectWithValue }) => {
    const userId = SessionServices.getGuestUserId() || 'id not found';

    const url = `${API_URL}/edit/${userId}`;

    try {
      const token = getGuestAuth();
      if (!token) {
        throw new Error('Token not found');
      }

      const result = await axios.patch(url, JSON.stringify(updateUserReqBody), {
        headers: {
          Authorization: token,
        },
      });
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAttendanceData = createAsyncThunk(
  'createAttendanceData',
  async (attendanceData: IAttendanceData, { rejectWithValue }) => {
    const { eventId, attendanceReqBody } = attendanceData;

    try {
      const token = getGuestAuth();
      if (!token) {
        throw new Error('Token not found');
      }

      const url = `${API_URL}/event/${eventId}`;
      const result = await axios.post(url, JSON.stringify(attendanceReqBody), {
        headers: {
          Authorization: token,
        },
      });

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//create slice
export const guestUserSlice = createSlice({
  name: 'guestUser',
  initialState,
  reducers: {
    //FIXME: need test
    logout(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
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

    builder
      .addCase(editUser.rejected, (state, action) => {
        const { message } = action.payload as { message: string[] };

        state.status = 'rejected';
        state.errorMessages = message;
      })
      .addCase(createAttendanceData.rejected, (state, action) => {
        const { message } = action.payload as { message: string };

        state.status = 'rejected';
        state.errorMessages = [message];
      });
  },
});

export default guestUserSlice.reducer;
