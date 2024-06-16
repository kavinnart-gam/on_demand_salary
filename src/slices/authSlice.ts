import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    availableAmount: 0,
  },
  reducers: {
    setAvailableAmount(state, action) {
      state.availableAmount = action.payload;
    },
  },
});

export const {setAvailableAmount} = authSlice.actions;

export const selectAvailableAmount = (state: any) => state.auth.availableAmount;

export default authSlice.reducer;
