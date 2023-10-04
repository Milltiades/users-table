import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "edit",
  initialState: false,
  reducers: {
    updateModalEdit: (state, action) => {
      return !state;
    },
  },
});

export const { updateModalEdit } = editSlice.actions;

export default editSlice.reducer;
