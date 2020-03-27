import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import connectRedux from '@redux/connectRedux';
import Colors from '@assets/colors';
import images from '@resources/images';
import {width, height} from '@configs/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigatorServices from '@navigators/NavigatorServices';

index.navigationOptions = {
  title: '',
  headerTitle: <Text style={{color: Colors.BLACK, fontSize: 18}}></Text>,
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => NavigatorServices.back()}
      style={{
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Ionicons name={'ios-arrow-back'} size={25} color={Colors.BLACK} />
      <View style={{paddingLeft: 10}}>
        <Text style={{color: Colors.BLACK, fontSize: 18}}>Back</Text>
      </View>
    </TouchableOpacity>
  ),
  headerTransparent: true,
};
function index(props) {
  const [] = useState();

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text> textInComponent </Text>
    </View>
  );
}

const mapStateToProps = state => ({});

export default connectRedux(mapStateToProps, index);
