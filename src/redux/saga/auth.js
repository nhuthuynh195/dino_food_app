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
function* getProfile(action) {
  try {
    // yield delay(5000);
    const response = yield requestAPI(action);
    yield put({...action, type: 'GET_PROFILE_SUCCESS', payload: response});
  } catch (error) {
    console.log('error: ', error);
  }
}
// function* changePassword(action) {
//   try {
//     const response = yield requestAPI(action);
//     // console.log("askjaskdjasdlkasjdklasd", response);
//     if (response.success) {
//       yield put({
//         ...action,
//         type: 'CHANGE_PASSWORD_SUCCESS',
//         payload: response,
//       });
//     } else {
//       yield put({...action, type: 'CHANGE_PASSWORD_FAIL', payload: response});
//     }
//   } catch (error) {}
// }

function* logout(action) {
  try {
    const response = yield requestAPI(action);
    console.log('response logout', response);
    yield put({
      type: 'APP_LOGOUT',
      payload: {},
    });
    // if (response.success) {
    //   yield put({...action, type: 'LOGOUT_APP_SUCCESS'});
    // } else {
    //   yield put({...action, type: 'LOGOUT_APP_FAIL'});
    // }
  } catch (error) {}
}

// function* updateEndPoint(action) {
//   try {
//     const response = yield requestAPI(action);
//     if (response.data.status === 200) {
//       yield put({...action, type: 'UPDATE_ENDPOINT_NOTIFICAITON_SUCCESS'});
//     } else {
//       yield put({...action, type: 'UPDATE_ENDPOINT_NOTIFICAITON_FAIL'});
//     }
//   } catch (error) {}
// }

export default function* saga() {
  yield all([
    takeLatest('LOGIN_APP', login),
    // takeLatest('CHANGE_PASSWORD', changePassword),
    takeLatest('LOGOUT_APP', logout),
    takeLatest('GET_PROFILE', getProfile),

    // takeLatest('UPDATE_ENDPOINT_NOTIFICAITON', updateEndPoint),
  ]);
}
