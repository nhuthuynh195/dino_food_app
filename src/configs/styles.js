import {Platform, Dimensions, StyleSheet} from 'react-native';
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
import Colors from '@assets/colors';
export const Styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.GRAY_MEDIUM,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});
