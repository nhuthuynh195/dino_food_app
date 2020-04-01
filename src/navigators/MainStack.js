import {createStackNavigator} from 'react-navigation-stack';
import {PaymentScreen, StoreScreen, OrderListScreen} from '../screens';
import TabNavigator from './TabNavigator';

export default Main = createStackNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        title: '',
        headerShown: false,
      },
    },
    Payment: {
      screen: PaymentScreen,
      navigationOptions: {},
    },
    Store: {
      screen: StoreScreen,
      navigationOptions: {},
    },
    // Store: StoreScreen,
    OrderList: OrderListScreen,
  },
  {
    initialRouteName: 'TabNavigator',
  },
);
