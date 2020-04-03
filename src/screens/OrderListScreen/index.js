import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import connectRedux from '@redux/connectRedux';
import {formatDay, formatDate} from '@utils/func';
import {Text} from '@components';
import Colors from '@assets/colors';
import {checkAllArrayIsNotEmpty, upperFirstLetter} from '@utils/func';
import firestore from '@react-native-firebase/firestore';
function index(props) {
  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    props.actions.app.showLoading();

    const ref = firestore()
      .collection('orders')
      .orderBy('createdAt', 'desc');
    ref.onSnapshot(list => {
      setListOrder(list.docs);
      props.actions.app.hideLoading();
    });
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
  function renderItem({item}) {
    let data = item.data();
    return (
      <View>
        {checkAllArrayIsNotEmpty(data) && (
          <TouchableOpacity
            onPress={() => gotoStore(data.store._id, data._id)}
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              paddingVertical: 20,
              borderBottomColor: '#F7F7F7',
              alignItems: 'center',
            }}>
            <View style={{paddingRight: 10}}>
              <Text>{upperFirstLetter(data.status)}</Text>
            </View>
            <View style={{flex: 2}}>
              <Text numberOfLines={2}>{data.store.name}</Text>
            </View>
            <View style={{paddingLeft: 10}}>
              <Text>{formatDate(data.createdAt)}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  console.log('listOrder', listOrder);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.WHITE,
      }}>
      <FlatList
        keyExtractor={item => item.data()._id}
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
