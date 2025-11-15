import { call, takeEvery, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import { RegistrationFormData, ApiError } from '../../types';
import { AxiosResponse } from 'axios';

export function* registerUserFlowSaga() {
  yield takeEvery('registration/registerUser', registerUserFlow);
  yield takeEvery('registration/registerUserSuccess', registerUserSuccessFlow);
  yield takeEvery('registration/registerUserFailure', registerUserFailureFlow);
}

function* registerUserFlow(action: PayloadAction<RegistrationFormData>) {
  try {
    const data: AxiosResponse = yield call(api.post, '/registration', action.payload);
    console.log('registerUserFlow no ex, data:', data);
    if (data.status !== 401) {
      yield put({ type: 'registration/registerUserSuccess', payload: data });
    } else {
      throw new Error('Something went wrong in registerUserFlow');
    }
  } catch (e: unknown) {
    console.log('registerUserFlow catch', e);
    if (e && typeof e === 'object' && 'response' in e) {
      const error = e as { response: { data: ApiError } };
      const errors = error.response.data.Errors.map((err) => err.Description);
      yield put({ type: 'registration/registerUserFailure', payload: errors });
    } else {
      yield put({ type: 'registration/registerUserFailure', payload: ['Unknown error occurred'] });
    }
  }
}

// eslint-disable-next-line require-yield
function* registerUserSuccessFlow() {
  console.log('registerUserSuccessFlow');
}

// eslint-disable-next-line require-yield
function* registerUserFailureFlow() {
  console.log('registerUserFailureFlow');
}

