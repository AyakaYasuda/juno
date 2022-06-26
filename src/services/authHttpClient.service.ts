import axios from 'axios';
import { SessionKeys } from 'constants/sessionKeys';
import SessionServices from 'services/session.services';

const getAuthHttpClient = () => {
  const token = SessionServices.getItem(SessionKeys.TOKEN);

  console.log('token', token);

  if (!token) {
    throw new Error('No token found!');
  }

  // const authHttpClient = axios.create({
  //   baseURL: process.env.REACT_APP_API_ENDPOINT,
  //   // baseURL: 'https://jsonplaceholder.typicode.com',
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //   },
  // });
  const authHttpClient = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    // baseURL: 'https://jsonplaceholder.typicode.com',
  });

  authHttpClient.defaults.headers.common['Authorization'] = token;
  authHttpClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  authHttpClient.defaults.headers.common['Access-Control-Allow-Methods'] =
    'GET,PUT,POST,DELETE,PATCH,OPTIONS';
  authHttpClient.defaults.headers.common['Content-Type'] = 'application/json';

  return authHttpClient;
};

export default getAuthHttpClient;
