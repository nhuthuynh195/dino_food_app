import {requestAPI} from '@utils/func';
import {all, put, takeLatest} from 'redux-saga/effects';

function* checkBalance(action) {
  try {
    const response = yield requestAPI(action);
    console.log('checkBalance', response);
    yield put({...action, type: 'CHECK_BALANCE_SUCCESS', payload: response});
  } catch (error) {
    console.log('error saga app: ', error);
  }
}

function* checkTotalAmount(action) {
  try {
    const response = yield requestAPI(action);
    yield put({
      ...action,
      type: 'CHECK_TOTAL_AMOUNT_SUCCESS',
      payload: response,
    });
  } catch (error) {
    console.log('error saga checkTotalAmount: ', error);
  }
}
function* requestPayment(action) {
  try {
    yield put({
      type: 'SHOW_LOADING',
    });
    const response = yield requestAPI(action);
    if (response.statusCode == 200) {
      yield put({
        ...action,
        type: 'REQUEST_PAYMENT_SUCCESS',
        payload: response,
      });
    } else {
      yield put({
        ...action,
        type: 'REQUEST_PAYMENT_FAIL',
        payload: response,
      });
    }
  } catch (error) {
    console.log('error saga app: ', error);
  } finally {
    yield put({
      type: 'HIDE_LOADING',
    });
  }
}

export default function* saga() {
  yield all([
    takeLatest('CHECK_BALANCE', checkBalance),
    takeLatest('REQUEST_PAYMENT', requestPayment),
    takeLatest('CHECK_TOTAL_AMOUNT', checkTotalAmount),
  ]);
}
