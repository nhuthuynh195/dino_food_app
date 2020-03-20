import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginStack from './LoginStack';
import MainStack, {PaymentStack} from './MainStack';
import {AuthLoadingScreen, StoreScreen} from '../screens';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Login: LoginStack,
      Main: MainStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
