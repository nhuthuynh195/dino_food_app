import {Platform} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
const Insets = {
  TOP: Platform.OS == 'ios' ? StaticSafeAreaInsets.safeAreaInsetsTop : 0,
  BOTTOM: Platform.OS == 'ios' ? StaticSafeAreaInsets.safeAreaInsetsBottom : 0,
  LEFT: Platform.OS == 'ios' ? StaticSafeAreaInsets.safeAreaInsetsLeft : 0,
  RIGHT: Platform.OS == 'ios' ? StaticSafeAreaInsets.safeAreaInsetsRight : 0,
};
export default Insets;
