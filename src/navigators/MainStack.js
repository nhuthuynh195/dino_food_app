import {createStackNavigator} from 'react-navigation-stack';
import {PaymentScreen, StoreScreen, OrderListScreen} from '../screens';
import TabNavigator from './TabNavigator';

export default Main = createStackNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
    Payment: {
      screen: PaymentScreen,
      navigationOptions: {},
    },
    Store: {
      screen: StoreScreen,
      params: {idStore: '', idOrder: ''},
      navigationOptions: {},
    },
    OrderList: OrderListScreen,
  },
  {
    initialRouteName: 'TabNavigator',
  },
);
