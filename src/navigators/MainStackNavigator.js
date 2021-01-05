import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ChangePasswordScreen,
  ForgetPasswordScreen,
  LoginScreen,
  RegisterScreen,
  PaymentScreen,
  ProfileScreen,
  HistoryRequestScreen,
  TransferScreen,
} from '../screens';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '@assets/colors';
import {Text} from '@components';
import * as NavigatorServices from './NavigatorServices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabNavigator from './TabNavigator';
const MainStack = createStackNavigator();
export function MainStackNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName="TabNavigator"
      options={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name={'TabNavigator'}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={'Payment'}
        component={PaymentScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: <Text style={styles.titleScreen}>Thanh toán</Text>,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => NavigatorServices.goBack()}
              style={styles.buttonBack}>
              <Ionicons name="ios-arrow-back" size={25} color={Colors.BLACK} />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.labelBack}>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <MainStack.Screen
        name={'HistoryRequest'}
        component={HistoryRequestScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: <Text style={styles.titleScreen}>Lịch sử</Text>,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => NavigatorServices.popToTop()}
              style={styles.buttonBack}>
              <Ionicons name="ios-arrow-back" size={25} color={Colors.BLACK} />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.labelBack}>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <MainStack.Screen
        name={'Transfer'}
        component={TransferScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: <Text style={styles.titleScreen}>Chuyển tiền</Text>,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => NavigatorServices.popToTop()}
              style={styles.buttonBack}>
              <Ionicons name="ios-arrow-back" size={25} color={Colors.BLACK} />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.labelBack}>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </MainStack.Navigator>
  );
}
const styles = StyleSheet.create({
  buttonBack: {
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  labelBack: {
    color: Colors.BLACK,
    fontSize: 18,
  },
  titleScreen: {color: Colors.BLACK, fontSize: 18},
});
