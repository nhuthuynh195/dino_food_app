import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import connectRedux from '@redux/connectRedux';
import images from '@resources/images';
import {width, height} from '@configs/styles';
const eventTypeLogout = 'LOGIN';
class index extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: (
      <Text style={{color: 'white', fontSize: 18}}>Quên mật khẩu</Text>
    ),
    headerTransparent: true,
    headerStyle: {borderBottomWidth: 0},
    // headerTintColor: 'white',
  });

  reSentPassword = () => {};
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <ImageBackground
          source={images.background}
          resizeMode="cover"
          style={{height: height, width: width}}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Vui lòng nhập email vào ô bên dưới, chúng tôi sẽ gửi mật khẩu mới
              vào email của bạn
            </Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                height: 40,
                paddingHorizontal: 10,
                borderRadius: 4,
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 20,
              }}
              placeholder="Email"
            />

            <TouchableOpacity
              style={{
                padding: 10,
                marginTop: 20,
                backgroundColor: '#0273CC',
                borderRadius: 4,
                alignItems: 'center',
              }}
              onPress={() => this.reSentPassword()}>
              <Text style={{color: 'white'}}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  loadingLogin: state.auth.loadingLogin,
  profile: state.dataLocal.profile,
  loginSuccess: state.auth.loginSuccess,
  errorLogin: state.auth.errorLogin,
});

export default connectRedux(mapStateToProps, index);
