import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginStack from './LoginStack';
import MainStack, {PaymentStack} from './MainStack';
import {SplashScreen} from '../screens';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';
const AppNavigator = createAnimatedSwitchNavigator(
  {
    Splash: SplashScreen,
    Login: LoginStack,
    Main: MainStack,
  },
  {
    initialRouteName: 'Splash',
    transition: (
      <Transition.Together>
        <Transition.Out type="fade" durationMs={500} interpolation="easeIn" />
        <Transition.In type="fade" durationMs={500} interpolation="easeOut" />
      </Transition.Together>
    ),
  },
);

export default createAppContainer(AppNavigator);
