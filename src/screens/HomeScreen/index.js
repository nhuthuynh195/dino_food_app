import Colors from '@assets/colors';
import {Text} from '@components';
import {height, width} from '@configs/styles';
import connectRedux from '@redux/connectRedux';
import {formatNumber} from '@utils/func';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useCountUp} from 'use-count-up';
function index(props) {
  const {user} = props;
  useEffect(() => {
    props.actions.auth.getProfile();
    props.actions.app.checkTotalAmount(user.email);
  }, []);

  function countTotalIncome() {
    const {value} = useCountUp({
      isCounting: true,
      end: props.totalIncome,
      duration: 1,
    });
    return value;
  }
  function countTotalOutcome() {
    const {value} = useCountUp({
      isCounting: true,
      end: props.totalOutcome,
      duration: 1,
    });
    return value;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text bold style={{fontSize: 20, color: 'white'}}>
          {'Total income: '}
        </Text>
        <Text bold style={{fontSize: 30, color: 'white'}}>
          {formatNumber(countTotalIncome())}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
          }}>
          {' VND'}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text bold style={{fontSize: 20, color: 'white'}}>
          {'Total outcome: '}
        </Text>
        <Text bold style={{fontSize: 30, color: 'white'}}>
          {formatNumber(-countTotalOutcome())}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
          }}>
          {' VND'}
        </Text>
      </View>
    </View>
  );
}
const mapStateToProps = state => (
  console.log('state home', state),
  {
    user: state.dataLocal.profile.user,
    totalIncome: state.app.totalIncome,
    totalOutcome: state.app.totalOutcome,
  }
);

export default connectRedux(mapStateToProps, index);
