import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
};
const slice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    userLog(state, action) {
      state.user = action.payload;
    },
  },
});

export const { userLog } = slice.actions;
export default slice.reducer;
