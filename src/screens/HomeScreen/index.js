import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {Text, TextInput} from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import connectRedux from '@redux/connectRedux';
import Colors from '@assets/colors';
import normalize from 'react-native-normalize';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }
  componentDidMount() {
    this.props.actions.app.showLoading();
    this.props.actions.app.getStores();
    this.props.actions.auth.getProfile();
  }
  gotoStore = _id => {
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
        style={styles.itemThreeContainer}
        onPress={() => {
          this.gotoStore(item._id);
        }}>
        <View style={styles.itemThreeSubContainer}>
          <Image
            source={{uri: item.photos[0].value}}
            style={styles.itemThreeImage}
          />
          <View style={styles.itemThreeContent}>
            <View>
              <Text bold style={styles.itemThreeTitle}>
                {item.name}
              </Text>
              <Text style={styles.itemThreeSubtitle}>{item.address}</Text>
            </View>
            {/* <View style={styles.itemThreeMetaContainer}>
              {item.badge && (
                <View
                  style={[
                    styles.badge,
                    item.badge === 'NEW' && {backgroundColor: 'green'},
                  ]}>
                  <Text
                    style={{fontSize: 10, color: 'white'}}
                    styleName="bright">
                    {item.badge}
                  </Text>
                </View>
              )}
              <Text style={styles.itemThreePrice}>{item.price}</Text>
            </View> */}
          </View>
        </View>
        <View style={styles.itemThreeHr} />
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
        }}>
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
                onChangeText={value => this.onChaneKeyword(value)}
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
          keyExtractor={item => item._id}
          data={listStores}
          style={{paddingHorizontal: 15, backgroundColor: 'white'}}
          renderItem={(item, index) => this.renderItem(item, index)}
          onEndReached={() => this.loadMoreStore()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneTitle: {
    fontSize: 15,
  },
  itemOneSubTitle: {
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: 'white',
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: 'white',
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: 'white',
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontSize: 14,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
const mapStateToProps = state => ({
  dataLocal: state.dataLocal,
  metaDataListStore: state.app.metaDataListStore,
  loading: state.auth.loadingLogin,
  profile: state.dataLocal.profile,
  loginSuccess: state.auth.loginSuccess,
  listStores: state.app.listStores,
});

export default connectRedux(mapStateToProps, index);
