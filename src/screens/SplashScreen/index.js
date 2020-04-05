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
  }
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
