// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   loading: false,
//   users: 'giga',
//   error: "",
// };

// export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
//   return axios
//     .get("https://jsonplaceholder.typicode.com/users")
//     .then((response) => response.data);
// });

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

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     users: []
//   },
//   reducers: {
//     setDataUser: (state, action) => {
//       state.users = action.payload
//     }
//   },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUsers.pending, (state: any) => {
  //     state.loading = true;
  //   });
  //   builder.addCase(fetchUsers.fulfilled, (state: any, action:any) => {
  //     state.loading = false;
  //     state.users = action.payload;
  //     state.error = "";
  //   });
  //   builder.addCase(fetchUsers.rejected, (state: any, action:any) => {
  //     state.loading = false;
  //     state.users = [];
  //     state.error = action.error.message;
  //   });
  // },
// });


// export const { setDataUser } = userSlice.actions

// export default userSlice.reducer;

//


// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   city:string;
//   address:string;
// }

// export const fetchUsers = createAsyncThunk<User[]>('user/fetchUsers', async () => {
//   try {
//     const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// });

// interface UserState {
//   users: User[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: UserState = {
//   users: [],
//   status: 'idle',
//   error: null,
// };

// const userSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {
//     addUser: (state, action: PayloadAction<User>) => {
//       state.users.push(action.payload);
//     },
//     editUser: (state, action: PayloadAction<{ id: number; updatedUser: User }>) => {
//       const { id, updatedUser } = action.payload;
//       const userIndex = state.users.findIndex(user => user.id === id);
//       if (userIndex !== -1) {
//         state.users[userIndex] = updatedUser;
//       }
//     },
//     deleteUser: (state, action: PayloadAction<number>) => {
//       const userId = action.payload;
//       state.users = state.users.filter(user => user.id !== userId);
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchUsers.pending, state => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state:any, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addUser, editUser, deleteUser } = userSlice.actions;
// export default userSlice.reducer;


// userSlice.ts (Redux slice)
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const fetchUsers = createAsyncThunk<User[]>('user/fetchUsers', async () => {
  try {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    return response.data;
  } catch (error) {
    throw error;
  }
});

interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  editingUserId: number | null; // Add a field to track the user being edited
}

const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null,
  editingUserId: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    startEditUser: (state, action: PayloadAction<number>) => {
      state.editingUserId = action.payload; // Set the ID of the user being edited
    },
    cancelEditUser: (state) => {
      state.editingUserId = null; // Clear the editing user ID
    },
    submitEditUser: (state, action: PayloadAction<{ id: number; updatedUser: User }>) => {
      const { id, updatedUser } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = updatedUser; // Update the user in the array
        state.editingUserId = null; // Clear the editing user ID
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addUser, startEditUser, cancelEditUser, submitEditUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
