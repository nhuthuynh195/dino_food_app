import {createStackNavigator} from 'react-navigation-stack';
import {
  LoginScreen,
  ForgetPasswordScreen,
  ChangePasswordScreen,
  RegisterScreen,
} from '../screens';
export default createStackNavigator(
  {
    Login: LoginScreen,
    ForgetPassword: ForgetPasswordScreen,
    ChangePassword: ChangePasswordScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
  },
);
