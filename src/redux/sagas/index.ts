import { fork } from 'redux-saga/effects';
import { registerUserFlowSaga } from './registrationSagas';
import { registrationSagaFlow } from './registrationSaga';

export default function* rootSaga() {
  yield fork(registerUserFlowSaga);
  yield fork(registrationSagaFlow);
}

