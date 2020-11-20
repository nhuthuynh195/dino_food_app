/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  DeviceEventEmitter,
  Image,
  MaskedViewBase,
} from 'react-native';
const eventTypeLogout = 'LOGOUT';
import connectRedux from '@redux/connectRedux';
import images from '@resources/images';
import {width, height} from '@configs/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {checkAllArrayIsNotEmpty, formatDate, formatMoney} from '@utils/func';
import Colors from '@assets/colors';
import {Text, TextInput} from '@components';
class index extends Component {
  componentDidMount() {
    this.actionTypeAlert();
    this.props.actions.auth.getProfile();
    this.checkBalance();
  }
  checkBalance() {
    let page = 1;
    let email = this.props.profile.email;
    this.props.actions.app.checkBalance(page, email);
  }
  logout = () => {
    this.props.openAlert(`Bạn có muốn đăng xuất?`, eventTypeLogout);
  };
  actionTypeAlert = () => {
    this.listener = DeviceEventEmitter.addListener(eventTypeLogout, e => {
      this.props.actions.auth.logout();
    });
  };
  gotoPayment = () => {
    this.props.navigation.navigate('Payment');
  };
  componentWillUnmount() {
    this.listener.remove();
  }
  render() {
    const {profile, currentBalance} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 15,
          }}>
          <View
            style={{
              backgroundColor: '#F7F7F7',
              height: 90,
              width: 90,
              borderRadius: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: profile.avatar}}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                borderColor: '#E6E6E6',
                borderWidth: 1,
              }}
            />
          </View>

          <View
            style={{
              justifyContent: 'space-evenly',
              paddingLeft: 15,
            }}>
            <Text bold style={{fontSize: 18}}>
              {profile.fullname}
            </Text>
            <Text style={{fontSize: 14}}>{profile.email}</Text>
          </View>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.logout()}>
            <Text style={{color: Colors.ALERT, marginLeft: 15, fontSize: 15}}>
              ĐĂNG XUẤT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  listBalance: state.app.listBalance,
  currentBalance: state.app.currentBalance,
});

export default connectRedux(mapStateToProps, index);
