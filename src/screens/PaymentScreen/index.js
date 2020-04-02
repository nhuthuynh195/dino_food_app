import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  DeviceEventEmitter,
} from 'react-native';
import connectRedux from '@redux/connectRedux';
import {ScrollView} from 'react-native-gesture-handler';
import {Form, Text, Item, Input, Label, Picker} from 'native-base';
import {TextInputMask} from 'react-native-masked-text';
import Colors from '@assets/colors';
import Insets from '@assets/insets';
eventType = 'REQUEST_PAYMENT';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedTypePayment: '',
      paymentType: [
        {label: 'Thanh toán', value: 'income'},
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
      ],
      selectedTypePaymentMethod: '',
      amount: '',
      description: '',
    };
  }
  componentDidMount() {
    this.actionTypeAlert();
  }
  requestPayment = () => {
    this.props.openAlert(`Bạn có muốn thực hiện giao dịch?`, eventType);
  };
  actionTypeAlert = () => {
    DeviceEventEmitter.addListener(eventType, () => {
      this.submitPayment();
    });
  };
  submitPayment() {
    const {profile} = this.props;
    const {
      selectedTypePayment,
      amount,
      selectedTypePaymentMethod,
      description,
    } = this.state;
    let amountValue = amount.replace(/\./g, '');
    // if (
    //   selectedTypePayment !== '' &&
    //   selectedTypePaymentMethod !== '' &&
    //   amountValue > 0
    // ) {
    let body = {
      email: profile.user.email,
      type: selectedTypePayment,
      amount: amountValue,
      paymentMethod: selectedTypePaymentMethod,
      description: description,
    };
    this.props.actions.app.requestPayment(body);
    // } else {
    //   this.props.alertWithType('warn', 'Warning', 'Do not allow empty value!');
    // }
  }
  render() {
    const {profile} = this.props;
    return (
      <View
        style={{
          flex: 1,
          paddingBottom: Insets.BOTTOM,
        }}>
        <ScrollView>
          <View
            style={{
              paddingVertical: 5,
              backgroundColor: Colors.PRIMARY,
              marginHorizontal: 5,
              marginVertical: 5,
              borderRadius: 5,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: 'white', fontWeight: '500'}}>
                Thông tin thanh toán
              </Text>
            </View>
            <View style={{padding: 10}}>
              <Text style={{fontSize: 15, color: 'white'}}>
                Tên: LÊ THÀNH DANH
              </Text>
              <Text style={{fontSize: 15, color: 'white'}}>
                SCB STK: 14396880001
              </Text>
              <Text style={{fontSize: 15, color: 'white'}}>
                SĐT: 0971407794
              </Text>
              <Text style={{fontSize: 15, color: 'white'}}>
                Payment method: Cash, SCB, ZaloPay, Momo, Grab Moca, Airpay,
                ViettelPay
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: Colors.PRIMARY,
                padding: 5,
                borderRadius: 5,
                marginHorizontal: 5,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>Số tiền</Text>
            </View>
            <View
              style={{
                backgroundColor: Colors.PRIMARY,
                padding: 5,
                borderRadius: 5,
                marginRight: 5,
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
                placeholderTextColor={'white'}
                selectionColor="white"
                style={{paddingVertical: 10, fontSize: 20, color: 'white'}}
                onChangeText={text => {
                  this.setState({
                    amount: text,
                  });
                }}
              />
            </View>
          </View>
          <View style={{paddingTop: 15}}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#D9D5DC',
                paddingHorizontal: 15,
              }}></View>
          </View>
          <Form>
            <Item picker>
              <Picker
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
            </Item>
            <Item picker>
              <Picker
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
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input disabled value={profile.user.email} />
            </Item>
            <Item floatingLabel last>
              <Label>Ghi chú</Label>
              <Input
                value={this.state.description}
                onChangeText={value => this.setState({description: value})}
              />
            </Item>
          </Form>
        </ScrollView>
        <View style={{padding: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.BUTTON,
              alignItems: 'center',
              padding: 12,
              borderRadius: 5,
            }}
            onPress={() => this.requestPayment()}>
            <Text style={{color: 'white', fontSize: 18}}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loadingLogin,
  profile: state.dataLocal.profile,
  loginSuccess: state.auth.loginSuccess,
  listStores: state.app.listStores,
  menu: Object.values(state.app.menu),
});

export default connectRedux(mapStateToProps, index);
