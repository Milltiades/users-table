
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
    street:string
  }
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
      state.editingUserId = action.payload; 
    },
    cancelEditUser: (state) => {
      state.editingUserId = null; 
    },
   

    submitEditUser: (state, action: PayloadAction<{ id: number; updatedUser: User }>) => {
      const { id, updatedUser } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = updatedUser; 
        state.editingUserId = null; 
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
