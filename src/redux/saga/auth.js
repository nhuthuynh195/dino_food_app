import {put, takeLatest, all, delay} from 'redux-saga/effects';
import {requestAPI} from '@utils/func';

function* login(action) {
  try {
    yield put({
      type: 'SHOW_LOADING',
    });
    const response = yield requestAPI(action);
    console.log('response', response);

    if (response.success) {
      yield put({
        type: 'SAVE_PROFILE_LOCAL',
        payload: {
          profile: response,
          headers: response.headers,
        },
      });
      yield put({...action, type: 'LOGIN_APP_SUCCESS', payload: response});
      yield put({...action, type: 'GET_PROFILE_SUCCESS', payload: response});
    } else {
      yield put({...action, type: 'LOGIN_APP_FAIL', payload: response});
    }
  } catch (error) {
    console.log('error login saga: ', error);
    yield put({
      ...action,
      type: 'LOGIN_APP_FAIL',
      payload: {
        error: error,
      },
    });
  } finally {
    yield put({
      type: 'HIDE_LOADING',
    });
  }
}
function* register(action) {
  try {
    yield put({
      type: 'SHOW_LOADING',
    });
    const response = yield requestAPI(action);
    yield put({...action, type: 'REGISTER_SUCCESS', payload: response});
  } catch (error) {
    console.log('error: ', error);
  } finally {
    yield put({
      type: 'HIDE_LOADING',
    });
  }
}
function* getProfile(action) {
  console.log('action', action);
  try {
    const response = yield requestAPI(action);
    console.log('response', response);

    if (response.statusCode === 401) {
      yield put({
        type: 'APP_LOGOUT',
        payload: {},
      });
    } else {
      yield put({...action, type: 'GET_PROFILE_SUCCESS', payload: response});
    }
  } catch (error) {
    console.log('error: ', error);
  }
}
function* logout(action) {
  try {
    const response = yield requestAPI(action);
    console.log('response', response);
    console.log('action', action);
    yield put({
      type: 'APP_LOGOUT',
      payload: {},
    });
  } catch (error) {}
}
function* forgetPassword(action) {
  try {
    yield put({
      type: 'SHOW_LOADING',
    });
    const response = yield requestAPI(action);
    yield put({
      ...action,
      type: 'FORGET_PASSWORD_SUCCESS',
      payload: response,
    });
  } catch (error) {
    console.log('error', error);
  } finally {
    yield put({
      type: 'HIDE_LOADING',
    });
  }
}
function* changePassword(action) {
  try {
    yield put({
      type: 'SHOW_LOADING',
    });
    const response = yield requestAPI(action);
    yield put({
      ...action,
      type: 'CHANGE_PASSWORD_SUCCESS',
      payload: response,
    });
  } catch (error) {
    console.log('error', error);
  } finally {
    yield put({
      type: 'HIDE_LOADING',
    });
  }
}

export default function* saga() {
  yield all([
    takeLatest('LOGIN_APP', login),
    takeLatest('REGISTER', register),
    takeLatest('LOGOUT_APP', logout),
    takeLatest('GET_PROFILE', getProfile),
    takeLatest('FORGET_PASSWORD', forgetPassword),
    takeLatest('CHANGE_PASSWORD', changePassword),
  ]);
}
