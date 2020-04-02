import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import connectRedux from '@redux/connectRedux';
import {formatDay, formatDate} from '@utils/func';
import {Text} from '@components';
import Colors from '@assets/colors';
function index(props) {
  const [] = useState();
  useEffect(() => {
    props.actions.app.showLoading();
    props.actions.app.getListOrder();
  }, []);
  function loadMoreOrder() {
    const {metaDataListOrder} = props;
    const {page, pages} = metaDataListOrder;
    if (page < pages) {
      props.actions.app.getListOrder(page + 1);
    }
  }
  function gotoStore(_idStore, _idOrder) {
    props.navigation.navigate('Store', {idStore: _idStore, idOrder: _idOrder});
  }
  function renderItem({item, index}) {
    return (
      <TouchableOpacity
        onPress={() => gotoStore(item.store._id, item._id)}
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          paddingVertical: 20,
          borderBottomColor: '#F7F7F7',
          alignItems: 'center',
        }}>
        <View style={{flex: 2}}>
          <Text numberOfLines={1}>{item.store.name}</Text>
        </View>
        <View style={{paddingLeft: 15}}>
          <Text>{formatDate(item.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  const {listOrder} = props;
  console.log('listOrder', listOrder);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.WHITE,
      }}>
      <FlatList
        keyExtractor={item => item._id.toString()}
        data={listOrder}
        renderItem={renderItem}
        style={{paddingHorizontal: 10}}
        onEndReached={loadMoreOrder}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  listOrder: state.app.listOrder,
  metaDataListOrder: state.app.metaDataListOrder,
});

export default connectRedux(mapStateToProps, index);
