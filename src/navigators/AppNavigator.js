import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import connectRedux from '@redux/connectRedux';
import {checkAllArrayIsNotEmpty} from '@utils/func';
import React from 'react';
import 'react-native-gesture-handler';
import {AuthStackNavigator} from './AuthStackNavigator';
import {MainStackNavigator} from './MainStackNavigator';
import * as NavigatorServices from './NavigatorServices';
const RootStack = createStackNavigator();
function renderScreens(isSignedUp) {
  return isSignedUp ? (
    <RootStack.Screen name="Main">
      {() => <MainStackNavigator />}
    </RootStack.Screen>
  ) : (
    <RootStack.Screen name="Login">
      {() => <AuthStackNavigator />}
    </RootStack.Screen>
  );
}

function AppNavigator(props) {
  const {profile} = props;
  let isSignedUp = checkAllArrayIsNotEmpty(profile) ? true : false;
  return (
    <NavigationContainer ref={NavigatorServices.navigationRef}>
      <RootStack.Navigator
        mode="modal"
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        {renderScreens(isSignedUp)}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = state => ({
  profile: state.dataLocal.profile,
});

export default connectRedux(mapStateToProps, AppNavigator);
