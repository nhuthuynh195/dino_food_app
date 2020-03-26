/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';

import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const connectNoti = WrappedComponent => {
  class ConnectedNoti extends Component {
    render() {
      const {alertWithType} = this.context;
      return <WrappedComponent {...this.props} alertWithType={alertWithType} />;
    }
  }

  ConnectedNoti.contextTypes = {
    alertWithType: PropTypes.func,
  };

  return hoistNonReactStatic(ConnectedNoti, WrappedComponent);
};

export default connectNoti;
