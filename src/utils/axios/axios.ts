import axios from 'axios';
import asyncStorage from '../asyncStorage';
import common from '../common';

const instance = axios.create({
  baseURL: common.urlConfig(),
  headers: {
    'Content-Type': 'application/json',
  },
  // other configurations
});

const getToken = async () => {
  const accessToken = (await asyncStorage.getDataFromAsyncStorage({
    key: 'idToken',
  })) as string;
  return accessToken;
};

instance.interceptors.request.use(
  async config => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => response,
  error => {
    //console.log('API ERROR', error.response);
    if (error.response && error.response.status === 401) {
      //  console.log('call the refresh token api here');
      // Handle 401 error, e.g., redirect to login or refresh token
    } else if (error.response && error.response.status === 400) {
      return {data: {error: 'creditBalance is not available'}};
      //creditBalance is not available
    }

    //
    return Promise.reject(error);
  },
);

export default instance;
