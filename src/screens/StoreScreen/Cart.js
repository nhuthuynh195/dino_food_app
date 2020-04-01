import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
  Image,
  Share,
} from 'react-native';
import {useSelector} from 'react-redux';
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

const mockData = {
  _id: '5e7dcc485a44625d82f9d5a5',
  status: 'pre-request',
  deleted: false,
  store: {
    _id: '5e7cb204a0660f5a0d5e2fc9',
    name: 'Bánh Ướt Lòng Gà Đà Lạt - Shop Online',
    slug: 'banh-uot-long-ga-da-lat-shop-online',
    url: 'https://www.now.vn/ho-chi-minh/banh-uot-long-ga-da-lat-shop-online',
    photos: [
      {
        _id: '5e7cb204a0660f5a0d5e2fca',
        width: 60,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s60x60/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 60,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fcb',
        width: 120,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s120x120/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 120,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fcc',
        width: 160,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s160x120/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 120,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fcd',
        width: 160,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s160x160/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 160,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fce',
        width: 180,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s180x180/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 180,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fcf',
        width: 240,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s240x240/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 240,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fd0',
        width: 280,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s280x175/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 175,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fd1',
        width: 400,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s400x216/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 216,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fd2',
        width: 600,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s600x324/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 324,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fd3',
        width: 640,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s640x400/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 400,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fd4',
        width: 640,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s640x640/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 640,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fd5',
        width: 750,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s750x400/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 400,
      },
      {
        _id: '5e7cb204a0660f5a0d5e2fd6',
        width: 1242,
        value:
          'https://images.foody.vn/res/g98/977734/prof/s1242x600/foody-upload-api-foody-mobile-aaaaaa-191107171422.jpg',
        height: 600,
      },
    ],
    address: '71/5D Lâm Văn Bền, P. Tân Kiểng, Quận 7, TP. HCM',
    provider: 'now',
  },
  users: [
    {
      _id: '5e7dcc485a44625d82f9d5a6',
      user: {
        _id: '5e689c08d7014a1b374db416',
        deleted: false,
        username: 'nhut.pham',
        fullname: 'Nhựt Phạm',
        name: 'Nhựt Phạm',
        avatar:
          'https://avatars.slack-edge.com/2019-09-24/772047238183_dac4a3858b00bdb28d5b_72.png',
        slack: 'UHRGTUA9K',
        email: 'nhut.pham@dinovative.com',
        createdAt: '2020-03-11T08:06:32.745Z',
        updatedAt: '2020-03-23T08:56:59.331Z',
        __v: 1,
      },
      dishes: [
        {
          _id: '5e7dccd65a44625d82f9d5a7',
          qty: 1,
          note: 'them product',
          dish: {
            _id: '5e7cb204a0660f5a0d5e2fda',
            name: 'Bánh ướt đặc biệt ( gà xé, trứng non, lòng gà )',
            price: 45000,
            photos: [
              {
                _id: '5e7cb204a0660f5a0d5e2fdb',
                width: 120,
                value:
                  'https://images.foody.vn/res/g98/977734/s120x120/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 120,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fdc',
                width: 180,
                value:
                  'https://images.foody.vn/res/g98/977734/s180x180/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 180,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fdd',
                width: 560,
                value:
                  'https://images.foody.vn/res/g98/977734/s570x570/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 560,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fde',
                width: 750,
                value:
                  'https://images.foody.vn/res/g98/977734/s750x750/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 750,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fdf',
                width: 1242,
                value:
                  'https://images.foody.vn/res/g98/977734/s1242x1242/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 1242,
              },
            ],
            description:
              'Bánh ướt nhà làm + Gà Tam kỳ xé nhỏ + Lòng mề gà Tam kỳ + Trứng non tươi . Thưởng Thức để cảm nhận sự tinh tế thơm ngon của món ăn',
          },
          price: 45000,
        },
        {
          _id: '5e7dccd65a44625d82f9d5a8',
          qty: 1,
          note: 'them product',
          dish: {
            _id: '5e7cb204a0660f5a0d5e2fda',
            name: 'Bánh ướt đặc biệt ( gà xé, trứng non, lòng gà )',
            price: 45000,
            photos: [
              {
                _id: '5e7cb204a0660f5a0d5e2fdb',
                width: 120,
                value:
                  'https://images.foody.vn/res/g98/977734/s120x120/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 120,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fdc',
                width: 180,
                value:
                  'https://images.foody.vn/res/g98/977734/s180x180/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 180,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fdd',
                width: 560,
                value:
                  'https://images.foody.vn/res/g98/977734/s570x570/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 560,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fde',
                width: 750,
                value:
                  'https://images.foody.vn/res/g98/977734/s750x750/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 750,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fdf',
                width: 1242,
                value:
                  'https://images.foody.vn/res/g98/977734/s1242x1242/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 1242,
              },
            ],
            description:
              'Bánh ướt nhà làm + Gà Tam kỳ xé nhỏ + Lòng mề gà Tam kỳ + Trứng non tươi . Thưởng Thức để cảm nhận sự tinh tế thơm ngon của món ăn',
          },
          price: 45000,
        },
        {
          _id: '5e7dccde5a44625d82f9d5a9',
          qty: 1,
          note: 'them product',
          dish: {
            _id: '5e7cb204a0660f5a0d5e2fda',
            name: 'Bánh ướt đặc biệt ( gà xé, trứng non, lòng gà )',
            price: 45000,
            photos: [
              {
                _id: '5e7cb204a0660f5a0d5e2fdb',
                width: 120,
                value:
                  'https://images.foody.vn/res/g98/977734/s120x120/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 120,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fdc',
                width: 180,
                value:
                  'https://images.foody.vn/res/g98/977734/s180x180/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 180,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fdd',
                width: 560,
                value:
                  'https://images.foody.vn/res/g98/977734/s570x570/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 560,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fde',
                width: 750,
                value:
                  'https://images.foody.vn/res/g98/977734/s750x750/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 750,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fdf',
                width: 1242,
                value:
                  'https://images.foody.vn/res/g98/977734/s1242x1242/8f48f03d-94e2-49ca-a261-5f8c38ec39f2.jpg',
                height: 1242,
              },
            ],
            description:
              'Bánh ướt nhà làm + Gà Tam kỳ xé nhỏ + Lòng mề gà Tam kỳ + Trứng non tươi . Thưởng Thức để cảm nhận sự tinh tế thơm ngon của món ăn',
          },
          price: 45000,
        },
      ],
    },
    {
      _id: '5e7dcee75a44625d82f9d5ad',
      user: {
        _id: '5e689c08d7014a1b374db427',
        deleted: false,
        username: 'quocthinh.nguyen',
        fullname: 'Nguyen Ho Quoc Thinh',
        name: 'Nguyen Ho Quoc Thinh',
        avatar:
          'https://secure.gravatar.com/avatar/3d8a9453010a205bed15061021134576.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0006-72.png',
        slack: 'ULY3UJTJQ',
        email: 'quocthinh.nguyen@dinovative.com',
        createdAt: '2020-03-11T08:06:32.825Z',
        updatedAt: '2020-03-27T09:59:40.467Z',
        __v: 1,
      },
      dishes: [
        {
          _id: '5e7dcee75a44625d82f9d5ae',
          qty: 1,
          note: 'thinh them product ',
          dish: {
            _id: '5e7cb204a0660f5a0d5e2fe0',
            name: 'Bánh ướt gà xé',
            price: 35000,
            photos: [
              {
                _id: '5e7cb204a0660f5a0d5e2fe1',
                width: 120,
                value:
                  'https://images.foody.vn/res/g98/977734/s120x120/0aded487-3ce5-47fc-bfee-7b347cad2c21.jpg',
                height: 120,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fe2',
                width: 180,
                value:
                  'https://images.foody.vn/res/g98/977734/s180x180/0aded487-3ce5-47fc-bfee-7b347cad2c21.jpg',
                height: 180,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fe3',
                width: 560,
                value:
                  'https://images.foody.vn/res/g98/977734/s570x570/0aded487-3ce5-47fc-bfee-7b347cad2c21.jpg',
                height: 560,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fe4',
                width: 750,
                value:
                  'https://images.foody.vn/res/g98/977734/s750x750/0aded487-3ce5-47fc-bfee-7b347cad2c21.jpg',
                height: 750,
              },
              {
                _id: '5e7cb204a0660f5a0d5e2fe5',
                width: 1242,
                value:
                  'https://images.foody.vn/res/g98/977734/s1242x1242/0aded487-3ce5-47fc-bfee-7b347cad2c21.jpg',
                height: 1242,
              },
            ],
            description:
              'Gà Tam kỳ được Xé nhỏ , loại bỏ xương rất thơm ngon .',
          },
          price: 35000,
        },
      ],
    },
  ],
  author: '5e689c08d7014a1b374db416',
  createdAt: '2020-03-27T09:50:00.551Z',
  updatedAt: '2020-03-27T10:01:11.482Z',
  __v: 4,
};

const TotalDish = data => {
  let totalQty = 0;
  let totalPrice = 0;
  if (data.length > 0) {
    data.forEach(dish => {
      totalQty = totalQty + dish.qty;
      totalPrice = totalPrice + dish.price * dish.qty;
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
          <Text style={styles.itemDishName} numberOfLines={1}>
            {dish.name}
          </Text>
          <Text style={styles.itemDishOpts} numberOfLines={1}>
            {dish.description}
          </Text>
          <Text style={styles.itemDishPrice}>
            {`${formatMoney(dish.price)}đ`}
          </Text>
        </View>
        <View style={styles.itemDishQtyCont}>
          <TouchableOpacity>
            <AntDesign name="minuscircleo" size={20} color={Colors.PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{data.qty}</Text>
          <TouchableOpacity>
            <AntDesign name="pluscircle" size={20} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemDishSub}>
        <View style={styles.itemDishNoteCont}>
          <SimpleLineIcons name="note" size={13} />
          <TextInput
            style={styles.itemDishNote}
            value={data.note}
            placeholder="Ghi chú ... "
          />
        </View>
        <View style={styles.itemDishQtyCont} />
      </View>
    </View>
  );
};

const Item = ({data, author}) => {
  const {user, dishes} = data;
  console.log('dishes', dishes);
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
            <Text style={styles.itemUserName}>{user.fullname}</Text>
            <Text
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
            <Text style={styles.itemUserPrice}>
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
      {isShow && dishes.map(dish => <ItemDish data={dish} />)}
    </View>
  );
};

const Cart = props => {
  const cart = useSelector(state => state.dataLocal.cart);
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

  const shareLink = async () => {
    const url = 'dinofood://store';
    const options = {
      url: url,
      message: '',
    };
    const result = await Share.share(options);
    console.log('result', result);
  };
  const CalculateTotal = data => {
    console.log('data', data);
    let totalCartQty = 0;
    let totalCartPrice = 0;
    // if (data.length > 0) {
    //   data.forEach(user => {
    //     const {totalQty, totalPrice} = TotalDish(user.dishes);
    //     totalCartQty = totalCartQty + totalQty;
    //     totalCartPrice = totalCartPrice + totalPrice;
    //   });
    // }
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
          <Text style={styles.headerTitle}>Giỏ hàng</Text>
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
              <Text style={styles.badge}>
                {/* {CalculateTotal(data.users).totalCartQty} */}
              </Text>
            </View>
          </View>
          <Text style={styles.totalPrice}>
            {`${formatMoney(CalculateTotal(data.users).totalCartPrice)}đ`}
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
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerTitle: {
    flex: 8,
    fontSize: 18,
    color: Colors.GRAY_DARK,
    fontWeight: 'bold',
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
    fontWeight: '500',
    color: Colors.BLACK,
  },
  itemUserStatus: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemUserPriceCont: {flexDirection: 'row', alignItems: 'center'},
  itemUserPriceContSub: {marginRight: 5},
  itemUserPrice: {fontSize: 13, fontWeight: '500', color: Colors.BLACK},
  itemUserQty: {
    fontSize: 11,
    fontWeight: '100',
    textAlign: 'right',
    color: Colors.BLACK,
  },
  itemDish: {padding: 5, paddingHorizontal: 10},
  itemDishSub: {flexDirection: 'row'},
  itemDishInfo: {flex: 8},
  itemDishName: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20,
    color: Colors.BLACK,
  },
  itemDishOpts: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20,
    color: Colors.GRAY_DARK,
  },
  itemDishPrice: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20,
    color: Colors.BLACK,
  },
  itemDishQtyCont: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  itemQuantity: {
    fontSize: 13,
    fontWeight: '100',
    color: Colors.BLACK,
  },
  itemDishNoteCont: {
    flex: 8,
    flexDirection: 'row',
    marginTop: 5,
    borderRadius: 3,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDishNote: {flex: 1, marginLeft: 10, padding: 0, color: Colors.BLACK},
  buttomContainer: {
    padding: 15,
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
  badge: {color: Colors.WHITE, fontSize: 10, fontWeight: 'bold'},
  totalPrice: {
    fontSize: 17,
    color: Colors.WHITE,
    fontWeight: '600',
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

/**
 * STYLE
 */

// item: {
//   flexDirection: 'row',
//   marginHorizontal: 10,
//   paddingVertical: 10,
//   borderBottomWidth: 0.2,
//   borderBottomColor: '#5F5F5F',
// },
// itemInfoContainer: {
//   flex: 3,
// },
// itemName: {
//   fontSize: 15,
//   lineHeight: 15,
// },
// itemPrice: {
//   fontSize: 11,
//   fontWeight: '100',
//   lineHeight: 15,
// },
// itemNoteContainer: {
//   flexDirection: 'row',
//   marginRight: 20,
//   marginTop: 5,
//   backgroundColor: '#efefef',
//   borderRadius: 3,
//   padding: 10,
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// itemNote: {flex: 1, marginLeft: 10, padding: 0, lineHeight: 15},
// itemQuantityContainer: {
//   flex: 1,
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between',
// },
// itemQuantity: {
//   fontWeight: 'bold',
// },

/**
 * UI
 */

// const Item = ({data, index, addNote, addProduct, removeProduct}) => {
//   return (
//     <View style={styles.item}>
//       <View style={styles.itemInfoContainer}>
//         <Text style={styles.itemName}>{data.name}</Text>
//         <Text style={styles.itemPrice}>{data.option}</Text>
//         <Text style={styles.itemPrice}>{`${formatMoney(data.price)}đ`}</Text>
//         <View style={styles.itemNoteContainer}>
//           <SimpleLineIcons name="note" size={15} />
//           <TextInput
//             style={styles.itemNote}
//             value={data.note}
//             placeholder="Ghi chú ... "
//             onChange={value => {
//               addNote(value.nativeEvent.text, index);
//             }}
//           />
//         </View>
//       </View>
//       <View style={styles.itemQuantityContainer}>
//         <TouchableOpacity
//           onPress={() => {
//             removeProduct(
//               data._index_menu,
//               data._index_product,
//               data.quantity,
//               data.option,
//             );
//           }}>
//           <AntDesign name="minuscircleo" size={25} color={'#0D8BD1'} />
//         </TouchableOpacity>
//         <Text style={styles.itemQuantity}>{data.quantity}</Text>
//         <TouchableOpacity
//           onPress={() => {
//             addProduct(
//               data._index_menu,
//               data._index_product,
//               data.quantity,
//               data.option,
//             );
//           }}>
//           <AntDesign name="pluscircleo" size={25} color={'#0D8BD1'} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
