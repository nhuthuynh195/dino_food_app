import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import connectRedux from '@redux/connectRedux';
import images from '@resources/images';
import {Text, TextInput} from '@components';
import Colors from '@assets/colors';
import Feather from 'react-native-vector-icons/Feather';
import {width, height} from '@configs/styles';
import {checkAllArrayIsNotEmpty} from '@utils/func';
index.navigationOptions = {
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
    <View style={styles.container}>
      <ImageBackground
        source={images.background}
        resizeMode="cover"
        style={styles.image_background}>
        <View style={styles.content}>
          <Image source={images.logo} style={styles.image} />
        </View>
        <View style={{flex: 1.5}}>
          <TextInput
            style={styles.text_input}
            autoCapitalize="none"
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
          />
          <TextInput
            style={styles.text_input}
            secureTextEntry
            placeholder="Mật khẩu"
            value={password}
            onChangeText={handlePasswordChange}
          />
          <View style={styles.remember_me}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <TouchableOpacity
                onPress={remember => rememberMe(remember)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                {remember ? (
                  <Feather
                    name="check-square"
                    size={25}
                    style={styles.check_box}
                    color={Colors.BUTTON}
                  />
                ) : (
                  <Feather
                    name="square"
                    size={25}
                    style={styles.check_box}
                    color={Colors.WHITE}
                  />
                )}

                <View style={{paddingLeft: 5}}>
                  <Text style={styles.text_button}>Remember me</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={forgetPassword}>
                <Text style={styles.text_button}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.login_button} onPress={login}>
            <Text bold style={styles.text_button}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
  remember_me: {
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  check_box: {
    height: 25,
  },
  text_button: {
    fontSize: 15,
    color: Colors.WHITE,
  },
  login_button: {
    padding: 10,
    marginTop: 15,
    backgroundColor: Colors.BUTTON,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
const mapStateToProps = state => ({
  user: state.dataLocal.user,
  profile: state.dataLocal.profile,
  loginSuccess: state.auth.loginSuccess,
  errorLogin: state.auth.errorLogin,
});

export default connectRedux(mapStateToProps, index);
