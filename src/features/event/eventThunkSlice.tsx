import { IEvent, IEventRequest, IEventState } from 'types/EventData.type';

// try to use createAsyncThunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =
  'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/event';

// initialize
const initialState: IEventState = {
  event: {
    SK: '',
    bride: '',
    groom: '',
    dateWedding: '',
    startingTimeWedding: '',
    endingTimeWedding: '',
    dateWeddingReception: '',
    startingTimeReception: '',
    endingTimeReception: '',
    message: '',
    address: '',
    isEditable: true,
  },
  guests: [],
  status: 'loading',
};

//create action
//CREATE
export const createEvent = createAsyncThunk(
  'event/create',
  async (eventData: IEventRequest, { getState, rejectWithValue }) => {
    try {
      // FIXME: fix type
      const { SK: userId } = (getState() as any).user.user;
      await axios.post(`${API_URL}/new/${userId}`, JSON.stringify(eventData));
      return initialState.event;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//GET
export const getEvent = createAsyncThunk(
  'event/get',
  async (userId: string, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${API_URL}/${userId}`);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getGuests = createAsyncThunk(
  'guests/get',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${API_URL}/guests/${eventId}`);
      return result.data.guests;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//EDIT
export const editEvent = createAsyncThunk(
  'event/edit',
  async (eventData: IEventRequest, { getState, rejectWithValue }) => {
    try {
      // FIXME: fix type
      const { SK: eventId } = (getState() as any).event.event;
      const result = await axios.patch(
        `${API_URL}/edit/${eventId}`,
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
      .addCase(createEvent.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = 'success';
        state.event = action.payload;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.status = 'success';
        state.event = action.payload;
      })
      .addCase(getGuests.fulfilled, (state, action) => {
        state.status = 'success';
        state.guests = action.payload;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.status = 'success';
        state.event = action.payload;
      });
  },
});

export default eventSlice.reducer;
