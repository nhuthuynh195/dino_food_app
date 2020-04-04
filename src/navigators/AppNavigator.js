import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginStack from './LoginStack';
import MainStack, {PaymentStack} from './MainStack';
import {SplashScreen} from '../screens';
export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashScreen,
      Login: LoginStack,
      Main: MainStack,
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);
