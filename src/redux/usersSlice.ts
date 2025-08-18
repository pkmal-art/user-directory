import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "@/api/fetchUsers";
import { User, UsersState } from "@/types/types";

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    return await getUsers();
  }
);

const usersSlise = createSlice({
  name: 'users',
  initialState,
  reducers: {},
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
    });
  },
});

export default usersSlise.reducer;