import { createActions, createAction } from "redux-actions";
// export const incCounter = createAction('INCREMENT_COUNTER');
// export const decCounter = createAction('DECREMENT_COUNTER');
export const addAccount = createAction("ADD_ACCOUNT"); //same as createAction(TYPES.DECREMENT_COUNTER, payload => payload );
// export const deleteWord = createAction(TYPES.DELETE_WORD);

// const rootActionCreator = createActions({
//   ACCOUNTS: {
//     // GET_ACCOUNTS: null,
//     ADD_ACCOUNT: null,
//     // DELETE_ACCOUNT: null,
//     // UPDATE_ACCOUNT: null,
//   },
//   // USER_IDENTITY_ACTIONS: {
//   //   RESET_PASSWORD_REQUEST: null,
//   //   RESET_PASSWORD: null,
//   //   CONFIRM_EMAIL_REQUEST: null,
//   //   CONFIRM_EMAIL: null,
//   // },
// });
//
// export const {
//   //   // AUTH: {
//   //   //   TOKEN: { GET_USER_TOKEN: getUserToken, REFRESH_TOKEN: refreshToken },
//   //   //   REGISTRATION: { REGISTER_USER: refreshUser },
//   //   // },
//   ACCOUNTS: {
//     //     // GET_ACCOUNTS: getAccounts,
//     ADD_ACCOUNT: addAccount,
//     //     // DELETE_ACCOUNT: deleteAccount,
//     //     // UPDATE_ACCOUNT: updateAccount,
//   },
//   //   // USER_IDENTITY_ACTIONS: {
//   //   //   RESET_PASSWORD_REQUEST: resetPasswordRequest,
//   //   //   RESET_PASSWORD: resetPassword,
//   //   //   CONFIRM_EMAIL_REQUEST: confirmEmailRequest,
//   //   //   CONFIRM_EMAIL: confirmEmail,
//   //    },
// } = rootActionCreator;
