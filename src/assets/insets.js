import {Platform} from 'react-native';

const Insets = {
  TOP: Platform.OS == 'ios' ? 44 : 0,
  BOTTOM: Platform.OS == 'ios' ? 34 : 0,
};
export default Insets;
