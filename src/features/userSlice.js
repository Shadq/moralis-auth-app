import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

// export const { increment, decrement, incrementByAmount } = userSlice.actions;
// export const selectCount = (state) => state.counter.value;

export default userSlice.reducer;
