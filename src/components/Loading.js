//import liraries
import React, {Component} from 'react';
import {Platform, Dimensions, StatusBar, StyleSheet} from 'react-native';
import {View, ActivityIndicator, Modal} from 'react-native';
import connectRedux from '@redux/connectRedux';
import BouncingPreloader from 'react-native-bouncing-preloader';

const height =
  Platform.OS === 'android' && Platform.Version > 26
    ? Dimensions.get('screen').height - StatusBar.currentHeight
    : Dimensions.get('window').height;
// create a component
class Loading extends Component {
  render() {
    if (this.props.loading)
      return (
        <View style={styles.show}>
          <BouncingPreloader
            icons={[
              'https://www.shareicon.net/data/128x128/2017/01/08/869359_candy_512x512.png',
            ]}
            leftRotation="-0deg"
            rightRotation="0deg"
            leftDistance={-180}
            rightDistance={-180}
            speed={1200}
          />
          {/* <ActivityIndicator color="white" size="large" /> */}
        </View>
      );
    else return <View style={styles.hide} />;
  }
}

const styles = StyleSheet.create({
  show: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    height: height,
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
  },

  hide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 0,
    width: 0,
  },
});

const mapStateToProps = state => ({
  loading: state.app.loading,
});

export default connectRedux(mapStateToProps, Loading);
