import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, getUserById } from "@/api/fetchUsers";
import { User, UserDetails, UsersState } from "@/types/types";

const initialState: UsersState = {
  data: [],
  selectedUser: null,
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    return await getUsers();
  }
);

export const fetchUserById = createAsyncThunk<UserDetails, number>(
  'users/fetchUserById',
  async (id) => {
    return await getUserById(id);
  } 
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder

    .addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка загрузки';
    })

    .addCase(fetchUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.selectedUser = null;
    })
    .addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedUser = action.payload;
    })
    .addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Пользователь не найден';
    });
  },
});

export const { clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;