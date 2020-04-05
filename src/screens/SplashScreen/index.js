import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Linking,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import connectRedux from '@redux/connectRedux';
import {checkAllArrayIsNotEmpty} from '@utils/func';
import images from '@resources/images';
import {width, height} from '@configs/styles';
import Shimmer from 'react-native-shimmer';
import Colors from '@assets/colors';
import SplashScreen from 'react-native-splash-screen';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    SplashScreen.hide();
    this.checkRouter();
    // if (Platform.OS === 'android') {
    //   Linking.getInitialURL().then((url) => {
    //     this.navigate(url);
    //   });
    // } else {
    //   Linking.addEventListener('url', this.handleOpenURL);
    // }
  }
  // handleOpenURL = (event) => {
  //   this.navigate(event.url);
  // };
  // navigate = (url) => {
  //   const {navigate} = this.props.navigation;
  //   const route = url.replace(/.*?:\/\//g, '');
  //   // const id = route.match(/\/([^\/]+)\/?$/)[1];
  //   const routeName = route.split('/')[0];
  //   console.log('routeName', routeName);
  //   if (routeName === 'store') {
  //     navigate('Store', {id: ''});
  //   }
  // };
  // componentWillUnmount() {
  //   Linking.removeEventListener('url', this.handleOpenURL);
  // }
  //
  checkRouter = async () => {
    const {profile} = this.props;
    if (checkAllArrayIsNotEmpty(profile)) {
      this.props.navigation.navigate('TabNavigator');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.PRIMARY,
        }}>
        <Shimmer>
          <View>
            <Image source={images.logo} />
          </View>
        </Shimmer>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.dataLocal.profile,
});

export default connectRedux(mapStateToProps, index);
