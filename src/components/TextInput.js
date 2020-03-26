import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
const CustomTextInput = React.memo(function CustomTextInput(props) {
  return (
    <TextInput
      {...props}
      allowFontScaling={false}
      style={[
        DefaultStyle.text_input,
        props.style,
        {
          fontFamily: props.bold ? 'Quicksand-Bold' : 'Quicksand-Regular',
        },
      ]}
    />
  );
});

const DefaultStyle = StyleSheet.create({
  text_input: {
    color: '#000000',
  },
});

export default CustomTextInput;
