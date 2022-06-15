import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from 'app/store';
import { IUserRes, ILoginReq, IUser, ISignupReq } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://z8feue8naf.execute-api.us-east-1.amazonaws.com/prod/user/',

    // 'https://jsonplaceholder.typicode.com/',

    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (build) => ({
    login: build.mutation<IUserRes, ILoginReq>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: build.mutation<ISignupReq, null>({
      query: (data) => ({
        url: 'signup',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
