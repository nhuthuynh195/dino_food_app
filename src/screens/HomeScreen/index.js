import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  Linking,
  StatusBar,
} from 'react-native';
import {Text, TextInput} from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import connectRedux from '@redux/connectRedux';
import Colors from '@assets/colors';
import normalize from 'react-native-normalize';
import Insets from '@assets/insets';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
    this.props.actions.app.showLoading();
    this.props.actions.app.getStores();
    this.props.actions.auth.getProfile();
  }
  getUrlParameters(parameter, parArr, decode) {
    returnBool = true;
    for (var i = 0; i < parArr.length; i++) {
      parr = parArr[i].split('=');
      if (parr[0] == parameter) {
        return decode ? decodeURIComponent(parr[1]) : parr[1];
      } else {
        returnBool = false;
      }
    }
    if (!returnBool) return false;
  }

  handleOpenURL = (event) => {
    this.navigate(event.url);
  };
  navigate = (url) => {
    console.log('url', url);
    const {navigate} = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    let arrRouter = route.split('?');
    const routeName = route.split('?')[0];
    if (routeName === 'store') {
      let _idStore = this.getUrlParameters('id_store', arrRouter, true);
      let _idOrder = this.getUrlParameters('id_order', arrRouter, true);
      navigate('Store', {
        idStore: _idStore,
        idOrder: _idOrder,
      });
    } else {
      navigate('TabNavigator');
    }
  };
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  gotoStore = (_id) => {
    this.props.navigation.navigate('Store', {idStore: _id});
  };
  onChaneKeyword(value) {
    clearTimeout(this.timer);
    this.setState({keyword: value});
    this.timer = setTimeout(() => {
      this.searchStore(value);
    }, 1000);
  }
  clearKeyword() {
    clearTimeout(this.timer);
    this.setState({keyword: ''});
    this.props.actions.app.showLoading();
    this.props.actions.app.getStores();
  }
  searchStore() {
    const {keyword} = this.state;
    this.props.actions.app.showLoading();
    this.props.actions.app.getStores(1, (sortBy = '-createdAt'), keyword);
  }
  loadMoreStore() {
    const {keyword} = this.state;
    const {metaDataListStore} = this.props;
    const {page, pages} = metaDataListStore;
    const {keyword} = this.state;

    if (page < pages) {
      this.props.actions.app.getStores(
        page + 1,
        (sortBy = '-createdAt'),
        keyword,
      );
    }
  }
  renderItem({item, index}) {
    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => {
          this.gotoStore(item._id);
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
          }}>
          <Image
            source={{uri: item.photos[0].value}}
            style={{
              height: 100,
              width: 100,
              borderRadius: 10,
            }}
          />
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                bold
                style={{
                  fontSize: 16,
                  color: '#5F5F5F',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#a4a4a4',
                }}>
                {item.address}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: '#e3e3e3',
          }}
        />
      </TouchableOpacity>
    );
  }
  render() {
    const {listStores} = this.props;
    const {keyword} = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.WHITE,
          paddingTop: Insets.TOP,
        }}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.WHITE} />

        <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
          <View
            style={{
              borderColor: Colors.PRIMARY,
              borderWidth: 1,
              borderRadius: 50,
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Ionicons name="ios-search" size={24} color={Colors.PRIMARY} />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <TextInput
                placeholderTextColor={Colors.GRAY_MEDIUM}
                placeholder="Tìm kiếm..."
                style={{
                  color: Colors.BLACK,
                  paddingVertical: normalize(10),
                }}
                value={keyword}
                onChangeText={(value) => this.onChaneKeyword(value)}
              />
            </View>
            {keyword !== '' && (
              <TouchableOpacity
                onPress={() => this.clearKeyword()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Ionicons
                  name="ios-close-circle"
                  size={24}
                  color={Colors.GRAY_MEDIUM}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <FlatList
          keyExtractor={(item) => item._id}
          data={listStores}
          style={{paddingHorizontal: 15, backgroundColor: 'white'}}
          renderItem={(item, index) => this.renderItem(item, index)}
          onEndReached={() => this.loadMoreStore()}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  dataLocal: state.dataLocal,
  metaDataListStore: state.app.metaDataListStore,
  loading: state.auth.loadingLogin,
  profile: state.dataLocal.profile,
  loginSuccess: state.auth.loginSuccess,
  listStores: state.app.listStores,
});

export default connectRedux(mapStateToProps, index);
