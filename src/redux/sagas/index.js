import { fork } from "redux-saga/effects";
import { registerUserFlowSaga } from "./registration";

export default function* () {
  yield fork(registerUserFlowSaga);
}
