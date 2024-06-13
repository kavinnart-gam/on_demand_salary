import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    availableAmount: 0,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setAvailableAmount(state, action) {
      state.availableAmount = action.payload;
    },
  },
});

export const {setToken, setAvailableAmount} = authSlice.actions;

export const selectToken = state => state.auth.token;
export const selectAvailableAmount = state => state.auth.availableAmount;

export default authSlice.reducer;
