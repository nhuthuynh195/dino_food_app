import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  View,
  DeviceEventEmitter,
  Modal,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
const {width} = Dimensions.get('window');

class AlertProvider extends Component {
  static get childContextTypes() {
    return {
      openAlert: PropTypes.func,
    };
  }

  static get propTypes() {
    return {
      children: PropTypes.any,
    };
  }

  getChildContext() {
    return {
      openAlert: (...args) => this.dropdown.openAlert(...args),
    };
  }

  render() {
    const {children} = this.props;
    return (
      <View style={{flex: 1}}>
        {React.Children.only(children)}
        <Alert
          ref={ref => {
            this.dropdown = ref;
          }}
        />
      </View>
    );
  }
}

export class Alert extends Component {
  state = {
    openAlert: false,
    eventType: '',
    content: '',
  };

  openAlert = (title, actionType) => {
    this.setState({
      openAlert: true,
      eventType: actionType,
      content: title,
    });
  };

  closeAlert = () => {
    this.setState({openAlert: false});
  };
  renderTitle() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 15,
        }}>
        <Text
          numberOfLines={2}
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: '#444444',
            fontWeight: '400',
          }}>
          {'Thông báo'}
        </Text>
      </View>
    );
  }
  renderSubTitle() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          numberOfLines={2}
          style={{
            textAlign: 'center',
            fontSize: 16,
            color: '#555555',
            fontWeight: '300',
          }}>
          {this.state.content}
        </Text>
      </View>
    );
  }
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.state.openAlert}
        onRequestClose={() => this.setState({openAlert: false})}
        style={{flex: 1}}>
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
          ]}>
          <View
            style={{
              width: width - 40,
              padding: 15,
              borderRadius: 5,
              backgroundColor: '#FFF',
              alignItems: 'center',
            }}>
            {this.renderTitle()}
            {this.renderSubTitle()}
            <View style={{flexDirection: 'row', height: 40, marginTop: 26}}>
              <TouchableOpacity
                style={styles.buttonAlert}
                onPress={this.closeAlert}>
                <Text bold style={{color: '#0273CC'}}>
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonAlert,
                  {
                    marginLeft: 15,
                    backgroundColor: '#0273CC',
                  },
                ]}
                onPress={() => this.clickButton(this.state.eventType)}>
                <Text bold style={{color: '#FFF'}}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  clickButton = type => {
    this.setState({openAlert: false});
    DeviceEventEmitter.emit(type);
  };
}

export default AlertProvider;

const styles = StyleSheet.create({
  buttonAlert: {
    flex: 1,
    borderRadius: 20,
    borderColor: '#0273CC',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
