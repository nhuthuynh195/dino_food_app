import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import connectRedux from '@redux/connectRedux';
import {formatDay} from '@utils/func';
import {Text} from '@components';
function index(props) {
  const [] = useState();
  useEffect(() => {
    props.actions.app.getListOrder();
  }, []);
  const {listOrder} = props;
  function loadMoreOrder() {
    const {metaDataListOrder} = this.props;
    const {page, pages} = metaDataListOrder;
    if (page < pages) {
      props.actions.app.getListOrder(page + 1);
    }
  }
  function gotoStore(_idStore, _idOrder) {
    props.navigation.navigate('Store', {idStore: _idStore, idOrder: _id});
  }
  function renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={gotoStore(item.store._id, item._id)}
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderBottomColor: '#F7F7F7',
          alignItems: 'center',
        }}>
        <View style={{flex: 2}}>
          <Text numberOfLines={1}>{item.store.name}</Text>
        </View>
        <View style={{paddingRight: 15}}>
          <Text>{formatDay(item.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
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
