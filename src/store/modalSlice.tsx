import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    updateModal: (state, action) => {
      return !state;
    },
  },
});

export const { updateModal } = modalSlice.actions;

export default modalSlice.reducer;
