import { IEventRequest, IEventState } from 'types/EventData.type';

// try to use createAsyncThunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT + '/event';

// FIXME: delete dummy data
// initialize
const initialState: IEventState = {
  event: {
    SK: 'dummy SK',
    bride: 'dummy bride',
    groom: 'dummy groom',
    dateWedding: 'dummy dateWedding',
    startingTimeWedding: 'dummy startingTimeWedding',
    endingTimeWedding: 'dummy endingTimeWedding',
    dateWeddingReception: 'dummy dateWeddingReception',
    startingTimeReception: 'dummy startingTimeReception',
    endingTimeReception: 'dummy endingTimeReception',
    message: 'dummy message',
    address: 'dummy address',
    isEditable: true,
  },
  guests: [
    {
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
    {
      PK: 'dummy PK2',
      SK: 'dummy SK2',
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
  ],
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
