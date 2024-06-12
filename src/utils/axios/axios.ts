import axios from 'axios';
import asyncStorage from '../asyncStorage';
import {jwtDecode} from 'jwt-decode';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  // other configurations
});

// const _checkTokenExpired = async () => {
//   const tokenExpiredAt = (await asyncStorage.getDataFromAsyncStorage({
//     key: 'tokenExpireAt',
//   })) as string;
//   if (tokenExpiredAt) {
//     const exp = (JSON.parse(tokenExpiredAt) - 60) as number;
//     const now = Math.round(new Date().getTime() / 1000);
//     const isExpired = now >= exp;

//     return isExpired;
//   }
// };

const _checkTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp;

    if (!exp) {
      // No expiration time in token
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > exp;
  } catch (error) {
    // Invalid token
    return true;
  }
};

const _getToken = async () => {
  const accessToken = (await asyncStorage.getDataFromAsyncStorage({
    key: 'idToken',
  })) as string;
  console.log('+++ accessToken +++ ', accessToken);
  return 'Bearer ' + accessToken;
};

instance.interceptors.request.use(
  async config => {
    const token = await _getToken();
    console.log('+++ Expire +++ ', _checkTokenExpired(token));

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => response,
  error => {
    console.log('API ERROR', error.response);
    if (error.response && error.response.status === 401) {
      console.log('call the refresh token api here');
      // Handle 401 error, e.g., redirect to login or refresh token
    }
    return Promise.reject(error);
  },
);

export default instance;
