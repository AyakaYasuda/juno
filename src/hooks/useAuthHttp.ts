import axios from 'axios';

const useAuthHttp = (token: string) => {
  const authHttpClient = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    // baseURL: 'https://jsonplaceholder.typicode.com',
    // headers: {
    //   Authorization: `Bearer ${token}`,
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    // },
  });

  return { authHttpClient };
};

export default useAuthHttp;
