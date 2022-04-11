import { call, takeEvery, put } from "redux-saga/effects";

import {
  registerUser,
  registerUserSuccess,
  registerUserFailure,
} from "../actionCreators";
import api from "../../api";

export function* registerUserFlowSaga() {
  yield takeEvery(registerUser, registerUserFlow);
  yield takeEvery(registerUserSuccess, registerUserSuccessFlow);
  yield takeEvery(registerUserFailure, registerUserFailureFlow);
}

function* registerUserFlow({ payload }) {
  try {
    const data = yield call(api.post, "/registration", payload);
    yield put(registerUserSuccess(data));
  } catch (e) {
    const errors = e.response.data.Errors.map((err) => err.Description);
    yield put(registerUserFailure(errors));
  }
}

function* registerUserSuccessFlow(data) {
  // console.log("registerUserSuccessFlow");
}

function* registerUserFailureFlow(errors) {
  // console.log("registerUserFailureFlow");
}

// export function* loginFlowSaga() {
//   yield takeEvery(fetchAccessToken, loginFlow);
// }
//
// export function* loginFlow(action) {
//   let username = action.payload;
//   const isAuth = yield call(apiLogin, username);
//   isAuth ? yield put(authorizeSuccess) : yield put(authorizeFailure);
// }
//
// export function* loginFlow(action) {
//   let username = action.payload;
//   const isAuth = yield call(apiLogin, username);
//   isAuth ? yield put(authorizeSuccess) : yield put(authorizeFailure);
// }

// export function* logoutFlowSaga(username) {
//   yield takeEvery(signOut, signOutFlow);
// }
//
// function* signOutFlow(action) {
//   yield call(apiSignOut);
//   // console.log(apiIsUserLoggedIn());
//   if (apiIsUserLoggedIn()) {
//     yield put(authoritizeFailture());
//   }
// }
//
// export function* getAccountsSaga() {
//   yield takeEvery(getUsersRequest, getUsersFlow);
// }
//
// function* getUsersFlow(action) {
//   let users = yield call(apiFetchUsers);
//   // console.log(users);
//   if (users) {
//     yield put(getUsersSuccess(users));
//   } else {
//     yield put(getUsersFailture());
//   }
// }
//
// export const functionName = (params) => true;
