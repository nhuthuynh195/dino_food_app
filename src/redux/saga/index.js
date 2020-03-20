import {all} from 'redux-saga/effects';
import auth from './auth';
import app from './app';

export default function* sagaRoot() {
  yield all([auth(), app()]);
}
