import { IEventRequest, IEventState } from 'types/EventData.type';

// try to use createAsyncThunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import { getAdminAuth } from 'services/auth.service';
import { StateStatus } from 'types/StateStatus.type';

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
  status: { event: null, guests: null },
  errorMessages: [],
};

export const createEvent = createAsyncThunk(
  'event/create',
  async (eventData: IEventRequest, { getState, rejectWithValue }) => {
    try {
      const token = getAdminAuth();

      if (!token) {
        throw new Error('No token found');
      }

      const { SK: userId } = (getState() as RootState).adminUser.user;
      await axios.post(`${API_URL}/new/${userId}`, JSON.stringify(eventData), {
        headers: {
          Authorization: token,
        },
      });
      return initialState.event;
    } catch (error: any) {
      console.log('error');
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEventByUserId = createAsyncThunk(
  'event/getEventByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = getAdminAuth();
      if (!token) {
        throw new Error('Token not found!');
      }

      const url = `${API_URL}/${userId}`;

      const result = await axios.get(url, {
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

export const getEventByEventId = createAsyncThunk(
  'event/getEventByEventId',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const url = `${API_URL}/invitations/${eventId}`;

      const result = await axios.get(url);

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getGuestsByEventId = createAsyncThunk(
  'event/getGuestsByEventId',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const token = getAdminAuth();
      if (!token) {
        throw new Error('Token not found');
      }

      const result = await axios.get(`${API_URL}/guests/${eventId}`, {
        headers: {
          Authorization: token,
        },
      });
      return result.data.guests;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editEvent = createAsyncThunk(
  'event/edit',
  async (eventData: IEventRequest, { getState, rejectWithValue }) => {
    try {
      const token = getAdminAuth();
      if (!token) {
        throw new Error('Token not found');
      }

      const { SK: eventId } = (getState() as RootState).event.event;
      const result = await axios.patch(
        `${API_URL}/edit/${eventId}`,
        JSON.stringify(eventData),
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    initState(state) {
      state.event = {
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
      };
      state.guests = [];
      state.status = { event: null, guests: null };
      state.errorMessages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state, action) => {
        state.status.event = StateStatus.pending;
      })
      .addCase(getEventByUserId.pending, (state, action) => {
        state.status.event = StateStatus.pending;
      })
      .addCase(getEventByEventId.pending, (state, action) => {
        state.status.event = StateStatus.pending;
      })
      .addCase(getGuestsByEventId.pending, (state, action) => {
        state.status.guests = StateStatus.pending;
      })
      .addCase(editEvent.pending, (state, action) => {
        state.status.event = StateStatus.pending;
      });

    builder
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status.event = StateStatus.fulfilled;
        state.event = action.payload;
      })
      .addCase(getEventByUserId.fulfilled, (state, action) => {
        state.status.event = StateStatus.fulfilled;
        state.event = action.payload;
      })
      .addCase(getEventByEventId.fulfilled, (state, action) => {
        state.status.event = StateStatus.fulfilled;
        state.event = action.payload;
      })
      .addCase(getGuestsByEventId.fulfilled, (state, action) => {
        state.status.guests = StateStatus.fulfilled;
        state.guests = action.payload;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.status.event = StateStatus.fulfilled;
        state.event = action.payload;
      });

    builder
      .addCase(getGuestsByEventId.rejected, (state, action) => {
        state.status.guests = StateStatus.rejected;
      })
      .addCase(getEventByUserId.rejected, (state, action) => {
        state.status.event = StateStatus.rejected;
      })
      .addCase(createEvent.rejected, (state, action) => {
        const { message } = action.payload as { message: string[] };

        state.status.event = StateStatus.rejected;
        state.errorMessages = message;
      })
      .addCase(editEvent.rejected, (state, action) => {
        const { message } = action.payload as { message: string[] };

        state.status.event = StateStatus.rejected;
        state.errorMessages = message;
      });
  },
});

export default eventSlice.reducer;
export const eventActions = eventSlice.actions;
