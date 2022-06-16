import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import {
    addAccount,
    authorizeFailure,
    authorizeSuccess,
    deleteAccount,
    fetchAccessToken,
    fetchAccounts,
    refreshTokensAction,
    registerUserSuccess,
    registerUserFailure,
    registerUser,
    signOut,
    updateAccount,
} from "./actionCreators";

const initialState = {
    auth: {
        isAuth: false,
        accessToken: null,
        refreshToken: null,
        userName: null,
        passWord: null,
    },
    accounts: [{login: "sad", password: "boy"}],
    registration: {
        isSuccess: false,
        errors: [],
    },
};

const registration = handleActions(
    {
        [registerUser.toString()]: (state, action) => action.payload,
        [registerUserSuccess.toString()]: (state, action) => {
            console.log('registerUserSuccess reducer')
            return {...state, isSuccess: true};
        },
        [registerUserFailure.toString()]: (state, action) => {
            return {...state, errors: action.payload, isSuccess: false};
        },
    },
    initialState.registration
);

const auth = handleActions(
    {
        [fetchAccessToken.toString()]: (state, action) => null,
        [refreshTokensAction.toString()]: (state, action) => null,
        [signOut.toString()]: (state, action) => null,
        [authorizeSuccess.toString()]: (state, action) => null,
        [authorizeFailure.toString()]: (state, action) => null,
    },
    initialState.auth
);
const accounts = handleActions(
    {
        [fetchAccounts.toString()]: (state, action) => null,
        [addAccount.toString()]: (state, action) => [...state, action.payload],
        [deleteAccount.toString()]: (state) => null,
        [updateAccount.toString()]: (state, action) => null,
    },
    initialState.accounts
);

export default combineReducers({
    registration: registration,
    auth: auth,
    accounts: accounts,
});
