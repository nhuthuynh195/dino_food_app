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
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInputMask} from 'react-native-masked-text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
eventType = 'REQUEST_PAYMENT';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedTypePayment: props.route.params.value,
      paymentType: [
        {label: 'Nạp tiền', value: 'income'},
        {label: 'Chuyển tiền', value: 'tranfer'},
        {label: 'Rút tiền', value: 'outcome'},
      ],
      paymentMethod: [
        {label: 'AirPay', value: 'air-pay'},
        {label: 'Cash', value: 'cash'},
        {label: 'Momo', value: 'momo'},
        {label: 'Grab Moca', value: 'moca'},
        {label: 'ViettelPay', value: 'viettel-pay'},
        {label: 'SCB', value: 'scb'},
        {label: 'ZaloPay', value: 'zalo-pay'},
        {label: 'VinID', value: 'vinid'},
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
      // this.props.actions.app.requestPayment(body);
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
              <Text style={{fontSize: 15, color: 'white', marginBottom: 8}}>
                Tên: LÊ THÀNH DANH
              </Text>
              <Text style={{fontSize: 15, color: 'white', marginBottom: 8}}>
                {'SCB STK: '}
                <Text style={{fontSize: 15, color: 'white', marginBottom: 8}}>
                  {this.state.stk}
                </Text>
              </Text>

              <Text style={{fontSize: 15, color: 'white', marginBottom: 8}}>
                {'SĐT: '}
                <Text style={{fontSize: 15, color: 'white', marginBottom: 8}}>
                  {this.state.sdt}
                </Text>
              </Text>
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
  requestPaymentMesage: state.app.requestPaymentMesage,
});

export default connectRedux(mapStateToProps, index);
