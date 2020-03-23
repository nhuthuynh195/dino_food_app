import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
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

class index extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Cửa hàng',
  });
  constructor(props) {
    super(props);

    this.state = {
      menu: [],
      menuIsNull: true,
      showModal: false,
      showCartModal: false,
      product: {},
      options: [],
      _index_menu: -1,
      _index_product: -1,
      cart: [],
    };
  }
  componentDidMount() {
    this.props.actions.dataLocal.addToCart([]),
      this.props.actions.app.getStoreById(
        this.props.navigation.state.params.id,
      );
  }
  componentWillReceiveProps(nextProps) {
    if (checkAllArrayIsNotEmpty(nextProps.menu) && this.state.menuIsNull) {
      this.setState({
        menu: Object.values(nextProps.menu),
        menuIsNull: false,
      });
    }
  }
  async showModal(item, index_menu, index_product, quantity) {
    let _option = item.options;
    let _quantity = quantity !== undefined ? quantity : 0;
    let _product = {
      _id: item._id,
      name: item.name,
      photos: item.photos,
      price: item.price,
      description: item.description,
      quantity: _quantity,
    };
    await this.setState(
      {
        product: _product,
        options: _option,
        _index_menu: index_menu,
        _index_product: index_product,
        showModal: true,
      },
      () => this.addProductModal(index_menu, index_product, 0),
      this.addDefaultQuantityProduct(index_menu, index_product, _quantity),
    );
  }
  hideModal() {
    this.setState({
      showModal: false,
    });
  }
  addToCart(_index_menu, _index_product, quantity, product) {
    this.addProduct(_index_menu, _index_product, quantity);
    this.hideModal();
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
  addProduct(_index_menu, _index_product, _quantity) {
    const {menu} = this.state;
    let newCollection = update(menu, {
      [_index_menu]: {
        dishes: {
          [_index_product]: {
            quantity: {
              $apply: function(quantity) {
                return quantity + _quantity;
              },
            },
          },
        },
      },
    });
    let product = {
      _id: newCollection[_index_menu].dishes[_index_product]._id,
      name: newCollection[_index_menu].dishes[_index_product].name,
      price: this.calculatePrice(
        newCollection[_index_menu].dishes[_index_product].price,
        _quantity,
      ),
      quantity: _quantity,
      option: this.calculateOption(),
      photos: newCollection[_index_menu].dishes[_index_product].photos,
      description:
        newCollection[_index_menu].dishes[_index_product].description,
      note: '',
    };
    let cart = [...this.props.cart, product];
    this.setState({menu: newCollection}, () =>
      this.props.actions.dataLocal.addToCart(cart),
    );
  }
  addDefaultQuantityProduct(_index_menu, _index_product, _quantity) {
    const {menu} = this.state;
    let newCollection = update(menu, {
      [_index_menu]: {
        dishes: {
          [_index_product]: {
            quantity: {
              $apply: function() {
                return _quantity;
              },
            },
          },
        },
      },
    });
    this.setState({menu: newCollection});
  }
  removeProduct(_index_menu, _index_product, quantity) {
    const {menu} = this.state;
    let newCollection = update(menu, {
      [_index_menu]: {
        dishes: {
          [_index_product]: {
            quantity: {
              $apply: function() {
                return quantity - 1;
              },
            },
          },
        },
      },
    });
    this.setState({menu: newCollection});
  }
  addProductModal(_index_menu, _index_product, quantity) {
    let product = {...this.state.product};
    product.quantity = quantity + 1;
    this.setState({
      product,
    });
  }
  removeProductModal(_index_menu, _index_product, quantity) {
    let product = {...this.state.product};
    product.quantity = product.quantity > 1 ? product.quantity - 1 : 1;
    this.setState({
      product,
    });
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
  renderModal() {
    const {product, options, _index_menu, _index_product} = this.state;
    if (checkAllArrayIsNotEmpty(product) == false) return null;
    else
      return (
        <Modal
          isVisible={this.state.showModal}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          onRequestClose={() => this.hideModal()}
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
                    onPress={() => this.hideModal()}
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
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {product.quantity > 0 && (
                          <TouchableOpacity
                            onPress={() =>
                              this.removeProductModal(
                                _index_menu,
                                _index_product,
                                product.quantity,
                              )
                            }>
                            <AntDesign
                              name="minuscircleo"
                              size={25}
                              color="#0D8BD1"
                            />
                          </TouchableOpacity>
                        )}
                        {product.quantity > 0 && (
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#a4a4a4',
                              marginHorizontal: 10,
                            }}>
                            {product.quantity}
                          </Text>
                        )}
                        <TouchableOpacity
                          onPress={() =>
                            this.addProductModal(
                              _index_menu,
                              _index_product,
                              product.quantity,
                            )
                          }>
                          <AntDesign
                            name="pluscircleo"
                            size={25}
                            color="#0D8BD1"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
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
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    {`${formatMoney(
                      this.calculatePrice(product.price, product.quantity),
                    )}đ`}
                  </Text>
                  <Text
                    style={styles.itemThreeSubtitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {this.calculateOption()}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.addToCart(
                        _index_menu,
                        _index_product,
                        product.quantity,
                        product,
                      )
                    }
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
  renderCartModal() {
    console.log('this.props.cart', this.props.cart);
    return (
      <Modal
        isVisible={this.state.showCartModal}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onRequestClose={() => this.hideCartModal()}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <View style={{flex: 0.5}}>
                <TouchableOpacity
                  onPress={() => this.hideCartModal()}
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
                  Giỏ hàng
                </Text>
              </View>
              <View style={{flex: 0.5}}></View>
            </View>
            <ScrollView>
              {this.props.cart.map((item, index) => (
                <View
                  style={{
                    padding: 10,
                    borderTopWidth: 0.5,
                    borderTopColor: '#E6E6E6',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1}}>
                      <Text style={{fontSize: 18}}>{item.name}</Text>
                      {item.option !== '' && (
                        <Text
                          style={{fontSize: 15}}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item.option}
                        </Text>
                      )}
                      <Text style={{fontSize: 15}}>{`${formatMoney(
                        item.price,
                      )}đ`}</Text>
                    </View>
                    <View style={{paddingHorizontal: 10}}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity>
                          <AntDesign
                            name="minuscircleo"
                            size={25}
                            color="#0D8BD1"
                          />
                        </TouchableOpacity>

                        <Text
                          style={{
                            fontSize: 15,
                            color: '#a4a4a4',
                            marginHorizontal: 10,
                          }}>
                          {item.quantity}
                        </Text>
                        <TouchableOpacity>
                          <AntDesign
                            name="pluscircleo"
                            size={25}
                            color="#0D8BD1"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'red',
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#E6E6E6',
                        flex: 1,
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <SimpleLineIcons
                        name="note"
                        size={20}
                        style={{paddingVertical: 8}}
                      />
                      <TextInput
                        placeholder="Ghi chú"
                        value={item.note}
                        onChangeText={value => this.onChangeNote(value, index)}
                        style={{
                          marginLeft: 10,
                          paddingVertical: 8,
                          flex: 1,
                        }}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
  onChangeNote(value, index) {
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
    this.props.actions.dataLocal.addToCart(newCart);
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
  renderItem(index_menu, dishes, item, index_product) {
    return (
      <TouchableOpacity
        key={item._id}
        style={{flexDirection: 'row'}}
        onPress={() => {
          this.showModal(item, index_menu, index_product, item.quantity);
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            flex: 1,
            borderBottomColor: '#E6E6E6',
            borderBottomWidth: dishes.length - 1 == index_product ? 0 : 0.5,
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
              <Text style={styles.itemThreeSubtitle}>{item.description}</Text>
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
                  {item.quantity > 0 && (
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        this.removeProduct(
                          index_menu,
                          index_product,
                          item.quantity,
                        );
                      }}>
                      <AntDesign
                        name="minuscircleo"
                        size={25}
                        color={'#0D8BD1'}
                      />
                    </TouchableOpacity>
                  )}
                  {item.quantity > 0 && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#a4a4a4',
                        marginHorizontal: 10,
                      }}>
                      {item.quantity}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      this.showModal(
                        item,
                        index_menu,
                        index_product,
                        item.quantity,
                      );
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
  calculatePriceCart() {
    const {cart} = this.props;
    let price = 0;
    cart.forEach(element => {
      price = price + element.price;
    });
    return price;
  }
  render() {
    const {menu, optionInfo} = this.state;
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView style={{flex: 1}}>
          {menu.map((item_menu, index_menu) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  backgroundColor: '#0D8BD1',
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
                    this.renderItem(index_menu, item_menu.dishes, item, index)
                  }></FlatList>
              </View>
            </View>
          ))}
        </ScrollView>
        {checkAllArrayIsNotEmpty(optionInfo) && this.renderModal()}
        {this.props.cart.length > 0 && (
          <TouchableOpacity
            onPress={() => this.showCartModal()}
            activeOpacity={0.8}
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#0D8BD1',
            }}>
            <View>
              <FontAwesome name="shopping-cart" size={28} color="white" />
              {this.props.cart.length > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -8,
                    top: -4,
                    backgroundColor: 'red',
                    borderRadius: 9,
                    width: 18,
                    height: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
                    {this.props.cart.length}
                  </Text>
                </View>
              )}
            </View>
            <View style={{flex: 1, paddingLeft: 15, paddingRight: 10}}>
              <Text style={{fontSize: 17, color: 'white', fontWeight: '600'}}>
                {`${formatMoney(this.calculatePriceCart())}đ`}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  padding: 15,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'black', fontSize: 18}}>Đặt hàng</Text>
              </TouchableOpacity>
            </View>
            {checkAllArrayIsNotEmpty(this.props.cart) && this.renderCartModal()}
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
const mapStateToProps = state => ({
  menu: state.app.menu,
  cart: state.dataLocal.cart,
});

export default connectRedux(mapStateToProps, index);
