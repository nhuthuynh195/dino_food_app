import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import auth from './auth';
import dataLocal from './dataLocal';
import app from './app';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['dataLocal'],
};

const authPersistConfig = {
  key: 'dataLocal',
  storage: AsyncStorage,
  app,
};

const rootReducer = combineReducers({
  dataLocal: persistReducer(authPersistConfig, dataLocal),
  auth,
  app,
});
export default persistReducer(rootPersistConfig, rootReducer);
