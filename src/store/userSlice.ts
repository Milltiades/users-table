import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.data);
});

// export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error:any) {
//     throw new Error(`Error: ${error.message}`);
//   }
// });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state: any, action:any) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state: any, action:any) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});




export default userSlice.reducer;
