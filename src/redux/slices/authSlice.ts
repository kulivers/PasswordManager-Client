import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, TokenResponse } from '../../types';

const initialState: AuthState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
  userName: null,
  passWord: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchAccessToken: (_state, _action: PayloadAction<LoginCredentials>) => {
      // Handled by saga
    },
    refreshTokensAction: () => {
      // Handled by saga
    },
    signOut: (state) => {
      state.isAuth = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.userName = null;
      state.passWord = null;
    },
    authorizeSuccess: (state, action: PayloadAction<TokenResponse>) => {
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    authorizeFailure: (state) => {
      state.isAuth = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const {
  fetchAccessToken,
  refreshTokensAction,
  signOut,
  authorizeSuccess,
  authorizeFailure,
} = authSlice.actions;

export default authSlice.reducer;

