// try to use createAsyncThunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =
  'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/event';

//hoge test
const DAMMY_USERID = '67014c86-88b1-46f4-abc8-72a0e1db9656';

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
  event: EventForm | null;
  status: 'pending' | 'loading' | 'failed';
}

// initialize
const initialState: EventState = {
  event: null,
  status: 'pending',
};

//create action
//CREATE
export const eventCreate = createAsyncThunk(
  'event/create',
  async (eventData: EventForm, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${API_URL}/event/${DAMMY_USERID}`,
        JSON.stringify(eventData)
      );
      console.log(eventData);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//GET
export const eventGet = createAsyncThunk(
  'event/get',
  async (eventData: EventForm, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${API_URL}/event/${DAMMY_USERID}`);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//EDIT
export const eventEdit = createAsyncThunk(
  'event/edit',
  async (eventData: EventForm, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `${API_URL}/event/${DAMMY_USERID}`,
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
      .addCase(eventCreate.fulfilled, (state, action) => {
        state.status = 'pending';
        state.event = action.payload;
      })
      .addCase(eventGet.fulfilled, (state, action) => {
        state.status = 'pending';
        state.event = action.payload;
      })
      .addCase(eventEdit.fulfilled, (state, action) => {
        state.status = 'pending';
        state.event = action.payload;
      });
  },
});

export default eventSlice.reducer;
