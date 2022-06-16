// try to use createAsyncThunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =
  'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/event';

// type definition
interface EventForm {
  bride: string;
  groom: string;
  dateWedding: string;
  startingTimeWedding: string;
  endingTimeWedding: string;
  dateWeddingReception: string;
  startingTimeReception: string;
  endingTimeReception: string;
  address: string;
  message: string;
}
export interface EventState {
  event: EventForm | any;
  status: 'loading' | 'success' | 'failed';
}

// initialize
const initialState: EventState = {
  //FIXME: event initial value
  event: null,
  status: 'loading',
};

//create action
//CREATE
export const eventCreate = createAsyncThunk(
  'event/create',
  async (eventData: EventForm, { getState, rejectWithValue }) => {
    try {
      // FIXME: fix type
      const { userId } = (getState() as any).user;
      await axios.post(`${API_URL}/new/${userId}`, JSON.stringify(eventData));

      return;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//GET
export const eventGet = createAsyncThunk(
  'event/get',
  async (_, { getState, rejectWithValue }) => {
    try {
      // FIXME: fix type
      const { userId } = (getState() as any).user;
      await axios.get(`${API_URL}/${userId}`);
      return;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//EDIT
export const eventEdit = createAsyncThunk(
  'event/edit',
  async (eventData: EventForm, { getState, rejectWithValue }) => {
    try {
      // FIXME: fix type
      const { userId } = (getState() as any).user;
      const result = await axios.patch(
        `${API_URL}/edit/${userId}`,
        JSON.stringify(eventData)
      );
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//create slice
export const eventSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(eventCreate.pending, (state, action) => {
        //not done to create yet
        state.status = 'loading';
      })
      .addCase(eventCreate.fulfilled, (state, action) => {
        state.status = 'success';
        state.event = action.payload;
      })
      .addCase(eventGet.fulfilled, (state, action) => {
        state.status = 'success';
        state.event = action.payload;
      })
      .addCase(eventEdit.fulfilled, (state, action) => {
        state.status = 'success';
        state.event = action.payload;
      });
  },
});

export default eventSlice.reducer;
