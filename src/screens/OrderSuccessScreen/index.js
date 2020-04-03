import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import connectRedux from '@redux/connectRedux';
import NavigatorServices from '@navigators/NavigatorServices';
import {width, height} from '@configs/styles';
import Colors from '@assets/colors';
import {Text, TextInput} from '@components';
import images from '@resources/images';
import {
  checkAllArrayIsNotEmpty,
  upperFirstLetter,
  formatDay,
  formatMoney,
  formatDate,
} from '@utils/func';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.actions.app.resetStateConfirmOrder();
    const {idOrder} = this.props.navigation.state.params;
    if (idOrder !== '') {
      this.props.actions.app.getOrderDetail(idOrder);
    }
  }
  gotoHome() {
    NavigatorServices.reset('TabNavigator');
  }
  calculatePrice() {
    const {order} = this.props;
    let price = 0;
    order.users.forEach(user => {
      user.dishes.forEach(dish => {
        price = price + dish.price;
      });
    });
    return price;
  }
  render() {
    const {order} = this.props;
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
          }}>
          <Image
            source={images.order_success}
            style={{width: 100, height: 100}}
          />
          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Text bold style={{color: Colors.GREEN_LIGHT, fontSize: 30}}>
              Thành công
            </Text>
          </View>
        </View>

        <View
          style={{
            padding: 10,
            backgroundColor: Colors.GRAY_LIGHT,
            marginHorizontal: 10,
            borderRadius: 5,
          }}>
          <View style={{flexDirection: 'row', paddingVertical: 5}}>
            <View style={{flex: 1}}>
              <Text bold style={{color: Colors.BLACK, fontSize: 15}}>
                Mã đơn hàng
              </Text>
            </View>
            <View style={{flex: 2, alignItems: 'flex-end'}}>
              <Text bold style={{color: Colors.BLACK, fontSize: 15}}>
                {order._id}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 5}}>
            <View style={{flex: 1}}>
              <Text bold style={{color: Colors.BLACK, fontSize: 15}}>
                Ngày
              </Text>
            </View>
            <View style={{flex: 2, alignItems: 'flex-end'}}>
              <Text bold style={{color: Colors.BLACK, fontSize: 15}}>
                {formatDay(order.createdAt)}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 5}}>
            <View style={{flex: 1}}>
              <Text bold style={{color: Colors.BLACK, fontSize: 15}}>
                Tổng tiền
              </Text>
            </View>
            <View style={{flex: 2, alignItems: 'flex-end'}}>
              <Text bold style={{color: Colors.BLACK, fontSize: 15}}>
                {`${formatMoney(this.calculatePrice())}đ`}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 5}}>
            <View style={{flex: 1}}>
              <Text bold style={{color: Colors.BLACK, fontSize: 15}}>
                Trạng thái
              </Text>
            </View>
            <View style={{flex: 2, alignItems: 'flex-end'}}>
              <Text bold style={{color: Colors.BLACK, fontSize: 15}}>
                {upperFirstLetter(order.status)}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingVertical: 50,
          }}>
          <TouchableOpacity
            onPress={() => this.gotoHome()}
            style={{
              alignItems: 'center',
              padding: 5,
            }}>
            <Text bold style={{color: Colors.BLUE_MEDIUM, fontSize: 20}}>
              Trang chủ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  order: state.app.order,
});

export default connectRedux(mapStateToProps, index);
