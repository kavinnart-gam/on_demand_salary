import axios from 'axios';
import asyncStorage from '../asyncStorage';
// import {jwtDecode} from 'jwt-decode';
// import {store} from '../../../store';
// import {increment} from '../../slices/authSlice';

// import {updateExpireToken} from '../../slices/authSlice';

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

// const isTokenExpired = (token: string): boolean => {
//   try {
//     const decodedToken = jwtDecode(token);
//     const exp = decodedToken?.exp ?? 0; // Default to 0 if exp is undefined
//     const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
//     return exp < currentTime;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return true; // Assume expired if decoding fails (e.g., invalid token)
//   }
// };

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

      // const isExpired = isTokenExpired(token);
      // if (!isExpired) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // } else {
      //   //   navigation.navigate('SignInPage');
      //   store.dispatch(increment());
      //   console.log(
      //     'Token expired, triggering refresh or redirecting to login.',
      //   );
      // }
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
