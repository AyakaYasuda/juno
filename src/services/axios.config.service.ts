import axios from 'axios';
import { SessionKeys } from 'constants/sessionKeys';
import SessionServices from 'services/session.services';

const token = SessionServices.getItem(SessionKeys.TOKEN);

console.log('token', token);
console.log('run');

if (!token) {
  throw new Error('No token found!');
}

export const authHttpClient = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  // baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    Authorization: token,
  },
});

// authHttpClient.defaults.headers.common['Authorization'] = token;
