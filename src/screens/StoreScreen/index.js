import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import connectRedux from '@redux/connectRedux';
import Modal from 'react-native-modal';
const {width, height} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {checkAllArrayIsNotEmpty, formatDate, formatMoney} from '@utils/func';
import _ from 'ramda';
import update from 'immutability-helper';
import Cart from './cart';
import {Text, TextInput} from '@components';
import SafeAreaView from 'react-native-safe-area-view';
import {SafeAreaConsumer} from 'react-native-safe-area-context';
import Colors from '@assets/colors';
import Insets from '@assets/insets';
import firestore from '@react-native-firebase/firestore';

//outputs bottom safe area height
class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: [],
      showModal: false,
      showCartModal: false,
      product: {},
      options: [],
      order: {},
    };
    this.ref = React.createRef();
    // this.ref = firestore()
    //   .collection('orders')
    //   .doc('5e85d6d6e52c1465b57257fa');
  }
  componentDidMount() {
    // const collection = firestore()
    //   .collection('orders')
    //   .doc('5e85d6d6e52c1465b57257fa');

    // collection.get().then(order => {
    //   console.log('doc', order.data());
    // });
    const {idStore, idOrder} = this.props.navigation.state.params;
    if (idOrder !== '') {
      this.props.actions.app.getOrderDetail(idOrder);
    } else {
      this.props.actions.app.createOrder({
        store: idStore,
      });
    }
    this.props.actions.app.getStoreById(idStore);
  }
  componentWillReceiveProps(nextProps) {
    const {idStore, idOrder} = this.props.navigation.state.params;
    if (idOrder !== '') {
    }
    if (checkAllArrayIsNotEmpty(nextProps.order)) {
      const ref = firestore()
        .collection('orders')
        .doc(this.props.order._id);
      ref.get().then(order => {
        console.log('doc', order.data());
        this.setState({order: order.data()});
      });

      ref.onSnapshot(order => {
        console.log('order', order.data());
        this.setState({order: order.data()});
      });
    }

    if (checkAllArrayIsNotEmpty(nextProps.menu)) {
      this.setState({
        menu: Object.values(nextProps.menu),
      });
    }
  }
  updateOrder(product) {
    this.hideOptionModal();
    let param = {
      action: 'add',
      note: product.note,
      dish: product._id,
      _id: product._id,
    };
    this.props.actions.app.updateOrderDetail(param, this.props.order._id);
  }
  hideCartModal() {
    this.setState({showCartModal: false});
  }
  showCartModal() {
    this.setState({showCartModal: true});
  }
  // modal option
  showOptionModal(item) {
    console.log('item', item);
    let _product = {
      _id: item._id,
      name: item.name,
      photos: item.photos,
      price: item.price,
      description: item.description,
      quantity: 1,
      note: '',
    };
    this.setState({
      product: _product,
      options: item.options,
      showModal: true,
    });
  }
  hideOptionModal() {
    this.setState({
      showModal: false,
    });
  }
  seleteOption(index_options, index_option, item_option, isRequired) {
    const {options} = this.state;
    if (isRequired) {
      this.state.options[index_options].items.forEach((element, i) => {
        if (item_option._id == element._id) {
          let options = [...this.state.options];
          let option = options[index_options];
          let item = option.items[index_option];
          item.isDefault = true;
          this.setState({
            options,
          });
        } else {
          let options = [...this.state.options];
          let option = options[index_options];
          let item = option.items[i];
          item.isDefault = false;
          this.setState({
            options,
          });
        }
      });
    } else {
      let newCollection = update(options, {
        [index_options]: {
          items: {
            [index_option]: {
              isDefault: {
                $apply: function(x) {
                  return !x;
                },
              },
            },
          },
        },
      });
      this.setState({options: newCollection});
    }
  }
  calculatePriceCart() {
    const {order} = this.state;
    let price = 0;
    order.users.forEach(user => {
      user.dishes.forEach(dish => {
        price = price + dish.price;
      });
    });
    return price;
  }
  calculatePrice(price, quantity) {
    const {options} = this.state;
    if (checkAllArrayIsNotEmpty(options)) {
      let total_price_option = [];
      options.forEach((element, index) => {
        element.items.forEach(item => {
          if (item.isDefault) {
            total_price_option = [...total_price_option, item.price];
          }
        });
      });

      return (_.sum(total_price_option) + price) * quantity;
    } else {
      return price * quantity;
    }
  }
  calculateOption() {
    const {options} = this.state;
    if (checkAllArrayIsNotEmpty(options)) {
      let total_name_option = [];
      options.forEach((element, index) => {
        element.items.forEach(item => {
          if (item.isDefault) {
            total_name_option = [...total_name_option, item.name];
          }
        });
      });

      return total_name_option.toString().replace(/\,/g, ', ');
    } else {
      return '';
    }
  }
  calculateTotalProduct() {
    const {order} = this.state;
    let total = 0;
    order.users.forEach(user => {
      user.dishes.forEach(dish => {
        total = total + dish.qty;
      });
    });
    return total;
  }
  renderModal() {
    const {product, options} = this.state;
    if (checkAllArrayIsNotEmpty(product) == false) return null;
    else
      return (
        <Modal
          isVisible={this.state.showModal}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          onRequestClose={() => this.hideOptionModal()}
          style={{justifyContent: 'flex-end', margin: 0}}>
          <View
            style={[
              {
                flex: 1,
              },
            ]}>
            <View
              style={{
                flex: 1,
                borderRadius: 5,
                backgroundColor: '#FFF',
                marginTop: height / 5,
                paddingBottom: Insets.BOTTOM,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#E6E6E6',
                  alignItems: 'center',
                }}>
                <View style={{flex: 0.5}}>
                  <TouchableOpacity
                    onPress={() => this.hideOptionModal()}
                    style={{padding: 10}}>
                    <Ionicons name="md-close" size={30} color="#5F5F5F" />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#5F5F5F',
                      fontWeight: 'bold',
                    }}>
                    Tuỳ chọn món
                  </Text>
                </View>
                <View style={{flex: 0.5}}></View>
              </View>
              <View style={{padding: 10}}>
                <View style={{flexDirection: 'row', paddingVertical: 10}}>
                  <Image
                    source={{
                      uri: product.photos[product.photos.length - 1].value,
                    }}
                    style={{height: 100, width: 100, borderRadius: 10}}
                  />
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 15,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{paddingBottom: 5}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#5F5F5F',
                          fontWeight: 'bold',
                        }}>
                        {product.name}
                      </Text>
                      <Text style={styles.itemThreeSubtitle}>
                        {product.description}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          paddingRight: 10,
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 15, color: '#a4a4a4'}}>
                          {`${formatMoney(product.price)}đ`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  margin: 10,
                  marginTop: 0,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: Colors.GRAY_MEDIUM,
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <View style={{paddingLeft: 10}}>
                  <SimpleLineIcons name="note" size={13} />
                </View>
                <TextInput
                  style={{
                    flex: 1,
                    padding: 10,
                  }}></TextInput>
              </View>
              <ScrollView>
                {options.map((item_options, index_options) => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      backgroundColor: 'white',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#0D8BD1',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        {`${item_options.name} ${
                          item_options.isRequired ? '(Bắt buộc)' : ''
                        }`}
                      </Text>
                    </View>

                    <View>
                      {item_options.items.map((item_option, index_option) =>
                        this.renderItemOption(
                          index_options,
                          index_option,
                          item_option,
                          item_options.isRequired,
                        ),
                      )}
                    </View>
                  </View>
                ))}
              </ScrollView>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingRight: 5,
                  }}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    {`${formatMoney(
                      this.calculatePrice(product.price, product.quantity),
                    )}đ`}
                  </Text>
                  {this.calculateOption() !== '' && (
                    <Text
                      style={styles.itemThreeSubtitle}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {this.calculateOption()}
                    </Text>
                  )}
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => this.updateOrder(product)}
                    style={{
                      padding: 15,
                      backgroundColor: 'green',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text style={{color: 'white', fontSize: 15}}>
                      Thêm vào giỏ hàng
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
  }
  hideCartModal() {
    this.setState({showCartModal: false});
  }
  showCartModal() {
    this.setState({showCartModal: true});
  }
  renderItemOption(index_options, index_option, item_option, isRequired) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.seleteOption(
            index_options,
            index_option,
            item_option,
            isRequired,
            item_option.isDefault,
          )
        }>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            borderBottomColor: '#E6E6E6',
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 2,
              justifyContent: 'space-around',
            }}>
            <Text style={{fontSize: 16}}>{item_option.name}</Text>
            <Text style={{fontSize: 16}}>{`${formatMoney(
              item_option.price,
            )}đ`}</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            {item_option.isDefault ? (
              <AntDesign name="checkcircle" size={20} color="green" />
            ) : (
              <AntDesign name="checkcircleo" size={20} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  // render list product
  renderItem(dishes, item, index) {
    return (
      <TouchableOpacity
        key={item._id}
        style={{flexDirection: 'row'}}
        onPress={() => {
          this.showOptionModal(item);
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            flex: 1,
            borderBottomColor: '#E6E6E6',
            borderBottomWidth: dishes.length - 1 == index ? 0 : 0.5,
          }}>
          <Image
            source={{
              uri: item.photos[item.photos.length - 1].value,
            }}
            style={styles.itemThreeImage}
          />
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
            }}>
            <View style={{flex: 1}}>
              <Text style={styles.itemThreeTitle}>{item.name}</Text>
              <Text numberOfLines={2} style={styles.itemThreeSubtitle}>
                {item.description}
              </Text>
            </View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    paddingRight: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 15, color: '#a4a4a4'}}>
                    {`${formatMoney(item.price)}đ`}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      this.showOptionModal(item);
                    }}>
                    <AntDesign name="pluscircleo" size={25} color={'#0D8BD1'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  addNote = (value, index) => {
    const {cart} = this.props;
    let newCart = update(cart, {
      [index]: {
        note: {
          $apply: function() {
            return value;
          },
        },
      },
    });
  };
  render() {
    const {menu, order} = this.state;
    // const {order} = this.state;
    console.log('order detail', order);
    const dishes = order?.users?.[0]?.dishes ?? [];
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: Insets.BOTTOM}}>
          {menu.map((item_menu, index_menu) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  backgroundColor: Colors.PRIMARY,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  {item_menu.group}
                </Text>
              </View>

              <View style={{paddingHorizontal: 15}}>
                <FlatList
                  keyExtractor={(item, index) => item._id.toString()}
                  data={item_menu.dishes}
                  extraData={this.state}
                  renderItem={({item, index}) =>
                    this.renderItem(item_menu.dishes, item, index)
                  }></FlatList>
              </View>
            </View>
          ))}
        </ScrollView>
        {this.renderModal()}
        {checkAllArrayIsNotEmpty(dishes) && (
          <TouchableOpacity
            onPress={() => this.showCartModal()}
            activeOpacity={0.8}
            style={{
              padding: 15,
              paddingBottom: Insets.BOTTOM,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.PRIMARY,
            }}>
            <View>
              <FontAwesome name="shopping-cart" size={28} color="white" />
              <View
                style={{
                  position: 'absolute',
                  right: -8,
                  top: -4,
                  backgroundColor: Colors.ALERT,
                  borderRadius: 9,
                  width: 18,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}>
                  {this.calculateTotalProduct()}
                </Text>
              </View>
            </View>
            <View style={{flex: 1, paddingLeft: 15, paddingRight: 10}}>
              <Text
                style={{
                  fontSize: 17,
                  color: 'white',
                  fontWeight: '600',
                }}>
                {`${formatMoney(this.calculatePriceCart())}đ`}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'black', fontSize: 18}}>Đặt hàng</Text>
              </TouchableOpacity>
            </View>
            <Cart
              isVisible={this.state.showCartModal}
              onClose={() => {
                this.hideCartModal();
              }}
              data={order}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemThreeImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  itemThreeTitle: {
    fontSize: 16,
    color: '#5F5F5F',
    fontWeight: 'bold',
  },
  itemThreeSubtitle: {
    fontSize: 14,
    color: '#a4a4a4',
  },
});
const mapStateToProps = state => (
  console.log('state', state),
  {
    menu: state.app.menu,
    cart: state.dataLocal.cart,
    order: state.app.order,
  }
);

export default connectRedux(mapStateToProps, index);
