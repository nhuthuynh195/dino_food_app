import Colors from '@assets/colors';
import Insets from '@assets/insets';
import {Text, TextInput} from '@components';
import connectRedux from '@redux/connectRedux';
import React, {Component} from 'react';
import {
  DeviceEventEmitter,
  Platform,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInputMask} from 'react-native-masked-text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
eventType = 'TRANSFER_PAYMENT';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      amount: '0',
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
    this.listener = DeviceEventEmitter.addListener(eventType, () => {
      this.submitPayment();
    });
  };
  componentWillUnmount() {
    this.listener.remove();
  }
  submitPayment() {
    const {amount, email, description} = this.state;
    let amountValue = Math.abs(amount.replace(/\./g, ''));
    if (email !== '' && description !== '' && amountValue > 0) {
      let body = {
        email: email,
        amount: amountValue,
        description: description,
      };
      if (this.props.recentTransactions.length === 0) {
        this.props.actions.dataLocal.saveRecentTransactions([
          ...this.props.recentTransactions,
          this.state.email,
        ]);
      } else {
        let existEmail = this.props.recentTransactions.some(
          email => email === this.state.email,
        );
        if (!existEmail) {
          this.props.actions.dataLocal.saveRecentTransactions([
            ...this.props.recentTransactions,
            this.state.email,
          ]);
        }
      }
      this.props.actions.app.transfer(body);
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
      nextProps.transferPaymentCode == 200 &&
      nextProps.transferPaymentCode !== ''
    ) {
      let mess = `Giao dịch thành công.`;
      this.props.alertWithType('success', 'Thông báo', mess);
      this.props.actions.app.resetStatePayment();
      this.props.navigation.goBack();
    } else if (nextProps.transferPaymentCode !== '') {
      let mess = nextProps.transferPaymentMessage;
      this.props.alertWithType('error', 'Thông báo', mess);
      this.props.actions.app.resetStatePayment();
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingBottom: Insets.BOTTOM,
          backgroundColor: Colors.WHITE,
        }}>
        <KeyboardAwareScrollView>
          {this.props.recentTransactions.length > 0 && (
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: Colors.GRAY_MEDIUM,
              }}>
              <View>
                <Text
                  bold
                  style={{fontSize: 16, marginLeft: 10, marginTop: 10}}>
                  Recent Transactions
                </Text>
              </View>

              <FlatList
                showsHorizontalScrollIndicator={false}
                data={this.props.recentTransactions}
                ref={ref => (this._scrollView = ref)}
                horizontal
                contentContainerStyle={{paddingVertical: 10}}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      padding: 10,
                      borderRadius: 5,
                      margin: 10,
                      borderRadius: 5,
                      backgroundColor:
                        this.state.email === item
                          ? Colors.PRIMARY
                          : Colors.GRAY_MEDIUM,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({email: item}),
                          this._scrollView.scrollToIndex({
                            animated: true,
                            index: index,
                          });
                      }}>
                      <Text bold style={{color: Colors.WHITE, fontSize: 16}}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
          <View
            style={{
              marginTop: 15,
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
              value={this.state.description}
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
  transferPaymentCode: state.app.transferPaymentCode,
  transferPaymentMessage: state.app.transferPaymentMessage,
  recentTransactions: state.dataLocal.recentTransactions,
});

export default connectRedux(mapStateToProps, index);
