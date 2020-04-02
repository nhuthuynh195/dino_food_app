import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Text} from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '@assets/colors';
import NavigatorServices from '@navigators/NavigatorServices';
import {createStackNavigator} from 'react-navigation-stack';
import {PaymentScreen, StoreScreen} from '../screens';
import TabNavigator from './TabNavigator';
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
});
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
      navigationOptions: {
        headerTitle: <Text style={styles.titleScreen}>Thanh toán</Text>,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => NavigatorServices.back()}
            style={styles.buttonBack}>
            <Ionicons name="ios-arrow-back" size={25} color={Colors.BLACK} />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.labelBack}>Quay lại</Text>
            </View>
          </TouchableOpacity>
        ),
      },
    },
    Store: {
      screen: StoreScreen,
      params: {idStore: '', idOrder: ''},
      navigationOptions: {
        headerTitle: <Text style={styles.titleScreen}>Cửa hàng</Text>,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => NavigatorServices.back()}
            style={styles.buttonBack}>
            <Ionicons name="ios-arrow-back" size={25} color={Colors.BLACK} />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.labelBack}>Quay lại</Text>
            </View>
          </TouchableOpacity>
        ),
      },
    },
  },
  {
    initialRouteName: 'TabNavigator',
  },
);
