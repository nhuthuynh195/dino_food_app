import Colors from '@assets/colors';
import Insets from '@assets/insets';
import {Text, TextInput} from '@components';
import Clipboard from '@react-native-community/clipboard';
import connectRedux from '@redux/connectRedux';
import {formatNumber} from '@utils/func';
import {Picker} from 'native-base';
import React, {Component} from 'react';
import {
  DeviceEventEmitter,
  Platform,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInputMask} from 'react-native-masked-text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
eventType = 'REQUEST_PAYMENT';
import _ from 'lodash';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedTypePayment: props.route.params.value,
      paymentType: [
        {label: 'Nạp tiền', value: 'income'},
        // {label: 'Chuyển tiền', value: 'tranfer'},
        {label: 'Rút tiền', value: 'outcome'},
      ],
      paymentMethod: [
        {label: 'AirPay', value: 'air-pay', link: 'airpay://app'},
        {label: 'Cash', value: 'cash', link: ''},
        {label: 'Momo', value: 'momo', link: 'momo://app'},
        {label: 'Grab Moca', value: 'moca', link: 'grab://app'},
        {label: 'ViettelPay', value: 'viettel-pay', link: 'viettelpay://app'},
        {label: 'SCB', value: 'scb', link: 'scbmobilebanking://app'},
        {label: 'ZaloPay', value: 'zalo-pay', link: 'zalopay://app'},
        {label: 'VinID', value: 'vinid', link: ''},
      ],
      selectedTypePaymentMethod: '',
      amount: formatNumber(props.profile.user.balance),
      description: '',
      email: props.profile.user.email,
      stk: '14396880001',
      sdt: '0971407794',
    };
  }
  componentDidMount() {
    this.actionTypeAlert();
  }
  requestPayment = () => {
    this.props.openAlert(`Bạn có muốn thực hiện giao dịch?`, eventType);
  };
  actionTypeAlert = () => {
    this.listener = DeviceEventEmitter.addListener(eventType, () => {
      this.copyToClipboard();
      this.submitPayment();
    });
  };
  componentWillUnmount() {
    this.listener.remove();
  }
  submitPayment() {
    const {
      selectedTypePayment,
      amount,
      selectedTypePaymentMethod,
      description,
      email,
    } = this.state;
    let amountValue = amount.replace(/\./g, '');
    if (
      selectedTypePayment !== '' &&
      selectedTypePaymentMethod !== '' &&
      amountValue > 0
    ) {
      let body = {
        email: email,
        type: selectedTypePayment,
        amount: amountValue,
        paymentMethod: selectedTypePaymentMethod,
        description: description,
      };
      this.props.actions.app.requestPayment(body);
    } else {
      this.props.alertWithType(
        'warn',
        'Thông báo',
        'Vui lòng nhập đầy đủ thông tin',
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.requestPaymentCode == 200 &&
      nextProps.requestPaymentCode !== ''
    ) {
      let mess = `Giao dịch thành công.`;
      this.props.alertWithType('success', 'Thông báo', mess);
      const {selectedTypePaymentMethod} = this.state;
      const paymentMethod = _.find(this.state.paymentMethod, function(item) {
        return item.value == selectedTypePaymentMethod;
      });
      if (paymentMethod !== undefined && paymentMethod?.link !== '') {
        Alert.alert(
          'Thông báo',
          `Bạn có muốn mở app ${paymentMethod.label}?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                if (paymentMethod !== undefined && paymentMethod?.link !== '') {
                  Platform.OS == 'ios' && Linking.openURL(paymentMethod.link);
                }
              },
            },
          ],
          {cancelable: false},
        );
      }
      this.props.actions.app.resetStatePayment();
      this.props.navigation.navigate('HistoryPayment');
    } else if (nextProps.requestPaymentCode !== '') {
      let mess = `Giao dịch thất bại.`;
      this.props.alertWithType('error', 'Thông báo', mess);
      this.props.actions.app.resetStatePayment();
    }
  }
  copyToClipboard = () => {
    if (this.state.selectedTypePaymentMethod === 'scb') {
      Clipboard.setString(this.state.stk);
    } else {
      Clipboard.setString(this.state.sdt);
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingBottom: Insets.BOTTOM,
          backgroundColor: Colors.WHITE,
        }}>
        <KeyboardAwareScrollView>
          <View
            style={{
              paddingVertical: 16,
              backgroundColor: Colors.BOTTOM_TAB,
              marginHorizontal: 10,
              marginVertical: 5,
              borderRadius: 5,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                bold
                style={{fontSize: 20, color: 'white', marginBottom: 8}}>
                Thông tin thanh toán
              </Text>
            </View>
            <View style={{padding: 10}}>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString('LÊ THÀNH DANH');
                  alert('Copied');
                }}>
                <Text style={{fontSize: 15, color: 'white', marginBottom: 8}}>
                  {`Tên: LÊ THÀNH DANH`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginVertical: 10}}
                onPress={() => {
                  Clipboard.setString(this.state.stk);
                  alert('Copied');
                }}>
                <Text style={{fontSize: 15, color: 'white', marginBottom: 8}}>
                  {`STK SCB: ${this.state.stk}`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(this.state.sdt);
                  alert('Copied');
                }}>
                <Text style={{fontSize: 15, color: 'white', marginBottom: 8}}>
                  {`SĐT: ${this.state.sdt}`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              marginHorizontal: 10,
              borderColor: Colors.PRIMARY,
              borderRadius: 5,
            }}>
            <View
              style={{
                padding: 5,
                paddingHorizontal: 10,
                justifyContent: 'center',
                flex: 1,
              }}>
              <TextInputMask
                type={'money'}
                options={{
                  precision: 0,
                  separator: ',',
                  delimiter: '.',
                  unit: '',
                  suffixUnit: '',
                }}
                placeholder="Vui lòng nhập số tiền"
                value={this.state.amount}
                placeholderTextColor={Colors.PRIMARY}
                selectionColor={Colors.PRIMARY}
                style={{
                  paddingVertical: 10,
                  fontSize: 18,
                  color: Colors.PRIMARY,
                  fontFamily: 'Quicksand-Regular',
                }}
                onChangeText={text => {
                  this.setState({
                    amount: text,
                  });
                }}
              />
            </View>

            <View
              style={{
                padding: 5,
                borderRadius: 5,
                marginHorizontal: 5,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 18, color: Colors.BLACK}}>VND</Text>
            </View>
          </View>
          <View style={{paddingTop: 15}}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#D9D5DC',
                paddingHorizontal: 15,
              }}
            />
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors.GRAY_MEDIUM,
            }}>
            <Picker
              style={{
                borderRadius: 0,
                width: '100%',
              }}
              headerBackButtonTextStyle={{fontFamily: 'Quicksand-Regular'}}
              headerTitleStyle={{fontFamily: 'Quicksand-Regular'}}
              textStyle={{fontFamily: 'Quicksand-Regular'}}
              itemTextStyle={{fontFamily: 'Quicksand-Regular'}}
              iosHeader="Lựa chọn"
              headerBackButtonText="Hủy"
              mode="dropdown"
              placeholder="Chọn loại giao dịch"
              selectedValue={this.state.selectedTypePayment}
              onValueChange={value => {
                this.setState({selectedTypePayment: value});
              }}>
              {this.state.paymentType.map(item => (
                <Picker.Item label={item.label} value={item.value} />
              ))}
            </Picker>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors.GRAY_MEDIUM,
            }}>
            <Picker
              style={{
                width: '100%',
                borderRadius: 0,
              }}
              headerBackButtonTextStyle={{fontFamily: 'Quicksand-Regular'}}
              headerTitleStyle={{fontFamily: 'Quicksand-Regular'}}
              textStyle={{fontFamily: 'Quicksand-Regular'}}
              itemTextStyle={{fontFamily: 'Quicksand-Regular'}}
              iosHeader="Lựa chọn"
              headerBackButtonText="Hủy"
              mode="dropdown"
              placeholder="Chọn hình thức thanh toán"
              selectedValue={this.state.selectedTypePaymentMethod}
              onValueChange={value => {
                this.setState({selectedTypePaymentMethod: value});
              }}>
              {this.state.paymentMethod.map(item => (
                <Picker.Item label={item.label} value={item.value} />
              ))}
            </Picker>
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: Colors.GRAY_MEDIUM,
              alignItems: 'center',
              paddingHorizontal: Platform.OS == 'ios' ? 5 : 0,
            }}>
            <View style={{paddingLeft: 10}}>
              <MaterialCommunityIcons name="email" size={18} />
            </View>
            <TextInput
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={value => this.setState({email: value})}
              style={{
                flex: 1,
                padding: 15,
                fontSize: 15,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: Colors.GRAY_MEDIUM,
              alignItems: 'center',
              paddingHorizontal: Platform.OS == 'ios' ? 5 : 0,
            }}>
            <View style={{paddingLeft: 10}}>
              <MaterialCommunityIcons name="lead-pencil" size={18} />
            </View>
            <TextInput
              placeholder={'Ghi chú'}
              value={this.state.descriptionl}
              onChangeText={value => this.setState({description: value})}
              style={{
                flex: 1,
                padding: 15,
                fontSize: 15,
              }}
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={{padding: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.PRIMARY,
              alignItems: 'center',
              padding: 12,
              borderRadius: 5,
            }}
            onPress={() => this.requestPayment()}>
            <Text bold style={{color: Colors.WHITE, fontSize: 18}}>
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.dataLocal.profile,
  requestPaymentCode: state.app.requestPaymentCode,
  requestPaymentMessage: state.app.requestPaymentMessage,
});

export default connectRedux(mapStateToProps, index);
