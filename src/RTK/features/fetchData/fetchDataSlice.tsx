import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from 'RTK/app/store';
import type { FetchDataState } from 'RTK/app/types';

// export type Data = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   isAdmin: boolean;
//   message: string;
//   allergy: string;
// };

// export type FetchDataState = {
//   data: Data[];
//   loading: boolean;
//   hasErrors: boolean;
// };

const initialState: FetchDataState = {
  data: [],
  loading: false,
  hasErrors: false,
};

export const fetchDataSlice = createSlice({
  name: 'fetchData',
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    success: (state, { payload }: PayloadAction<any>) => {
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
  return async (dispatch: AppDispatch) => {
    dispatch(loading());
    try {
      const result = await axios.get(
        'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user/9b83b40a-9927-4360-ae07-732ae5ef2bd8'
      );
      const user = await result.data;
      dispatch(success(user));
    } catch (err) {
      dispatch(error());
    }
  };
};
