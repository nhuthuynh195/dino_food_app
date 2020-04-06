import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Text, TextInput} from '@components';
import Colors from '@assets/colors';
import connectRedux from '@redux/connectRedux';
import images from '@resources/images';
import {width, height} from '@configs/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function index(props) {
  const [email, setEmail] = useState(props.user.email);

  function handleEmailChange(value) {
    setEmail(value);
  }
  function forgetPasword() {
    props.actions.auth.forgetPassword({
      email: email,
    });
  }
  useEffect(() => {
    const {forgetPasswordMessage, forgetPasswordCode} = props;
    if (forgetPasswordMessage !== '' && forgetPasswordCode == 200) {
      let successMessage = `${forgetPasswordMessage}`;
      props.alertWithType('success', 'Success', successMessage);
      props.actions.auth.resetStateLogin();
      props.navigation.navigate('ChangePassword');
    } else if (forgetPasswordMessage !== '') {
      let errorMessage = `${forgetPasswordMessage}`;
      props.alertWithType('error', 'Error', errorMessage);
      props.actions.auth.resetStateLogin();
    }
  }, [props.forgetPasswordMessage, props.forgetPasswordCode]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.PRIMARY,
      }}>
      <KeyboardAwareScrollView>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 20,
          }}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 17}}>
            Vui lòng nhập email vào ô bên dưới, chúng tôi sẽ gửi thông tin vào
            email của bạn.
          </Text>
          <View style={{marginTop: 5}}>
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
              autoCapitalize="none"
              value={email}
              onChangeText={handleEmailChange}
            />
          </View>
          <View style={{marginTop: 5}}>
            <TouchableOpacity
              style={{
                padding: 10,
                marginTop: 20,
                backgroundColor: Colors.BUTTON,
                borderRadius: 4,
                alignItems: 'center',
              }}
              onPress={forgetPasword}>
              <Text style={{color: 'white'}}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  user: state.dataLocal.user,
  forgetPasswordMessage: state.auth.forgetPassword.message,
  forgetPasswordCode: state.auth.forgetPassword.code,
});

export default connectRedux(mapStateToProps, index);
