import React, {Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import connectRedux from '@redux/connectRedux';
import {checkAllArrayIsNotEmpty} from '@utils/func';
import SplashScreen from 'react-native-splash-screen';

class index extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this._bootstrapAsync();
    // this.props.navigation.navigate('Main');
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    if (checkAllArrayIsNotEmpty(this.props.profile)) {
      this.props.navigation.navigate('Main');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="white" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.dataLocal.profile,
});

export default connectRedux(mapStateToProps, index);
