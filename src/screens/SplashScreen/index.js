import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Linking,
  ImageBackground,
} from 'react-native';
import connectRedux from '@redux/connectRedux';
import {checkAllArrayIsNotEmpty} from '@utils/func';
import SplashScreen from 'react-native-splash-screen';
import images from '@resources/images';
import {width, height} from '@configs/styles';
class index extends Component {
  componentDidMount() {
    // SplashScreen.hide();
    this.checkRouter();
    // if (Platform.OS === 'android') {
    //   Linking.getInitialURL().then((url) => {
    //     this.navigate(url);
    //   });
    // } else {
    //   Linking.addEventListener('url', this.handleOpenURL);
    // }
  }

  // componentWillUnmount() {
  //   Linking.removeEventListener('url', this.handleOpenURL);
  // }
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
  // Fetch the token from storage then navigate to our appropriate place
  checkRouter = async () => {
    if (checkAllArrayIsNotEmpty(this.props.profile)) {
      SplashScreen.hide();
      this.props.navigation.navigate('TabNavigator');
    } else {
      SplashScreen.hide();
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={images.splash_screen}
          resizeMode="cover"
          style={{width: width, height: height}}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.dataLocal.profile,
});

export default connectRedux(mapStateToProps, index);
