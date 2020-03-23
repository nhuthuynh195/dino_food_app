import {createStackNavigator} from 'react-navigation-stack';
import {
  LoginScreen,
  ForgetPasswordScreen,
  ChangePasswordScreen,
} from '../screens';
export default createStackNavigator(
  {
    Login: LoginScreen,
    ForgetPassword: ForgetPasswordScreen,
    ChangePassword: ChangePasswordScreen,
  },
  {
    initialRouteName: 'Login',
  },
);
