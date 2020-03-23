import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import normalize from 'react-native-normalize';
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
  itemNoteContainer: {
    flexDirection: 'row',
    marginRight: 20,
    marginTop: 5,
    backgroundColor: '#efefef',
    borderRadius: 3,
    padding: 10,
  },
  itemNote: {flex: 1, marginLeft: 10},
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

const Item = ({data, index, addNote, addProduct, removeProduct}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemInfoContainer}>
        <Text style={styles.itemName}>{data.name}</Text>
        <Text style={styles.itemPrice}>{data.option}</Text>
        <Text style={styles.itemPrice}>{`${formatMoney(data.price)}đ`}</Text>
        <View style={styles.itemNoteContainer}>
          <SimpleLineIcons name="note" size={15} />
          <TextInput
            style={styles.itemNote}
            value={data.note}
            placeholder="Ghi chú"
            onChange={value => {
              addNote(value.nativeEvent.text, index);
            }}
          />
        </View>
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
  const modal = useRef(null);
  const [bottom, setBottom] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setBottom(normalize(215, 'height'));
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

  const calculatePriceCart = () => {
    let price = 0;
    cart.forEach(element => {
      price = price + element.price * element.quantity;
    });
    return price;
  };

  const totalProduct = () => {
    let total = 0;
    cart.forEach(element => {
      total = total + element.quantity;
    });
    return total;
  };

  return (
    <Modal
      ref={modal}
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
            <Ionicons name="md-close" size={30} color="#5F5F5F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Giỏ hàng</Text>
          <View style={styles.headerRightContainer} />
        </View>
        <FlatList
          style={styles.cartList}
          data={cart}
          renderItem={({item, index}) => (
            <Item
              data={item}
              index={index}
              addNote={props.addNote}
              addProduct={props.addProduct}
              removeProduct={props.removeProduct}
            />
          )}
        />
        <View style={styles.buttomContainer}>
          <View>
            <FontAwesome name="shopping-cart" size={28} color="white" />
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>{totalProduct()}</Text>
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
