import * as React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import AppNavigator from '@navigators/AppNavigator';
import configureStore from '@redux/store';
import NavigatorServices from '@navigators/NavigatorServices';
import {Loading} from '@components';
import {AlertConfirm} from '@components/AlertConfirm';
import {NotiProvider} from '@components/NotificationError';

function App() {
  const {persistor, store} = configureStore();
  return (
    <Provider store={store}>
      <AlertConfirm>
        <NotiProvider>
          <PersistGate loading={<View />} persistor={persistor}>
            <AppNavigator
              ref={navigatorRef => {
                NavigatorServices.setContainer(navigatorRef);
              }}
            />
            <Loading />
          </PersistGate>
        </NotiProvider>
      </AlertConfirm>
    </Provider>
  );
}
export default App;
console.disableYellowBox = true;
