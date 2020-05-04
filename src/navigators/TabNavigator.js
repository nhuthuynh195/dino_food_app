import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {
  HomeScreen,
  ProfileScreen,
  HistoryPaymentScreen,
  OrderListScreen,
} from '../screens';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconWithBadge from './IconWithBadge';
import Colors from '@assets/colors';
import {View, StyleSheet, Platform} from 'react-native';
import {Text} from '@components';
const styles = StyleSheet.create({
  buttonBack: {
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelBack: {
    color: Colors.BLACK,
    fontSize: 18,
  },
  titleScreen: {color: Colors.BLACK, fontSize: 18},
  label: {
    fontSize: 12,
    color: Colors.WHITE,
  },
});
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);
const OrderListStack = createStackNavigator(
  {
    OrderList: {
      screen: OrderListScreen,
      navigationOptions: {
        headerTitleAlign: 'center',
        headerTitle: (
          <Text style={[styles.titleScreen, {textAlign: 'center'}]}>
            Đơn hàng
          </Text>
        ),
      },
    },
  },
  {
    initialRouteName: 'OrderList',
  },
);
const HistoryPaymentStack = createStackNavigator(
  {
    HistoryPayment: {
      screen: HistoryPaymentScreen,
      navigationOptions: {
        headerTitleAlign: 'center',
        headerTitle: <Text style={styles.titleScreen}>Ví tiền</Text>,
      },
    },
  },
  {
    initialRouteName: 'HistoryPayment',
  },
);
const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerTitleAlign: 'center',
        headerTitle: <Text style={styles.titleScreen}>Tài khoản</Text>,
      },
    },
  },
  {
    initialRouteName: 'Profile',
  },
);

const HomeIconWithBadge = props => {
  return <IconWithBadge {...props} badgeCount={0} />;
};

//bottom tab config
const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => {
          return (
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text bold={focused ? true : false} focused style={styles.label}>
                {'Trang chủ'}
              </Text>
            </View>
          );
        },
      },
    },
    OrderList: {
      screen: OrderListStack,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => {
          return (
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text bold={focused ? true : false} focused style={styles.label}>
                {'Đơn hàng'}
              </Text>
            </View>
          );
        },
      },
    },
    HistoryPayment: {
      screen: HistoryPaymentStack,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => {
          return (
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text bold={focused ? true : false} focused style={styles.label}>
                {'Thanh toán'}
              </Text>
            </View>
          );
        },
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => {
          return (
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text bold={focused ? true : false} focused style={styles.label}>
                {'Tài khoản'}
              </Text>
            </View>
          );
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'md-home';
        } else if (routeName === 'OrderList') {
          iconName = 'ios-list';
        } else if (routeName === 'HistoryPayment') {
          iconName = 'ios-wallet';
          // IconComponent = HomeIconWithBadge;
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
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
);

export default createAppContainer(TabNavigator);
