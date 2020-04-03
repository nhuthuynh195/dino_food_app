import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

class NotiProvider extends Component {
  static get childContextTypes() {
    return {
      alertWithType: PropTypes.func,
    };
  }

  static get propTypes() {
    return {
      children: PropTypes.any,
    };
  }

  getChildContext() {
    return {
      alertWithType: (...args) => this.dropdown.alertWithType(...args),
    };
  }

  render() {
    const {children} = this.props;
    return (
      <View style={{flex: 1}}>
        {React.Children.only(children)}
        <DropdownAlert
          ref={ref => {
            this.dropdown = ref;
          }}
          titleStyle={{
            fontFamily: 'Quicksand-Bold',
            fontSize: 16,
            textAlign: 'left',
            color: 'white',
            backgroundColor: 'transparent',
          }}
          messageStyle={{
            fontFamily: 'Quicksand-Bold',
            fontSize: 14,
            textAlign: 'left',
            color: 'white',
            backgroundColor: 'transparent',
          }}
          closeInterval={1000}
        />
      </View>
    );
  }
}

export default NotiProvider;
