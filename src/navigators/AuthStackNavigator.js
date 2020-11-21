import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ChangePasswordScreen,
  ForgetPasswordScreen,
  LoginScreen,
  PaymentScreen,
  ProfileScreen,
} from '../screens';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '@assets/colors';
import {Text} from '@components';
import * as NavigatorServices from './NavigatorServices';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name={'LoginStack'}>
        {() => (
          <LoginStack.Navigator>
            <LoginStack.Screen
              options={{
                headerShown: false,
              }}
              name={'Login'}
              component={LoginScreen}
            />
            <LoginStack.Screen
              name="ForgetPassword"
              component={ForgetPasswordScreen}
              options={{
                headerTitleAlign: 'center',
                headerTitle: (
                  <Text style={styles.titleScreen}>Quên mật khẩu</Text>
                ),
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => NavigatorServices.goBack()}
                    style={styles.buttonBack}>
                    <Ionicons
                      name="ios-arrow-back"
                      size={25}
                      color={Colors.WHITE}
                    />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: Colors.PRIMARY,
                  shadowColor: 'transparent',
                },
              }}
            />
            <LoginStack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
              options={{
                headerTitleAlign: 'center',
                headerTitle: (
                  <Text style={styles.titleScreen}>Đổi mật khẩu</Text>
                ),
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => NavigatorServices.goBack()}
                    style={styles.buttonBack}>
                    <Ionicons
                      name="ios-arrow-back"
                      size={25}
                      color={Colors.WHITE}
                    />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: Colors.PRIMARY,
                  shadowColor: 'transparent',
                },
              }}
            />
          </LoginStack.Navigator>
        )}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
}

const styles = StyleSheet.create({
  buttonBack: {
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  labelBack: {
    color: 'white',
    fontSize: 18,
  },
  titleScreen: {color: 'white', fontSize: 18},
});
