import Colors from '@assets/colors';
import {Text} from '@components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import connectRedux from '@redux/connectRedux';
import {formatDay, formatNumber} from '@utils/func';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

function index(props) {
  const Tab = createMaterialTopTabNavigator();
  useEffect(() => {
    const {profile} = props;
    let email = profile.user.email;
    let page = 1;
    let limit = 100;
    props.actions.app.checkBalance(page, limit, email);
  }, []);

  function renderItem({item, index}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          paddingVertical: 20,
          paddingHorizontal: 16,
          borderBottomColor: '#F7F7F7',
          alignItems: 'center',
          backgroundColor: Colors.WHITE,
        }}>
        <View style={{flex: 1}}>
          <Text>{formatDay(item.createdAt)}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>
            {item.type == 'income'
              ? '+' + formatNumber(item.amount)
              : '-' + formatNumber(item.amount)}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text numberOfLines={1}>{item.description}</Text>
        </View>
      </View>
    );
  }
  function Balance() {
    return (
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 10}}
        data={props.listBalance}
        renderItem={(item, index) => renderItem(item, index)}
      />
    );
  }
  function Payment() {
    return (
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 10}}
        data={props.listBalance}
        renderItem={(item, index) => renderItem(item, index)}
      />
    );
  }
  return (
    <Tab.Navigator>
      <Tab.Screen name="Balance" component={Balance} />
      <Tab.Screen name="Payment" component={Payment} />
    </Tab.Navigator>
  );
}
const mapStateToProps = state => ({
  profile: state.dataLocal.profile,
  listBalance: state.app.listBalance,
});

export default connectRedux(mapStateToProps, index);
