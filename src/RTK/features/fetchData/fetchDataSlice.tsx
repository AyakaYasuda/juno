import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface FetchDataState {
  loading?: any;
  hasErrors?: any;
  data?: any;
}

const initialState = {
  loading: false,
  hasErrors: false,
  data: [],
} as FetchDataState;

export const fetchDataSlice = createSlice({
  name: 'fetchData',
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    success: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    error: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export default fetchDataSlice.reducer;

export const { success, loading, error } = fetchDataSlice.actions;

export const fetchData = () => {
  return async (dispatch: any) => {
    dispatch(loading());
    try {
      const result = await axios.get(
        // 'https://jsonplaceholder.typicode.com/users/1'

        'https://qwrtoswfm8.execute-api.us-east-1.amazonaws.com/prod/user/9b83b40a-9927-4360-ae07-732ae5ef2bd8'
      );
      const user = await result.data;
      dispatch(success(user));
    } catch (err) {
      dispatch(error());
    }
  };
};
