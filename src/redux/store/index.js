import {applyMiddleware, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import sagaRoot from '../saga';

const middleware = createReactNavigationReduxMiddleware(state => state.nav);
const sagaMiddleware = createSagaMiddleware();

const createAppStore = composeWithDevTools(
  applyMiddleware(middleware, sagaMiddleware),
)(createStore);

export default function configureStore() {
  const store = createAppStore(reducers);
  const persistor = persistStore(store);
  sagaMiddleware.run(sagaRoot);
  return {persistor, store};
}
