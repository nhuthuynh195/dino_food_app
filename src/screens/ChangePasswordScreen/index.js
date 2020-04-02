import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, ImageBackground} from 'react-native';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import connectRedux from '@redux/connectRedux';
import images from '@resources/images';
import {width, height} from '@configs/styles';
import NavigatorServices from '@navigators/NavigatorServices';

function index(props) {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  function onChangeToken(value) {
    setToken(value);
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
      props.actions.auth.changePassword({
        token: token,
        password: password,
        passwordConfirm: confirmPassword,
      });
    }
  }
  useEffect(() => {
    const {changePasswordMessage, changePasswordCode} = props;
    if (changePasswordMessage !== '' && changePasswordCode == 200) {
      let errorMessage = `${changePasswordMessage}`;
      props.alertWithType('success', 'Success', errorMessage);
      props.actions.auth.resetStateLogin();
      NavigatorServices.reset('Login');
    } else if (changePasswordMessage !== '') {
      let errorMessage = `${changePasswordMessage}`;
      props.alertWithType('error', 'Error', errorMessage);
      props.actions.auth.resetStateLogin();
    }
  }, [props.changePasswordMessage, props.changePasswordCode]);
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
                Vui lòng kiểm tra email vào nhập thông tin vào ô bên dưới để
                tiếp tục.
              </Text>
            </View>
            <View style={{marginTop: 30}}>
              <Text style={{color: 'white', fontSize: 14}}>Reset Token</Text>
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
                placeholder="Token"
                autoCapitalize="none"
                value={token}
                onChangeText={onChangeToken}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{color: 'white', fontSize: 14}}>Mật khẩu mới</Text>
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
                Nhập lại mật khẩu mới
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
                  backgroundColor: '#0273CC',
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
  changePasswordMessage: state.auth.changePassword.message,
  changePasswordCode: state.auth.changePassword.code,
});

export default connectRedux(mapStateToProps, index);
