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
import connectRedux from '@redux/connectRedux';

class index extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Trang chủ',
  });
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.actions.app.getStores();
    this.props.actions.auth.getProfile();
  }
  logout = () => {
    this.props.actions.auth.logout();
    this.props.navigation.navigate('Login');
  };
  gotoStore = _id => {
    this.props.navigation.navigate('Store', {id: _id});
  };
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
              <Text style={styles.itemThreeTitle}>{item.name}</Text>
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
    console.log('this.props.listStores', this.props.listStores);
    return (
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          data={this.props.listStores}
          style={{paddingHorizontal: 15, backgroundColor: 'white'}}
          renderItem={(item, index) => this.renderItem(item, index)}
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
    fontWeight: 'bold',
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

  loading: state.auth.loadingLogin,
  profile: state.dataLocal.profile,
  loginSuccess: state.auth.loginSuccess,
  listStores: state.app.listStores,
});

export default connectRedux(mapStateToProps, index);
