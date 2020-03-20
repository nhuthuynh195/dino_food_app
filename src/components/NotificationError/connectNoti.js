/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';

import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const connectAlert = WrappedComponent => {
  class ConnectedAlert extends Component {
    render() {
      const {alertWithType} = this.context;
      return <WrappedComponent {...this.props} alertWithType={alertWithType} />;
    }
  }

  ConnectedAlert.contextTypes = {
    alertWithType: PropTypes.func,
  };

  return hoistNonReactStatic(ConnectedAlert, WrappedComponent);
};

export default connectAlert;
