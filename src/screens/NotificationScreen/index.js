import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import connectRedux from '@redux/connectRedux';

export class index extends Component {
  render() {
    return (
      <View>
        <Text>Notification</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({});

export default connectRedux(mapStateToProps, index);
