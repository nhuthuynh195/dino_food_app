import React from 'react';
import {View, Text, Animated} from 'react-native';

export default class index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.timing(this.animation, {
      toValue: 100,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }
  renderAnimation(item, index) {
    const translateX = this.animation.interpolate({
      inputRange: [25, 50, 70, 100],
      outputRange: [-30, -20, -10, -5],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={{transform: [{translateX}]}}>
        <View
          style={{
            width: 300,
            height: 100,
            backgroundColor: 'green',
            borderRadius: 5,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Card {index}</Text>
        </View>
      </Animated.View>
    );
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        {/* <Text>Animation</Text> */}
        {[1, 2, 3, 4, 5, 6].map((item, index) =>
          this.renderAnimation(item, index),
        )}
      </View>
    );
  }
}
