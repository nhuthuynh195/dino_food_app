import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import connectRedux from '@redux/connectRedux';
import {
  checkAllArrayIsNotEmpty,
  formatDate,
  formatDay,
  formatNumber,
} from '@utils/func';
import Colors from '@assets/colors';
import images from '@resources/images';
import {width, height} from '@configs/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Styles} from '@configs/styles';
import {Text, TextInput} from '@components';
import Insets from '@assets/insets';
export class index extends Component {
  async componentDidMount() {
    const {profile} = this.props;
    let page = 1;
    let email = profile.user.email;
    this.props.actions.app.checkBalance(page, email);
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

  render() {
    const {listBalance, currentBalance} = this.props;
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
            <Text bold style={{fontSize: 25, color: 'white'}}>
              Trả tiền đi bạn êi ( ͡° ͜ʖ ͡°)
            </Text>
            {currentBalance !== '' && (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 35,
                }}>
                <Text bold style={{fontSize: 70, color: 'white'}}>
                  {formatNumber(currentBalance)}
                </Text>
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
                    marginTop: -35,
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
                  onPress={() => this.request()}
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
                  {/* <MaterialCommunityIcons
                    name="arrow-down-box"
                    size={28}
                    color={Colors.BUTTON}
                  /> */}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image_background: {
    height: 250,
    width: width,
    justifyContent: 'center',
  },
});
const mapStateToProps = state => ({
  profile: state.dataLocal.profile,
  listBalance: state.app.listBalance,
  currentBalance: state.app.currentBalance,
});

export default connectRedux(mapStateToProps, index);
