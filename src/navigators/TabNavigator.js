import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HistoryPaymentScreen, ProfileScreen, PaymentScreen} from '../screens';
import Colors from '@assets/colors';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import IconWithBadge from './IconWithBadge';
const MainStack = createStackNavigator();

const Tab = AnimatedTabBarNavigator();
function ProfileStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: (
            <Text style={{fontSize: 18, color: Colors.BLACK}}>Tài khoản</Text>
          ),
        }}
      />
    </MainStack.Navigator>
  );
}
function HistoryPaymentStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'HistoryPayment'}
        component={HistoryPaymentScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: (
            <Text style={{fontSize: 18, color: Colors.BLACK}}>Thanh toán</Text>
          ),
        }}
      />
    </MainStack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      appearence={{
        floating: true,
        shadow: true,
      }}
      tabBarOptions={{
        activeTintColor: Colors.PRIMARY,
        inactiveTintColor: Colors.WHITE,
        activeBackgroundColor: Colors.WHITE,
        labelStyle: {
          color: Colors.PRIMARY,
          fontFamily: 'Quicksand-Bold',
        },
        tabStyle: {
          backgroundColor: Colors.BOTTOM_TAB,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={'ios-wallet'} size={24} color={color} />
          ),
        }}
        name="Thanh toán"
        component={HistoryPaymentStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={'ios-contact'} size={24} color={color} />
          ),
        }}
        name="Tài khoản"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}
