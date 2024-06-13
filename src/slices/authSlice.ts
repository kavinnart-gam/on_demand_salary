// import {createSlice} from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';

// interface CounterState {
//   isExpireToken: boolean;
// }

// const initialState: CounterState = {
//   isExpireToken: false,
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState: initialState,
//   reducers: {
//     updateExpireToken: (state, action: PayloadAction<boolean>) => {
//       console.log('update: ', action.payload);
//       state.isExpireToken = action.payload;
//     },
//   },
// });

// export const {updateExpireToken} = authSlice.actions;

// export const authSelector = (state: any): boolean => state.authReducer;

// export default authSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    token: '',
    availableAmount: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setAvailableAmount(state, action) {
      state.availableAmount = action.payload;
    },
  },
});

export const {increment, decrement, setToken, setAvailableAmount} =
  counterSlice.actions;

export const selectCount = state => state.counter.value;
export const selectToken = state => state.counter.token;
export const selectAvailableAmount = state => state.counter.availableAmount;

export default counterSlice.reducer;
