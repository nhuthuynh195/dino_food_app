import {createStackNavigator} from 'react-navigation-stack';
import {LoginScreen, ForgetPasswordScreen} from '../screens';
export default createStackNavigator(
  {
    Login: LoginScreen,
    ForgetPassword: ForgetPasswordScreen,
  },
  {
    initialRouteName: 'Login',
  },
);
