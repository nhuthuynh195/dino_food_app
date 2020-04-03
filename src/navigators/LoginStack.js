import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Text} from '@components';
import {createStackNavigator} from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '@assets/colors';
import NavigatorServices from '@navigators/NavigatorServices';

import {
  LoginScreen,
  ForgetPasswordScreen,
  ChangePasswordScreen,
  RegisterScreen,
} from '../screens';
const styles = StyleSheet.create({
  buttonBack: {
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelBack: {
    color: 'white',
    fontSize: 18,
  },
  titleScreen: {color: 'white', fontSize: 18},
});
export default createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen,
      navigationOptions: {
        headerTitleAlign: 'center',
        headerTitle: <Text style={styles.titleScreen}>Quên mật khẩu</Text>,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => NavigatorServices.back()}
            style={styles.buttonBack}>
            <Ionicons name="ios-arrow-back" size={25} color={Colors.WHITE} />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.labelBack}>Quay lại</Text>
            </View>
          </TouchableOpacity>
        ),
        headerTransparent: true,
      },
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
      navigationOptions: {
        headerTitleAlign: 'center',
        headerTitle: <Text style={styles.titleScreen}>Đổi mật khẩu</Text>,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => NavigatorServices.back()}
            style={styles.buttonBack}>
            <Ionicons name="ios-arrow-back" size={25} color={Colors.WHITE} />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.labelBack}>Quay lại</Text>
            </View>
          </TouchableOpacity>
        ),
        headerTransparent: true,
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerTitleAlign: 'center',
        headerTitle: <Text style={styles.titleScreen}>Đăng ký</Text>,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => NavigatorServices.back()}
            style={styles.buttonBack}>
            <Ionicons name="ios-arrow-back" size={25} color={Colors.WHITE} />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.labelBack}>Quay lại</Text>
            </View>
          </TouchableOpacity>
        ),
        headerTransparent: true,
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);
