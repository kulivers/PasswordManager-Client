import { call, takeEvery, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  registerUser,
  registerUserSuccess,
  registerUserFailure,
} from '../slices/registrationSlice';
import api from '../../api';
import { RegistrationFormData, ApiError } from '../../types';
import { AxiosResponse } from 'axios';

export function* registerUserFlowSaga() {
  yield takeEvery(registerUser.type, registerUserFlow);
  yield takeEvery(registerUserSuccess.type, registerUserSuccessFlow);
  yield takeEvery(registerUserFailure.type, registerUserFailureFlow);
}

function* registerUserFlow(action: PayloadAction<RegistrationFormData>) {
  try {
    const data: AxiosResponse = yield call(api.post, '/registration', action.payload);
    console.log('registerUserFlow no ex, data:', data);
    if (data.status !== 401) {
      yield put(registerUserSuccess(data));
    } else {
      throw new Error('Something went wrong in registerUserFlow');
    }
  } catch (e: unknown) {
    console.log('registerUserFlow catch', e);
    if (e && typeof e === 'object' && 'response' in e) {
      const error = e as { response: { data: ApiError } };
      const errors = error.response.data.Errors.map((err) => err.Description);
      yield put(registerUserFailure(errors));
    } else {
      yield put(registerUserFailure(['Unknown error occurred']));
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

