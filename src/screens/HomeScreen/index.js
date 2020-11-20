import Colors from '@assets/colors';
import {height, width} from '@configs/styles';
import connectRedux from '@redux/connectRedux';
import React from 'react';
import {StyleSheet, View} from 'react-native';

function index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
      }}
    />
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
const mapStateToProps = state => ({
  user: state.dataLocal.user,
  profile: state.dataLocal.profile,
  loginSuccess: state.auth.loginSuccess,
  errorLogin: state.auth.errorLogin,
});

export default connectRedux(mapStateToProps, index);
