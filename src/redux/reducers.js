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
    updateAccount, stopShowAlerts,
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
        userData: {},
        isSuccess: false,
        errors: [],
        loadingState: {
            isLoading: false,
            isLoaded: false
        },
        showAllerts: false
    },
};

const registration = handleActions(
    {
        [registerUser.toString()]: (state, action) => {
            return {...state, userData: action.payload, loadingState: {isLoading: true, isLoaded: false}};
        },
        [stopShowAlerts.toString()]: (state, action) => {
            return {...state, showAllerts:false}
        },
        [registerUserSuccess.toString()]: (state, action) => {
            console.log('registerUserSuccess reducer')
            return {...state, isSuccess: true, loadingState: {isLoading: false, isLoaded: true}, showAllerts:true};
        },
        [registerUserFailure.toString()]: (state, action) => {
            return {
                ...state,
                errors: action.payload,
                isSuccess: false,
                loadingState: {isLoading: false, isLoaded: true},
                showAllerts:true
            };
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
