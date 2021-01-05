import Colors from '@assets/colors';
import Insets from '@assets/insets';
import {Text} from '@components';
import {Styles} from '@configs/styles';
import Clipboard from '@react-native-community/clipboard';
import connectRedux from '@redux/connectRedux';
import images from '@resources/images';
import {checkAllArrayIsNotEmpty, formatDay, formatNumber} from '@utils/func';
import React, {Component} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';

export class index extends Component {
  state = {
    listBalance: this.props.listBalance,
    loadData: true,
  };
  async componentDidMount() {
    const {profile} = this.props;
    let page = 1;
    let email = profile.user.email;
    this.props.actions.app.checkBalance(page, 10, email);
  }
  componentWillReceiveProps(nextProps) {
    const {loadData} = this.state;
    if (loadData) {
      this.setState({
        listBalance: nextProps.listBalance,
        loadData: false,
      });
    }
  }

  renderItem({item, index}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          paddingVertical: 20,
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
  payment() {
    this.props.navigation.navigate('Payment', {value: 'income'});
  }
  request() {
    this.props.navigation.navigate('Payment', {value: 'outcome'});
  }
  tranfer() {
    this.props.navigation.navigate('Transfer');
  }

  copyToClipboard = () => {
    const {currentBalance} = this.props;
    Clipboard.setString(Math.abs(currentBalance).toString());
    alert('Copied');
  };
  render() {
    const {currentBalance} = this.props;
    const {listBalance} = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.BACKGROUND,
        }}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: 95 + Insets.BOTTOM}}>
          <View
            style={{
              height: 250,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.PRIMARY,
            }}>
            {currentBalance < 0 && (
              <Text bold style={{fontSize: 25, color: 'white'}}>
                Trả tiền đi bạn êi (՞•ﻌ•՞)۶
              </Text>
            )}
            {currentBalance !== '' && (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 25,
                }}>
                <TouchableOpacity onPress={() => this.copyToClipboard()}>
                  <Text bold style={{fontSize: 50, color: 'white'}}>
                    {formatNumber(currentBalance)}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                  }}>
                  {' VND'}
                </Text>
              </View>
            )}
          </View>
          {/* </ImageBackground> */}
          {checkAllArrayIsNotEmpty(listBalance) && (
            <View style={{flex: 1, paddingHorizontal: 15}}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 100,
                    borderRadius: 5,
                    backgroundColor: Colors.WHITE,
                    marginTop: -50,
                    flex: 1,
                  },
                  Styles.shadow,
                ]}>
                <TouchableOpacity
                  onPress={() => this.payment()}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    borderRightWidth: 0.5,
                    borderColor: Colors.GRAY_LIGHT,
                  }}>
                  <Image
                    source={images.naptien}
                    style={{width: 44, height: 44}}
                  />

                  {/* <MaterialCommunityIcons
                    name="arrow-up-box"
                    size={28}
                    color={Colors.BUTTON}
                  /> */}
                  <Text style={{fontSize: 15, color: Colors.BLACK}}>
                    {'Nạp tiền'}
                  </Text>
                </TouchableOpacity>
                {/*  */}
                <TouchableOpacity
                  onPress={() => this.tranfer()}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    borderLeftWidth: 0.5,
                    borderColor: Colors.GRAY_LIGHT,
                  }}>
                  <Image
                    source={images.chuyentien}
                    style={{width: 44, height: 44}}
                  />
                  {/* <MaterialCommunityIcons
                    name="arrow-right-box"
                    size={28}
                    color={Colors.BUTTON}
                  /> */}
                  <Text style={{fontSize: 15, color: Colors.BLACK}}>
                    {'Chuyển tiền'}
                  </Text>
                </TouchableOpacity>
                {/*  */}
                <TouchableOpacity
                  onPress={() => this.request()}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    borderLeftWidth: 0.5,
                    borderColor: Colors.GRAY_LIGHT,
                  }}>
                  <Image
                    source={images.ruttien}
                    style={{width: 44, height: 44}}
                  />

                  <Text style={{fontSize: 15, color: Colors.BLACK}}>
                    {'Rút tiền'}
                  </Text>
                </TouchableOpacity>
              </View>
              {checkAllArrayIsNotEmpty(listBalance) && (
                <View style={{marginTop: 10}}>
                  <View
                    style={{
                      paddingVertical: 10,
                    }}>
                    <Text>Hoạt động gần đây</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: Colors.WHITE,
                      padding: 10,
                      paddingBottom: 0,
                      borderRadius: 5,
                    }}>
                    {listBalance.map((item, index) =>
                      this.renderItem({item, index}),
                    )}
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.dataLocal.profile,
  listBalance: state.app.listBalance,
  currentBalance: state.app.currentBalance,
});

export default connectRedux(mapStateToProps, index);
