import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import connectRedux from '@redux/connectRedux';
import images from '@resources/images';
import {width, height} from '@configs/styles';
import {checkAllArrayIsNotEmpty} from '@utils/func';
index.navigationOptions = {
  title: 'Back',
  headerShown: false,
};
function index(props) {
  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState('');
  function handleEmailChange(value) {
    setEmail(value);
  }
  function handlePasswordChange(value) {
    setPassword(value);
  }
  function login() {
    if (email !== '' && password !== '') {
      props.actions.auth.login({
        email: email,
        password: password,
        remember: true,
      });
    } else {
      props.alertWithType(
        'warn',
        'Thông báo',
        'Vui lòng nhập đầy đủ thông tin.',
      );
    }
  }
  function logout() {
    props.actions.auth.logout();
  }
  function forgetPassword() {
    props.navigation.navigate('ForgetPassword');
  }
  useEffect(() => {
    console.log('props', props);
    const {loginSuccess, errorLogin, profile} = props;
    if (loginSuccess) {
      props.actions.auth.resetStateLogin();
      if (checkAllArrayIsNotEmpty(profile)) {
        props.actions.dataLocal.saveUser({
          email: email,
        });
        props.navigation.navigate('Main');
      }
    }
    if (errorLogin !== '' && !loginSuccess) {
      let errorMessage = `${errorLogin}`;
      props.alertWithType('error', 'Error', errorMessage);
      props.actions.auth.resetStateLogin();
    }
  }, [props.loginSuccess, props.errorLogin]);
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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image source={images.logo} style={{width: 300, height: 300}} />
        </View>
        <View style={{flex: 1}}>
          <TextInput
            style={{
              backgroundColor: 'white',
              height: 40,
              paddingHorizontal: 20,
              marginHorizontal: 20,
              borderRadius: 4,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            autoCapitalize="none"
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
          />
          <TextInput
            style={{
              backgroundColor: 'white',
              height: 40,
              paddingHorizontal: 20,
              marginHorizontal: 20,
              borderRadius: 4,
              borderColor: 'gray',
              borderWidth: 1,
              marginTop: 10,
            }}
            secureTextEntry
            placeholder="Mật khẩu"
            value={password}
            onChangeText={handlePasswordChange}
          />

          <TouchableOpacity
            style={{
              padding: 10,
              marginTop: 15,
              backgroundColor: '#0273CC',
              borderRadius: 4,
              alignItems: 'center',
              marginHorizontal: 20,
            }}
            onPress={login}>
            <Text style={{color: 'white', fontSize: 15}}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              marginTop: 15,
              alignItems: 'center',
              marginHorizontal: 20,
            }}
            onPress={forgetPassword}>
            <Text style={{color: 'white', fontSize: 15}}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              padding: 5,
              marginTop: 15,
              alignItems: 'center',
              marginHorizontal: 20,
            }}
            onPress={logout}>
            <Text style={{color: 'white'}}>Logout</Text>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
}
const mapStateToProps = state => ({
  user: state.dataLocal.user,
  profile: state.dataLocal.profile,
  loginSuccess: state.auth.loginSuccess,
  errorLogin: state.auth.errorLogin,
});

export default connectRedux(mapStateToProps, index);
