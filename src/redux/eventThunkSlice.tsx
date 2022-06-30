import { IEventRequest, IEventState } from 'types/EventData.type';

// try to use createAsyncThunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import { getAuth } from 'services/auth.service';

const API_URL = process.env.REACT_APP_API_ENDPOINT + '/event';

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
  errorMessages: [],
};

//create action
//CREATE
export const createEvent = createAsyncThunk(
  'event/create',
  async (eventData: IEventRequest, { getState, rejectWithValue }) => {
    try {
      // FIXME: fix type
      const { SK: userId } = (getState() as any).user.user;
      console.log('token', getAuth());

      await axios.post(`${API_URL}/new/${userId}`, JSON.stringify(eventData), {
        headers: {
          Authorization: getAuth(),
        },
      });
      return initialState.event;
    } catch (error: any) {
      console.log('error');
      return rejectWithValue(error.response.data);
    }
  }
);

//GET
export const getEvent = createAsyncThunk(
  'event/get',
  async (userId: string, { rejectWithValue }) => {
    try {
      const url = `${API_URL}/${userId}`;

      const result = await axios.get(url, {
        headers: {
          Authorization: getAuth(),
        },
      });
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
      const result = await axios.get(`${API_URL}/guests/${eventId}`, {
        headers: {
          Authorization: getAuth(),
        },
      });
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
      const { SK: eventId } = (getState() as RootState).event.event;
      const result = await axios.patch(
        `${API_URL}/edit/${eventId}`,
        JSON.stringify(eventData),
        {
          headers: {
            Authorization: getAuth(),
          },
        }
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
    //FIXME: need test
    logout(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state, action) => {
        state.status = 'pending';
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

    builder.addCase(createEvent.rejected, (state, action) => {
      const { message } = action.payload as { message: string[]};

      state.status = 'rejected';
      state.errorMessages = message;
    });
  },
});

export default eventSlice.reducer;
