import Colors from '@assets/colors';
import {Text} from '@components';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HistoryPaymentScreen, HomeScreen, ProfileScreen} from '../screens';
const MainStack = createStackNavigator();

const Tab = AnimatedTabBarNavigator();
function HomeStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
}
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
        dotSize: 'small',
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
            <Ionicons name={'home'} size={24} color={color} />
          ),
        }}
        name="Trang chủ"
        component={HomeStack}
      />
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
            <Ionicons name={'person'} size={24} color={color} />
          ),
        }}
        name="Tài khoản"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}
