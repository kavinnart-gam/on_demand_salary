import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  // other configurations
});

instance.interceptors.request.use(
  config => {
    const token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVWlkIjoiam9obl91aWQiLCJwaG9uZSI6IjA4MDAwMDAwMDAiLCJpYXQiOjE3MTgxMTgyNzQsImV4cCI6MTcxODExODQ1NH0.xBAF9xzIwlFFdUM7TKBIFVIq3L-grLw3mDstVaCDQDQ';
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
    if (error.response && error.response.status === 401) {
      console.log('call the refresh token api here');
      // Handle 401 error, e.g., redirect to login or refresh token
    }
    return Promise.reject(error);
  },
);

export default instance;
