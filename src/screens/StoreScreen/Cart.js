import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
  Image,
} from 'react-native';
import Share from 'react-native-share';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import normalize from 'react-native-normalize';
import {formatMoney} from '@utils/func';
import {Text, TextInput} from '@components';
import {width, height} from '@configs/styles';
import Colors from '@assets/colors';
import Insets from '@assets/insets';
const TotalDish = (data) => {
  let totalQty = 0;
  let totalPrice = 0;
  if (data.length > 0) {
    data.forEach((dish) => {
      totalQty = totalQty + dish.qty;
      totalPrice = totalPrice + dish.price;
    });
  }
  return {totalQty, totalPrice};
};
const ItemDish = ({data}) => {
  const {dish} = data;
  return (
    <View style={styles.itemDish}>
      <View style={styles.itemDishSub}>
        <View style={styles.itemDishInfo}>
          <Text bold style={styles.itemDishName} numberOfLines={1}>
            {dish.name}
          </Text>
          {dish.description !== '' && (
            <Text bold style={styles.itemDishOpts} numberOfLines={1}>
              {dish.description}
            </Text>
          )}
          <Text bold style={styles.itemDishPrice}>
            {`${formatMoney(dish.price)}đ`}
          </Text>
        </View>
        <View style={styles.itemDishQtyCont}>
          <TouchableOpacity style={{padding: 5}}>
            <AntDesign name="closecircle" size={20} color={Colors.ALERT} />
          </TouchableOpacity>
        </View>
      </View>
      {data.note !== '' && (
        <View style={styles.itemDishSub}>
          <View style={styles.itemDishNoteCont}>
            <SimpleLineIcons name="note" size={13} />
            <Text
              bold
              style={[styles.itemDishOpts, {paddingLeft: 5}]}
              numberOfLines={1}>
              {data.note}
            </Text>
          </View>
          <View style={styles.itemDishQtyCont} />
        </View>
      )}
    </View>
  );
};
const Item = ({data, author}) => {
  const {user, dishes} = data;
  const {totalQty, totalPrice} = TotalDish(dishes);
  const [isShow, setIsShow] = useState(true);
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.itemUser}
        onPress={() => {
          setIsShow(!isShow);
        }}>
        <View style={styles.itemUserSub}>
          <Image source={{uri: user.avatar}} style={styles.itemUserAvatar} />
          <View>
            <Text bold style={styles.itemUserName}>
              {user.fullname}
            </Text>
            <Text
              bold
              style={[
                styles.itemUserStatus,
                {color: author === user._id ? Colors.PRIMARY : Colors.BUTTON},
              ]}>
              {author === user._id ? 'Người tạo' : 'Đang đặt'}
            </Text>
          </View>
        </View>
        <View style={styles.itemUserPriceCont}>
          <View style={styles.itemUserPriceContSub}>
            <Text bold style={styles.itemUserPrice}>
              {`${formatMoney(totalPrice)}đ`}
            </Text>
            <Text style={styles.itemUserQty}>{`${totalQty} phần`}</Text>
          </View>
          <AntDesign
            name={isShow ? 'down' : 'up'}
            color={Colors.GRAY_DARK}
            size={10}
          />
        </View>
      </TouchableOpacity>
      {isShow && dishes.map((dish) => <ItemDish data={dish} />)}
    </View>
  );
};
const Cart = (props) => {
  const [bottom, setBottom] = useState(0);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setBottom(normalize(Platform.OS === 'ios' ? 215 : 0, 'height'));
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setBottom(0);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [props.isVisible]);

  const shareLink = async () => {
    const {data} = props;
    let _idOrder = data._id;
    let _idStore = data.store._id;
    let url = `dinofood://store?id_store=${_idStore}?id_order=${_idOrder}`;
    Share.open(
      {
        title: 'Đặt nhóm',
        message: 'Tham gia đặt nhóm',
        url: url,
      },
      {
        // Android only:
        dialogTitle: 'Đặt nhóm',
        // iOS only:
        excludedActivityTypes: [],
      },
    );
  };
  const CalculateTotal = (data) => {
    let totalCartQty = 0;
    let totalCartPrice = 0;
    if (data.length > 0) {
      data.forEach((user) => {
        const {totalQty, totalPrice} = TotalDish(user.dishes);
        totalCartQty = totalCartQty + totalQty;
        totalCartPrice = totalCartPrice + totalPrice;
      });
    }
    return {totalCartQty, totalCartPrice};
  };

  const {data} = props;
  return (
    <Modal
      isVisible={props.isVisible}
      style={[styles.modal, {marginBottom: bottom}]}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onRequestClose={props.onClose}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerLeftContainer}
            onPress={props.onClose}>
            <Ionicons name="md-close" size={30} color={Colors.GRAY_MEDIUM} />
          </TouchableOpacity>
          <Text bold style={styles.headerTitle}>
            Giỏ hàng
          </Text>
          <View style={styles.headerRightContainer} />
        </View>
        <FlatList
          style={styles.cartList}
          data={data.users}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Item data={item} author={data.author} />
          )}
          ListFooterComponent={() => (
            <View
              style={{
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={shareLink}
                style={{
                  padding: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                }}>
                <Text>Mời tham gia nhóm</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.buttomContainer}>
          <View>
            <FontAwesome name="shopping-cart" size={28} color={Colors.WHITE} />
            <View style={styles.badgeContainer}>
              <Text bold style={styles.badge}>
                {CalculateTotal(data.users).totalCartQty}
              </Text>
            </View>
          </View>
          <Text bold style={styles.totalPrice}>
            {`${formatMoney(CalculateTotal(data.users).totalCartPrice)}đ`}
          </Text>
          <View>
            <TouchableOpacity
              onPress={props.confirmOrder}
              activeOpacity={0.5}
              style={styles.confirmButton}>
              <Text style={styles.confirm}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {justifyContent: 'flex-end', margin: 0},
  container: {
    flex: 1,
    marginTop: height / 5,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.GRAY_MEDIUM,
    borderBottomWidth: 0.2,
  },
  headerRightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeftContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingLeft: 10,
  },
  headerTitle: {
    flex: 8,
    fontSize: 18,
    color: Colors.GRAY_DARK,
    textAlign: 'center',
  },
  cartList: {},
  item: {},
  itemUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.GRAY_LIGHT,
  },
  itemUserSub: {flexDirection: 'row'},
  itemUserAvatar: {width: 30, height: 30, borderRadius: 30 / 2},
  itemUserName: {
    marginLeft: 5,
    fontSize: 13,
    color: Colors.BLACK,
  },
  itemUserStatus: {
    marginLeft: 5,
    fontSize: 13,
  },
  itemUserPriceCont: {flexDirection: 'row', alignItems: 'center'},
  itemUserPriceContSub: {marginRight: 5},
  itemUserPrice: {fontSize: 13, color: Colors.BLACK},
  itemUserQty: {
    fontSize: 11,
    textAlign: 'right',
    color: Colors.BLACK,
  },
  itemDish: {
    padding: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT,
  },
  itemDishSub: {flexDirection: 'row'},
  itemDishInfo: {flex: 1},
  itemDishName: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.BLACK,
  },
  itemDishOpts: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.GRAY_DARK,
  },
  itemDishPrice: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.BLACK,
  },
  itemDishQtyCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemQuantity: {
    fontSize: 13,
    color: Colors.BLACK,
  },
  itemDishNoteCont: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemDishNote: {flex: 1, marginLeft: 10, padding: 0, color: Colors.BLACK},
  buttomContainer: {
    padding: 15,
    paddingBottom: 15 + Insets.BOTTOM,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  badgeContainer: {
    position: 'absolute',
    right: -8,
    top: -4,
    backgroundColor: Colors.ALERT,
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {color: Colors.WHITE, fontSize: 10},
  totalPrice: {
    fontSize: 17,
    color: Colors.WHITE,
    flex: 1,
    paddingLeft: 15,
    paddingRight: 10,
  },
  confirmButton: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  confirm: {color: Colors.BLACK, fontSize: 18},
});
export default Cart;
