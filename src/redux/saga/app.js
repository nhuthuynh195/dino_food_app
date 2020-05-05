import {put, takeLatest, all, call} from 'redux-saga/effects';
import {requestAPI} from '@utils/func';
import apiConfigs from '@configs/api';

function* checkBalance(action) {
  try {
    const response = yield requestAPI(action);
    console.log('checkBalance', response);
    yield put({...action, type: 'CHECK_BALANCE_SUCCESS', payload: response});
  } catch (error) {
    console.log('error saga app: ', error);
  }
}

function* getStores(action) {
  try {
    const response = yield requestAPI(action);
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
    console.log('requestPayment', response);
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
function* createrOrder(action) {
  try {
    // yield put({
    //   type: 'SHOW_LOADING',
    // });
    const response = yield requestAPI(action.createOrder);
    if (response.statusCode == 200) {
      yield put({
        ...action,
        type: 'CREATE_ORDER_SUCCESS',
        payload: response,
      });
      yield call(
        updateOrderDetail,
        (actions = {
          getOrderDetail: {
            method: 'GET',
            api: `${apiConfigs.BASE_API}/orders/${response._id}`,
            token: true,
          },
          updateOrderDetail: {
            method: action.updateOrderDetail.method,
            api: `${apiConfigs.BASE_API}/orders/${response._id}`,
            token: action.updateOrderDetail.token,
            body: action.updateOrderDetail.body,
          },
        }),
      );
    } else {
      yield put({
        ...action,
        type: 'CREATE_ORDER_FAIL',
      });
    }
  } catch (error) {
    console.log('error saga app: ', error);
  } finally {
    // yield put({
    //   type: 'HIDE_LOADING',
    // });
  }
}
function* updateOrderDetail(action) {
  try {
    const response = yield requestAPI(action.updateOrderDetail);
    if (response.statusCode == 200) {
      yield call(getOrderDetail, action.getOrderDetail);
    }
  } catch (error) {
    console.log('error saga app: ', error);
  } finally {
  }
}
function* getOrderDetail(action) {
  try {
    yield put({
      type: 'SHOW_LOADING',
    });
    const response = yield requestAPI(action);
    console.log('response', response);
    yield put({
      ...action,
      type: 'GET_ORDER_DETAIL_SUCCESS',
      payload: response,
    });
  } catch (error) {
    console.log('error saga app: ', error);
  } finally {
    yield put({
      type: 'HIDE_LOADING',
    });
  }
}
function* confirmOrder(action) {
  try {
    yield put({
      type: 'SHOW_LOADING',
    });
    const response = yield requestAPI(action);
    console.log('confirmOrder', response);
    yield put({
      ...action,
      type: 'CONFIRM_ORDER_SUCCESS',
      payload: response,
    });
  } catch (error) {
    console.log('error saga app: ', error);
  } finally {
    yield put({
      type: 'HIDE_LOADING',
    });
  }
}
function* getListOrder(action) {
  try {
    const response = yield requestAPI(action);
    yield put({
      ...action,
      type: 'GET_LIST_ORDER_SUCCESS',
      payload: response,
    });
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
    takeLatest('GET_STORES', getStores),
    takeLatest('GET_STORE_BY_ID', getStoresById),
    takeLatest('REQUEST_PAYMENT', requestPayment),
    takeLatest('CREATE_ORDER', createrOrder),
    takeLatest('UPDATE_ORDER', updateOrderDetail),
    takeLatest('GET_LIST_ORDER', getListOrder),
    takeLatest('GET_ORDER_DETAIL', getOrderDetail),
    takeLatest('CONFIRM_ORDER', confirmOrder),
  ]);
}
