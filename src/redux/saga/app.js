import {put, takeLatest, all, delay} from 'redux-saga/effects';
import {requestAPI} from '@utils/func';

function* checkBalance(action) {
  try {
    const response = yield requestAPI(action);
    yield put({...action, type: 'CHECK_BALANCE_SUCCESS', payload: response});
  } catch (error) {
    console.log('error saga app: ', error);
  }
}

function* getStores(action) {
  try {
    yield put({
      type: 'SHOW_LOADING',
    });
    const response = yield requestAPI(action);
    console.log('response', response);
    yield put({...action, type: 'GET_STORES_SUCCESS', payload: response});
  } catch (error) {
    console.log('error saga app: ', error);
  } finally {
    yield put({
      type: 'HIDE_LOADING',
    });
  }
}
function* getStoresById(action) {
  try {
    yield put({
      type: 'SHOW_LOADING',
    });
    const response = yield requestAPI(action);
    yield put({...action, type: 'GET_STORE_BY_ID_SUCCESS', payload: response});
  } catch (error) {
    console.log('error saga app: ', error);
  } finally {
    yield put({
      type: 'HIDE_LOADING',
    });
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
      });
    } else {
      yield put({
        ...action,
        type: 'REQUEST_PAYMENT_FAIL',
      });
    }
  } catch (error) {
    console.log('error saga app: ', error);
  } finally {
    console.log('run finally');

    yield put({
      type: 'HIDE_LOADING',
    });
  }
}
export default function* saga() {
  yield all([
    takeLatest('CHECK_BALANCE', checkBalance),
    takeLatest('GET_STORES', getStores),
    takeLatest('GET_STORE_BY_ID', getStoresById),
    takeLatest('REQUEST_PAYMENT', requestPayment),
  ]);
}