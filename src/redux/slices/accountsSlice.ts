import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../types';

const initialState: Account[] = [{ login: 'sad', password: 'boy' }];

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    fetchAccounts: () => {
      // Handled by saga
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      state.push(action.payload);
    },
    deleteAccount: (state, action: PayloadAction<string>) => {
      return state.filter((account) => account.id !== action.payload);
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      const index = state.findIndex((acc) => acc.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const {
  fetchAccounts,
  addAccount,
  deleteAccount,
  updateAccount,
} = accountsSlice.actions;

export default accountsSlice.reducer;

