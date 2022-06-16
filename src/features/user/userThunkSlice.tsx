// // try to use createAsyncThunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =
  'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user';

// type definition
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
    | null;
  userId: string | null;
  status: 'pending' | 'loading' | 'failed';
}

// initialize
const initialState: UserState = {
  user: [],
  userId: null,
  status: 'pending',
};

//create async payload callback function
//GET
export const getUser = createAsyncThunk(
  'get',
  async (userId: string, { rejectWithValue }) => {
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

// //create slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'pending';
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = 'pending';
      });
  },
});

export default userSlice.reducer;
