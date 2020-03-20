import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import connectRedux from '@redux/connectRedux';
import {checkAllArrayIsNotEmpty, formatDate, formatMoney} from '@utils/func';

export class index extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Lịch sử',
  });
  componentDidMount() {
    let page = 1;
    let email = this.props.profile.email;
    this.props.actions.app.checkBalance(page, email);
  }
  renderItem({item, index}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          height: 50,
          borderBottomColor: '#F7F7F7',
          alignItems: 'center',
        }}>
        <View style={{paddingRight: 15}}>
          <Text>{formatDate(item.createdAt)}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>
            {item.type == 'income'
              ? '+' + formatMoney(item.amount)
              : '-' + formatMoney(item.amount)}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text numberOfLines={1}>{item.description}</Text>
        </View>
      </View>
    );
  }
  render() {
    const {listBalance, currentBalance} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {checkAllArrayIsNotEmpty(listBalance) && (
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
                borderRadius: 5,
                marginVertical: 5,
                backgroundColor: '#0273CC',
                alignSelf: 'center',
              }}>
              <Text style={{fontSize: 18, color: 'white'}}>
                Số dư hiện tại:
              </Text>
              <Text style={{fontSize: 18, color: 'white'}}>
                {formatMoney(currentBalance)} VND
              </Text>
            </View>
            <FlatList
              data={listBalance}
              renderItem={(item, index) => this.renderItem(item, index)}
              style={{paddingHorizontal: 10}}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  listBalance: state.app.listBalance,
  currentBalance: state.app.currentBalance,
});

export default connectRedux(mapStateToProps, index);
