import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import connectRedux from '@redux/connectRedux';
import images from '@resources/images';
import {Text, TextInput} from '@components';
import Colors from '@assets/colors';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {width, height} from '@configs/styles';
import {checkAllArrayIsNotEmpty} from '@utils/func';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
function index(props) {
  let remember_email = checkAllArrayIsNotEmpty(props.user.email)
    ? props.user.email
    : '';
  let remember_password = checkAllArrayIsNotEmpty(props.user.password)
    ? props.user.password
    : '';
  let remember_me = props?.user?.remember ?? false;
  const [email, setEmail] = useState(remember_email);
  const [password, setPassword] = useState(remember_password);
  const [hidePassword, setHidePassword] = useState(true);
  const [remember, setRemember] = useState(remember_me);
  useEffect(() => {
    props.actions.auth.logout();
  }, []);
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
    if (email !== '' && password !== '') {
      console.log('remember', remember);
      if (remember) {
        props.actions.dataLocal.saveUser({
          email: email,
          password: password,
          remember: remember,
        });
      } else {
        props.actions.dataLocal.saveUser({
          email: email,
          password: '',
          remember: false,
        });
      }

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
    const {loginSuccess, errorLogin, profile} = props;
    if (loginSuccess) {
      if (checkAllArrayIsNotEmpty(profile)) {
        props.actions.auth.resetStateLogin();
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
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
      }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY} />
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 20,
            }}>
            <Image source={images.logo} style={styles.image} />
          </View>
          <View style={{flex: 2}}>
            <TextInput
              keyboardType="email-address"
              style={styles.text_input}
              autoCapitalize="none"
              placeholder="Email"
              value={email}
              onChangeText={handleEmailChange}
            />
            <View
              style={{
                backgroundColor: Colors.WHITE,
                flexDirection: 'row',
                alignContent: 'center',
                marginHorizontal: 20,
                borderRadius: 4,
              }}>
              <TextInput
                style={{
                  flex: 1,
                  height: 45,
                  paddingHorizontal: 10,
                }}
                secureTextEntry={hidePassword}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={handlePasswordChange}
              />
              <TouchableOpacity
                onPress={() => setHidePassword(!hidePassword)}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}>
                <Ionicons
                  name={hidePassword ? 'md-eye' : 'md-eye-off'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.remember_me}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <TouchableOpacity
                  onPress={remember => rememberMe(remember)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                    paddingLeft: 0,
                  }}>
                  <Text>
                    {remember ? (
                      <Feather
                        name="check-square"
                        size={20}
                        style={styles.check_box}
                        color={Colors.WHITE}
                      />
                    ) : (
                      <Feather
                        name="square"
                        size={20}
                        style={styles.check_box}
                        color={Colors.WHITE}
                      />
                    )}
                  </Text>
                  <View style={{paddingLeft: 5}}>
                    <Text style={styles.text_button}>Remember me</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    padding: 5,
                    paddingRight: 0,
                  }}
                  onPress={forgetPassword}>
                  <Text style={styles.text_button}>Quên mật khẩu?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.login_button} onPress={login}>
              <Text bold style={{color: Colors.BLACK}}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  image_background: {
    height: height,
    width: width,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 110,
    height: 98,
  },
  text_input: {
    backgroundColor: Colors.WHITE,
    height: 45,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 4,
    marginBottom: 20,
  },
  remember_me: {
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  check_box: {
    height: 20,
  },
  text_button: {
    fontSize: 15,
    color: Colors.WHITE,
  },
  login_button: {
    height: 45,
    backgroundColor: Colors.WHITE,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'center',
  },
});
const mapStateToProps = state => (
  console.log('state login', state),
  {
    user: state.dataLocal.user,
    profile: state.dataLocal.profile,
    loginSuccess: state.auth.loginSuccess,
    errorLogin: state.auth.errorLogin,
  }
);

export default connectRedux(mapStateToProps, index);
