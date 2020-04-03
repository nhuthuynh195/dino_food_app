import React, {Component} from 'react';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, TextInput} from '@components';
export default class IconWithBadge extends Component {
  render() {
    const {name, badgeCount, color, size} = this.props;
    return (
      <View style={{width: 24, height: 24, margin: 5}}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 9,
              width: 18,
              height: 18,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text bold style={{color: 'white', fontSize: 10}}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
