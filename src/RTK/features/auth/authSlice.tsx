import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SignupState } from 'RTK/features/types';

const initialState: SignupState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isAdmin: false,
  message: '',
  allergy: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer comes here
  },
  extraReducers: {
    // Extra reducer comes here
  },
});

export default authSlice.reducer;
