import React from 'react';
import {Text, StyleSheet} from 'react-native';
const CustomText = React.memo(function CustomText(props) {
  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[
        DefaultStyle.text,
        props.style,
        {fontFamily: props.bold ? 'Quicksand-Medium' : 'Quicksand-Regular'},
      ]}>
      {props.children}
    </Text>
  );
});

const DefaultStyle = StyleSheet.create({
  text: {
    color: '#000000',
  },
});

export default CustomText;
