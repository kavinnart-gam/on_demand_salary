import {configureStore} from '@reduxjs/toolkit';
import authReducer from './src/slices/authSlice';

// export const store = configureStore({
//   reducer: {
//     counter: authReducer,
//   },
// });

export const store = configureStore({
  reducer: {
    counter: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
