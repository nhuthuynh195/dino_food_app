import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import connectRedux from '@redux/connectRedux';
import images from '@resources/images';
import {width, height} from '@configs/styles';
import NavigatorServices from '@navigators/NavigatorServices';
import Colors from '@assets/colors';
import {Text, TextInput} from '@components';
index.navigationOptions = {
  headerTitle: <Text style={{color: 'white', fontSize: 18}}>Đăng ký</Text>,
  headerTransparent: true,
  headerStyle: {borderBottomWidth: 0},
  headerTintColor: 'white',
};
function index(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  function onChangeEmail(value) {
    setEmail(value);
  }
  function onChangePassword(value) {
    setPassword(value);
  }
  function onChangeConfirmPassword(value) {
    setConfirmPassword(value);
  }
  function changePassword() {
    if (password !== confirmPassword) {
      let errorMessage = `Mật khẩu không khớp. Hãy thử lại.`;
      props.alertWithType('error', 'Error', errorMessage);
    } else {
      props.actions.auth.register({
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
      });
    }
  }
  useEffect(() => {
    const {registerMessage, registerCode} = props;
    if (registerMessage !== '' && registerCode == 200) {
      let successMessage = `${registerMessage}`;
      props.alertWithType('success', 'Success', successMessage);
      props.actions.auth.resetStateLogin();
      NavigatorServices.reset('Login');
    } else if (registerMessage !== '') {
      let errorMessage = `${registerMessage}`;
      props.alertWithType('error', 'Error', errorMessage);
      props.actions.auth.resetStateLogin();
    }
  }, [props.registerMessage, props.registerCode]);
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
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          bounces={false}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            <View>
              <Text style={{color: 'white', textAlign: 'center', fontSize: 17}}>
                Vui lòng đầy đủ nhập thông tin vào ô bên dưới để tiếp tục.
              </Text>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={{color: 'white', fontSize: 14}}>Email</Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  height: 40,
                  paddingHorizontal: 10,
                  borderRadius: 4,
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginTop: 10,
                }}
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={onChangeEmail}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{color: 'white', fontSize: 14}}>Mật khẩu</Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  height: 40,
                  paddingHorizontal: 10,
                  borderRadius: 4,
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginTop: 10,
                }}
                placeholder="Mật khẩu"
                autoCapitalize="none"
                secureTextEntry
                value={password}
                onChangeText={onChangePassword}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{color: 'white', fontSize: 14}}>
                Nhập lại mật khẩu
              </Text>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  height: 40,
                  paddingHorizontal: 10,
                  borderRadius: 4,
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginTop: 10,
                }}
                placeholder="Nhập lại mật khẩu"
                autoCapitalize="none"
                secureTextEntry
                value={confirmPassword}
                onChangeText={onChangeConfirmPassword}
              />
            </View>

            <View style={{marginTop: 20}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  marginTop: 20,
                  backgroundColor: Colors.BUTTON,
                  borderRadius: 4,
                  alignItems: 'center',
                }}
                onPress={changePassword}>
                <Text style={{color: 'white'}}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const mapStateToProps = state => ({
  registerMessage: state.auth.register.message,
  registerCode: state.auth.register.code,
});

export default connectRedux(mapStateToProps, index);
