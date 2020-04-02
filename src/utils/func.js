import {Platform, Dimensions} from 'react-native';
import _ from 'ramda';
export const {width, height} = Dimensions.get('window');
export const guidelineBaseWidth = 350;
export const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {scale, verticalScale, moderateScale};

export const formatDate = date => {
  const temptDate = new Date(date);
  return `${temptDate.getHours()}:${temptDate.getMinutes()} - ${temptDate.getDate()}/${temptDate.getMonth() +
    1}/${temptDate.getFullYear()}`;
};

export const formatDay = date => {
  const temptDate = new Date(date);
  return `${temptDate.getDate()}/${temptDate.getMonth() +
    1}/${temptDate.getFullYear()}`;
};

export const timeOut = async ms => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('TIMED_OUT')), ms);
  });
};

export const formatTime = date => {
  const temptDate = new Date(date);
  return `${temptDate.getHours()}:${temptDate.getMinutes()}${
    temptDate.getHours() > 12 ? 'pm' : 'am'
  }`;
};

export const formatMoney = money => {
  return (parseInt(money) + '').replace(/(.)(?=(\d{3})+$)/g, '$1.');
};

export const hiddenTabbar = stack => {
  stack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
    };
  };
};

export const filterSymbol = str => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g,
    '-',
  );
  str = str.replace(/-+-/g, '-'); // thay thế 2- thành 1-
  str = str.replace(/^\-+|\-+$/g, ''); // cắt bỏ ký tự - ở đầu và cuối chuỗi
  return str;
};

export const checkAllArrayIsNotEmpty = (...values) => {
  return values.filter(value => !_.isEmpty(value)).length === values.length;
};

export const requestAPI = async (action, headers = {}) => {
  let method = action.method || 'GET';
  let request = {
    method: method,
    headers: Object.assign(
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      headers,
    ),
  };
  if (action.token) {
    request.headers = Object.assign(
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      action.headers,
    );
  }

  if (
    (method == 'POST' || method == 'DELETE' || method == 'PUT') &&
    action.body
  ) {
    request['body'] = JSON.stringify(action.body);
  }
  let response = await fetch(action.api, request);
  if (action.type === 'LOGIN_APP' && response.status === 200) {
    const data = await response.json();
    const temptHeaders = _.pick(
      ['access-token', 'uid', 'client', 'token-type', 'expiry'],
      response.headers.map,
    );
    return {...data, headers: temptHeaders};
  }
  const data = await response.json();
  return {
    ...data,
    statusCode: response.status,
  };
};

export const uploadMultiImage = async (action, headers = {}) => {
  let method = action.method || 'GET';
  let request = {
    method: method,
    headers: Object.assign(headers),
  };
  if (action.token) {
    request.headers = Object.assign(action.headers);
  }
  if (
    (method == 'POST' || method == 'DELETE' || method == 'PUT') &&
    action.body
  ) {
    request['body'] = this.createFormData(action.media, action.body);
  }
  console.log('uploadMultiImage1 : ');
  try {
    let response = await fetch(action.api, request);
    console.log('uploadMultiImage : ', response);
    return await response.json();
  } catch (error) {
    console.log('error uploadMultiImage : ', error);
  }
};

export const createFormData = (media, body) => {
  console.log('-----media  : ', media);
  const data = new FormData();
  for (let i = 0; i < media.length; i++) {
    data.append('files[]', {
      uri:
        Platform.OS === 'android'
          ? media[i].uri
          : media[i].uri.replace('file://', ''),
      name: media[i].fileName ? media[i].fileName : 'phi.jpg',
      type: media[i].type ? media[i].type : 'image/jpeg',
    });
  }
  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  console.log('----- body --- : ', data);
  return data;
};

export const isIphoneX = () => {
  const {height, width} = Dimensions.get('window');
  return Platform.OS === 'ios' && (height === 812 || width === 812);
};

export const getRowData = (data, itemsPerRow = 4) => {
  const rowCount = Math.ceil(data.length / itemsPerRow);
  const rowData = [];

  for (let i = 0; i < rowCount; i++) {
    const startIndex = i * itemsPerRow;
    const endIndex = startIndex + itemsPerRow;
    const items = data.slice(startIndex, endIndex);
    if (items.length < itemsPerRow) {
      const diff = itemsPerRow - items.length;
      items.push(...Array(diff).fill(null));
    }
    rowData.push(items);
  }
  return rowData;
};

export const getValueOfObject = obj => {
  return Object.values(obj);
};

export const getKeyOfObject = obj => {
  return Object.keys(obj);
};

export const removeAccent = str => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/ |/g, '');
  return str;
};
