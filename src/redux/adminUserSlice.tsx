import { IGetUserByIdRequest, IUserState } from 'types/UserData.type';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAttendanceData } from 'types/AttendanceData.type';
import { IUpdateUserRequest } from 'types/UserData.type';
import SessionServices from 'services/session.services';
import { StateStatus } from 'types/StateStatus.type';

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
  status: StateStatus.pending,
  errorMessages: [],
};

//GET
export const getUserById = createAsyncThunk(
  'adminUser/getUserById',
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

// FIXME, no logic to edit user in admin?
//PATCH
export const editUser = createAsyncThunk(
  'adminUser/edit',
  async (updateUserReqBody: IUpdateUserRequest, { rejectWithValue }) => {
    const userId = SessionServices.getAdminUserId() || 'id not found';

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
  'adminUser/createAttendanceData',
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
export const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {
    initState(state) {
      console.log('adminUser initState');

      state.user = {
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
      };
      state.status = StateStatus.pending;
      state.errorMessages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state, action) => {
        state.status = StateStatus.pending;
      })
      .addCase(editUser.pending, (state, action) => {
        state.status = StateStatus.pending;
      })
      .addCase(createAttendanceData.pending, (state, action) => {
        state.status = StateStatus.pending;
      });

    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = StateStatus.fulfilled;
        state.user = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = StateStatus.fulfilled;
        state.user = action.payload;
      })
      .addCase(createAttendanceData.fulfilled, (state, action) => {
        state.status = StateStatus.fulfilled;
        state.user = action.payload;
      });

    builder
      .addCase(editUser.rejected, (state, action) => {
        const { message } = action.payload as { message: string[] };

        state.status = StateStatus.rejected;
        state.errorMessages = message;
      })
      .addCase(createAttendanceData.rejected, (state, action) => {
        const { message } = action.payload as { message: string };

        state.status = StateStatus.rejected;
        state.errorMessages = [message];
      });
  },
});

export default adminUserSlice.reducer;
export const adminUserActions = adminUserSlice.actions;
