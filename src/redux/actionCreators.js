import { createActions, createAction } from "redux-actions";
// export const incCounter = createAction('INCREMENT_COUNTER');
// export const decCounter = createAction('DECREMENT_COUNTER');
// export const addAccount = createAction("ADD_ACCOUNT"); //same as createAction(TYPES.DECREMENT_COUNTER, payload => payload );
// export const deleteWord = createAction(TYPES.DELETE_WORD);

const rootActionCreator = createActions({
  AUTH: {
    AUTHORIZE: {
      FETCH_ACCESS_TOKEN: null,
      REFRESH_TOKENS_ACTION: null,
      SIGN_OUT: null,
      STATUS: {
        AUTHORIZE_SUCCESS: null,
        AUTHORIZE_FAILTURE: null,
      },
    },
    REGISTRATION: {
      REGISTER_USER: null,
      // STATUS: {
      //   REGISTRATION_SUCCESS:null,
      //   REGISTRATION_FAILTURE:null,
      // },
    },
  },

  ACCOUNTS: {
    FETCH_ACCOUNTS: null,
    ADD_ACCOUNT: null,
    DELETE_ACCOUNT: null,
    UPDATE_ACCOUNT: null,
    // STATUS: {
    //   ACCOUNTS_REQUEST_SUCCESS:null,
    //   ACCOUNTS_REQUEST_FAILTURE:null,
    // },
  },
  USER_IDENTITY: {
    RESET_PASSWORD: {
      RESET_PASSWORD_SEND_EMAIL: null,
      RESET_PASSWORD: null,
      // STATUS: {
      //   RESET_PASSWORD_REQUEST_SUCCESS:null,
      //   RESET_PASSWORD_REQUEST_FAILTURE:null,
      // },
    },
    CONFIRM_EMAIL: {
      CONFIRM_EMAIL_SEND_EMAIL: null,
      CONFIRM_EMAIL: null,
      // STATUS: {
      //   CONFIRM_EMAIL_REQUEST_SUCCESS:null,
      //   CONFIRM_EMAIL_REQUEST_FAILTURE:null,
      // },
    },
  },
});

export const {
  auth: {
    authorize: {
      fetchAccessToken,
      refreshTokensAction,
      signOut,
      status: { authorizeSuccess, authorizeFailture },
    },
    registration: {
      registerUser,
      // status: { success, failture },
    },
  },

  accounts: {
    fetchAccounts,
    addAccount,
    deleteAccount,
    updateAccount,
    // status: { success, failture },
  },
  userIdentity: {
    resetPassword: {
      resetPasswordSendEmail,
      resetPassword,
      // status: { success, failture },
    },
    confirmEmail: {
      confirmEmailSendEmail,
      confirmEmail,
      // status: { success, failture },
    },
  },
} = rootActionCreator;
