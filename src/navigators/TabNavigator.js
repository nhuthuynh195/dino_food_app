import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {
  HomeScreen,
  ProfileScreen,
  HistoryScreen,
  NotificationScreen,
  OrderListScreen,
} from '../screens';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconWithBadge from './IconWithBadge';
import Colors from '@assets/colors';
import {Text, TextInput} from '@components';
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        safeAreaInsets: {top: 0},
        headerStyle: {
          shadowColor: 'transparent',
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);
const OrderListStack = createStackNavigator(
  {
    OrderList: OrderListScreen,
  },
  {
    initialRouteName: 'OrderList',
  },
);
const NotificationStack = createStackNavigator(
  {
    Notification: NotificationScreen,
  },
  {
    initialRouteName: 'Notification',
  },
);
const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Profile',
  },
);

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={0} />;
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => {
          return (
            <Text bold={focused ? true : false} focused style={styles.label}>
              {'Trang chủ'}
            </Text>
          );
        },
      },
    },
    OrderList: {
      screen: OrderListStack,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => {
          return (
            <Text bold={focused ? true : false} focused style={styles.label}>
              {'Đơn hàng'}
            </Text>
          );
        },
      },
    },
    Notification: {
      screen: NotificationStack,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => {
          return (
            <Text bold={focused ? true : false} focused style={styles.label}>
              {'Thông báo'}
            </Text>
          );
        },
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => {
          return (
            <Text bold={focused ? true : false} focused style={styles.label}>
              {'Tài khoản'}
            </Text>
          );
        },
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'md-home';
        } else if (routeName === 'OrderList') {
          iconName = 'ios-list';
        } else if (routeName === 'Notification') {
          iconName = 'ios-notifications';
          IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Profile') {
          iconName = 'ios-contact';
        }
        return <IconComponent name={iconName} size={24} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.BUTTON,
      inactiveTintColor: Colors.WHITE,
      allowFontScaling: false,
      style: {
        borderTopColor: Colors.GRAY_LIGHT,
        backgroundColor: Colors.PRIMARY,
        paddingTop: 5,
      },
    },
  },
);
const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: Colors.WHITE,
  },
});
export default createAppContainer(TabNavigator);
