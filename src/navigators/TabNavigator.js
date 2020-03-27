import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {
  HomeScreen,
  ProfileScreen,
  HistoryScreen,
  NotificationScreen,
} from '../screens';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconWithBadge from './IconWithBadge';
import Colors from '@assets/colors';
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
  },
);
const HistoryStack = createStackNavigator(
  {
    History: HistoryScreen,
  },
  {
    initialRouteName: 'History',
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
        tabBarLabel: 'Trang chủ',
      },
    },
    History: {
      screen: HistoryStack,
      navigationOptions: {
        tabBarLabel: 'Lịch sử',
      },
    },
    Notification: {
      screen: NotificationStack,
      navigationOptions: {
        tabBarLabel: 'Thông báo',
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Tài khoản',
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
          iconName = 'ios-home';
        } else if (routeName === 'History') {
          iconName = 'ios-time';
        } else if (routeName === 'Notification') {
          iconName = 'ios-notifications';
          IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Profile') {
          iconName = 'ios-contact';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.BUTTON,
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(TabNavigator);
