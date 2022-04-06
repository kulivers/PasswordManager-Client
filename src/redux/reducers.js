import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { handleAction } from "redux-actions";
import { addAccount } from "./actionCreators";

const initialState = { accounts: [{ login: "sad", password: "boy" }] };

const accountsReducer = handleActions(
  {
    [addAccount.toString()]: (state, action) => {
      // let copy = state.accounts;
      // copy.push(action.payload);
      return { ...state, accounts: [...state.accounts, action.payload] };
    },
  },
  initialState
);

// const countReducer = handleActions(
//   {
//     [increment_counter.toString()]: (state) => ({
//       counter: state.counter + 1,
//     }),
//     [decrement_counter.toString()]: (state) => ({
//       counter: state.counter - 1,
//     }),
//   },
//   initialState
// );
//
// const wordReducer = handleActions(
//   {
//     [add_word.toString()]: (state, { payload }) => {
//       let newWords = state.words.split(" ");
//       newWords.push(payload);
//       newWords = newWords.join(" ");
//       return { ...state, words: newWords };
//     },
//     [delete_word.toString()]: (state) => {
//       let newWords = state.words.split(" ");
//       newWords.pop();
//       newWords = newWords.join(" ");
//       return { ...state, words: newWords };
//     },
//   },
//   initialState
// );

export default combineReducers({
  accountsReducer: accountsReducer,
});
