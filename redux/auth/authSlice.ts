import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/auth';

type AuthState = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

type CredentialsPayload = {
  user: User;
  token: string;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<CredentialsPayload>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },

    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    setRefreshing(state, action: PayloadAction<boolean>) {
      state.isRefreshing = action.payload;
    },

    clearAuth(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
    },
  },
});

export const { setCredentials, updateUser, setRefreshing, clearAuth } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
