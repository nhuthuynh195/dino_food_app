import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import AppNavigator from './src/navigators/AppNavigator';
import configureStore from '@redux/store';
import NavigatorServices from './src/navigators/NavigatorServices';
console.disableYellowBox = true;
import {Loading} from '@components';
import {AlertProvider} from '@components/Alert';
import {NotiProvider} from '@components/NotificationError';

function App() {
  const {persistor, store} = configureStore();
  return (
    <Provider store={store}>
      <AlertProvider>
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
      </AlertProvider>
    </Provider>
  );
}
export default App;
