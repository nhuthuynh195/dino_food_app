import {Loading} from '@components';
import {AlertConfirm} from '@components/AlertConfirm';
import {NotiProvider} from '@components/NotificationError';
import AppNavigator from '@navigators/AppNavigator';
import configureStore from '@redux/store';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
function App() {
  const {persistor, store} = configureStore();
  return (
    <Provider store={store}>
      <AlertConfirm>
        <NotiProvider>
          <PersistGate loading={null} persistor={persistor}>
            <AppNavigator />
            <Loading />
          </PersistGate>
        </NotiProvider>
      </AlertConfirm>
    </Provider>
  );
}
export default App;
console.disableYellowBox = true;
