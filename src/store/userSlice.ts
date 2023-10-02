// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // Define an async thunk to fetch users
// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       throw new Error("Failed to fetch users");
//     }
//   } catch (error:any) {
//     throw new Error("Error fetching users: " + error.message);
//   }
// });

// const UserSlice = createSlice({
//   name: "users",
//   initialState: {
//     data: []
//   },
//   reducers: {
//     getUsers: (state, action) => {
//       state.data = action.payload;
//     },
//     deleteUser: (state, action) => {
//       state.data = state.data.filter((user:any) => user.id !== action.payload);
//     },
//     editUser: (state, action) => {
//         state= action.payload
//     }
//   },
//   // extraReducers: (builder) => {
//   //   builder
//   //     .addCase(fetchUsers.pending, (state:any) => {
//   //       state.loading = true;
//   //       state.error = null;
//   //     })
//   //     .addCase(fetchUsers.fulfilled, (state:any, action) => {
//   //       state.loading = false;
//   //       state.data = action.payload;
//   //     })
//   //     .addCase(fetchUsers.rejected, (state:any, action) => {
//   //       state.loading = false;
//   //       state.error = action.error.message;
//   //     });
//   // },
// });

// export const { getUsers, deleteUser, editUser } = UserSlice.actions;

// export default UserSlice.reducer;

//

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// // Define an async thunk to fetch users
// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       throw new Error("Failed to fetch users");
//     }
//   } catch (error:any) {
//     throw new Error("Error fetching users: " + error.message);
//   }
// });

// const UserSlice = createSlice({
//   name: "users",
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     getUsers: (state, action) => {
//       state.data = action.payload;
//     },
//     deleteUser: (state:any, action) => {
//       // Create a new array without the deleted user
//       state.data = state.data.filter((user:any) => user.id !== action.payload);
     
//     },
//     editUser: (state, action) => {
//       // Update user data, assuming action.payload contains the updated user object
//       // Example: state.data = state.data.map((user) => user.id === action.payload.id ? action.payload : user);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state:any) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUsers.fulfilled, (state:any, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state:any, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { getUsers, deleteUser, editUser } = UserSlice.actions;

// export default UserSlice.reducer;



import {  createSlice } from "@reduxjs/toolkit";



const UserSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getUsers: (state, action) => {
      state = action.payload;
    },
    deleteUser: (state, action) => {
      state = action.payload
    },
    editUser: (state, action) => {
        state= action.payload
    }
  },


});

export const { getUsers, deleteUser, editUser } = UserSlice.actions;

export default UserSlice.reducer;