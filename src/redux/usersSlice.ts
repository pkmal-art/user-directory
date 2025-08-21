import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, getUserById } from "@/api/fetchUsers";
import { User, UserDetails, UsersState } from "@/types/types";

const initialState: UsersState = {
  data: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const fetchUsersThunk = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    return await getUsers();
  }
);

export const fetchUserByIdThunk = createAsyncThunk<UserDetails, number>(
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
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка загрузки';
      })

      .addCase(fetchUserByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedUser = null;
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.selectedUser = null;
        state.error = action.error.message ?? 'Пользователь не найден';
      });
  },
});

export const { clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
