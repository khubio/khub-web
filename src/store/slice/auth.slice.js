import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '@services/auth.service';

export const login = createAsyncThunk(
  'authSlice/login',
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.login(formValue);
      navigate('/');

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    user: null,
    error: '',
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
