import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {formatMoney} from '@utils/func';

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    height: '80%',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#5F5F5F',
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
    alignItems: 'center',
  },
  headerTitle: {
    flex: 8,
    fontSize: 18,
    color: '#5F5F5F',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartList: {},
  item: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: '#5F5F5F',
  },
  itemInfoContainer: {
    flex: 3,
  },
  itemName: {
    fontSize: 15,
    lineHeight: 15,
  },
  itemPrice: {
    fontSize: 11,
    fontWeight: '100',
    lineHeight: 15,
  },
  itemQuantityContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemQuantity: {
    fontWeight: 'bold',
  },
  buttomContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D8BD1',
  },
  badgeContainer: {
    position: 'absolute',
    right: -8,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {color: 'white', fontSize: 10, fontWeight: 'bold'},
  totalPrice: {
    fontSize: 17,
    color: 'white',
    fontWeight: '600',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 10,
  },
  confirmButton: {
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  confirm: {color: 'black', fontSize: 18},
});

const Item = ({data, addProduct, removeProduct}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemInfoContainer}>
        <Text style={styles.itemName}>{data.name}</Text>
        <Text style={styles.itemPrice}>{data.option}</Text>
        <Text style={styles.itemPrice}>{`${formatMoney(data.price)}đ`}</Text>
      </View>
      <View style={styles.itemQuantityContainer}>
        <TouchableOpacity
          onPress={() => {
            removeProduct(
              data._index_menu,
              data._index_product,
              data.quantity,
              data.option,
            );
          }}>
          <AntDesign name="minuscircleo" size={25} color={'#0D8BD1'} />
        </TouchableOpacity>
        <Text style={styles.itemQuantity}>{data.quantity}</Text>
        <TouchableOpacity
          onPress={() => {
            addProduct(
              data._index_menu,
              data._index_product,
              data.quantity,
              data.option,
            );
          }}>
          <AntDesign name="pluscircleo" size={25} color={'#0D8BD1'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Cart = props => {
  const cart = useSelector(state => state.dataLocal.cart);

  const calculatePriceCart = () => {
    let price = 0;
    cart.forEach(element => {
      price = price + element.price * element.quantity;
    });
    return price;
  };

  return (
    <Modal
      isVisible={props.isVisible}
      style={styles.modal}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onRequestClose={props.onClose}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerLeftContainer}
            onPress={props.onClose}>
            <Ionicons name="md-close" size={30} color="#5F5F5F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Giỏ hàng</Text>
          <View style={styles.headerRightContainer} />
        </View>
        <FlatList
          style={styles.cartList}
          data={cart}
          renderItem={({item}) => (
            <Item
              data={item}
              addProduct={props.addProduct}
              removeProduct={props.removeProduct}
            />
          )}
        />
        <View style={styles.buttomContainer}>
          <View>
            <FontAwesome name="shopping-cart" size={28} color="white" />
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>{cart.length}</Text>
            </View>
          </View>
          <Text style={styles.totalPrice}>
            {`${formatMoney(calculatePriceCart())}đ`}
          </Text>
          <View>
            <TouchableOpacity activeOpacity={0.5} style={styles.confirmButton}>
              <Text style={styles.confirm}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Cart;
