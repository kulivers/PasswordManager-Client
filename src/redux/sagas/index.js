import { fork } from "redux-saga/effects";
import { registerUserFlowSaga } from "./registrationSagas";

export default function* () {
  yield fork(registerUserFlowSaga);
}
