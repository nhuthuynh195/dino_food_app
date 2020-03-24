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
import Feather from 'react-native-vector-icons/Feather';

import {width, height} from '@configs/styles';
import {checkAllArrayIsNotEmpty} from '@utils/func';
index.navigationOptions = {
  title: 'Back',
  headerShown: false,
};
function index(props) {
  let remember_email = checkAllArrayIsNotEmpty(props.user.email)
    ? props.user.email
    : '';
  let remember_password = checkAllArrayIsNotEmpty(props.user.password)
    ? props.user.password
    : '';
  let remember_me = props.user.remember;
  const [email, setEmail] = useState(remember_email);
  const [password, setPassword] = useState(remember_password);
  const [remember, setRemember] = useState(remember_me);

  function handleEmailChange(value) {
    setEmail(value);
  }
  function handlePasswordChange(value) {
    setPassword(value);
  }
  function rememberMe() {
    setRemember(!remember);
  }
  function login() {
    console.log('remember', remember);
    if (email !== '' && password !== '') {
      props.actions.auth.login({
        email: email,
        password: password,
        remember: remember,
      });
    } else {
      props.alertWithType(
        'warn',
        'Thông báo',
        'Vui lòng nhập đầy đủ thông tin.',
      );
    }
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
        if (remember) {
          props.actions.dataLocal.saveUser({
            email: email,
            password: password,
            remember: remember,
          });
        } else {
          props.actions.dataLocal.saveUser({
            email: '',
            password: '',
            remember: false,
          });
        }
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
              paddingHorizontal: 10,
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
              paddingHorizontal: 10,
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
          <View
            style={{
              marginTop: 15,
              marginHorizontal: 20,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TouchableOpacity
                onPress={remember => rememberMe(remember)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {remember ? (
                  <Feather
                    name="check-square"
                    size={25}
                    style={{height: 25}}
                    color="#00bbc9"
                  />
                ) : (
                  <Feather
                    name="square"
                    size={25}
                    style={{height: 25}}
                    color="white"
                  />
                )}
                <View
                  style={{
                    paddingLeft: 5,
                  }}>
                  <Text style={{fontSize: 15, color: 'white'}}>
                    Remember me?
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                flex: 1,
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}
                onPress={forgetPassword}>
                <Text style={{color: 'white', fontSize: 15}}>
                  Quên mật khẩu?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
          {/* <TouchableOpacity
            style={{
              padding: 5,
              marginTop: 15,
              alignItems: 'center',
              marginHorizontal: 20,
            }}
            onPress={forgetPassword}>
            <Text style={{color: 'white', fontSize: 15}}>Quên mật khẩu?</Text>
          </TouchableOpacity> */}
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
const mapStateToProps = state => (
  console.log('state', state),
  {
    user: state.dataLocal.user,
    profile: state.dataLocal.profile,
    loginSuccess: state.auth.loginSuccess,
    errorLogin: state.auth.errorLogin,
  }
);

export default connectRedux(mapStateToProps, index);
