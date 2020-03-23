/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  DeviceEventEmitter,
  Image,
} from 'react-native';
const eventTypeLogout = 'LOGOUT';
import connectRedux from '@redux/connectRedux';
import images from '@resources/images';
import {width, height} from '@configs/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {checkAllArrayIsNotEmpty, formatDate, formatMoney} from '@utils/func';

class index extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Tài khoản',
    // headerShown: false,
    // headerTransparent: true,
    headerStyle: {borderBottomWidth: 0},
  });
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
    DeviceEventEmitter.addListener(eventTypeLogout, e => {
      this.props.actions.auth.logout();
      this.props.navigation.navigate('Login');
    });
  };
  gotoPayment = () => {
    this.props.navigation.navigate('Payment');
  };
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
            <Text style={{fontSize: 18, fontWeight: '500'}}>
              {profile.fullname}
            </Text>
            <Text style={{fontSize: 14}}>{profile.email}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 0.5,
              borderLeftWidth: 0,
              borderColor: '#E6E6E6',
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 15,
              }}>
              <Text>{formatMoney(currentBalance)} VND</Text>
              <Text>Số dư</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 0.5,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              borderColor: '#E6E6E6',
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 15,
              }}>
              <Text>0</Text>
              <Text>Đơn hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 15,
            }}
            onPress={() => this.gotoPayment()}>
            <Ionicons name="ios-wallet" color="green" size={20} />
            <Text style={{marginLeft: 15, fontSize: 18}}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderTopWidth: 0.5,
              borderColor: '#CCCCCC',
              padding: 15,
            }}
            onPress={() => this.logout()}>
            <Ionicons name="ios-power" color="red" size={20} />
            <Text style={{color: 'red', marginLeft: 15, fontSize: 18}}>
              Logout
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
