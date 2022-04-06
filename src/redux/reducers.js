import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  addAccount,
  deleteAccount,
  fetchAccessToken,
  fetchAccounts,
  refreshTokensAction,
  signOut,
  updateAccount,
} from "./actionCreators";

const initialState = {
  auth: {
    isAuth: false,
    accessToken: null,
    refreshToken: null,
  },
  accounts: [{ login: "sad", password: "boy" }],
};

const auth = handleActions(
  {
    [fetchAccessToken.toString()]: (state, action) => null,
    [refreshTokensAction.toString()]: (state, action) => null,
    [signOut.toString()]: (state, action) => null,
  },
  initialState.auth
);
const accounts = handleActions(
  {
    [fetchAccounts.toString()]: (state, action) => {
      return { ...state };
    },
    [addAccount.toString()]: (state, action) => [
      ...state.accounts,
      action.payload,
    ],

    [deleteAccount.toString()]: (state) => null,
    [updateAccount.toString()]: (state, action) => null,
  },
  initialState.accounts
);

export default combineReducers({
  accountsReducer: accounts,
  authReducer: auth,
});
