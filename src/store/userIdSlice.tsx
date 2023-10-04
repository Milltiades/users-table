import { createSlice } from "@reduxjs/toolkit";

const userIdSlice = createSlice({
  name: "userid",
  initialState: {
    value: "1",
  },
  reducers: {
    getUserId: (state: any, action: any) => {
      state.value = action.payload;
    },
  },
});

export const { getUserId } = userIdSlice.actions;

export default userIdSlice.reducer;
