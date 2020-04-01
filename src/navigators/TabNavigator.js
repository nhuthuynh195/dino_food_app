import React from 'react';
import {StyleSheet} from 'react-native';
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
        tabBarLabel: ({focused, tintColor}) => {
          return (
            <Text bold={focused ? true : false} focused style={styles.label}>
              {'Trang chủ'}
            </Text>
          );
        },
      },
    },
    History: {
      screen: HistoryStack,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => {
          return (
            <Text bold={focused ? true : false} focused style={styles.label}>
              {'Lịch sử'}
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
        console.log('routeName', routeName);
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'md-home';
        } else if (routeName === 'History') {
          iconName = 'ios-time';
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
