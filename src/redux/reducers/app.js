const initialState = {
  loading: false,
  listBalance: [],
  currentBalance: '',
  menu: {},
  requestPaymentCode: '',
  requestPaymentMesage: '',

  order: {},
  listStores: [],
  metaDataListStore: {
    page: 0,
    pages: 0,
  },
  listOrder: [],
  metaDataListOrder: {
    page: 0,
    pages: 0,
  },
  confirmOrderMessage: '',
  confirmOrderCode: '',
};

function appReducer(state = initialState, action) {
  const metaData =
    action.payload &&
    action.payload.page !== undefined &&
    action.payload.pages !== undefined
      ? {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
        }
      : {page: 0, pages: 0, total: 0};

  switch (action.type) {
    case 'SHOW_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'HIDE_LOADING':
      return {
        ...state,
        loading: false,
      };
    case 'HIDE_ALERT':
      return {
        ...state,
        loading: false,
      };
    case 'CHECK_BALANCE_SUCCESS':
      return {
        ...state,
        listBalance: action.payload.histories.docs,
        currentBalance: action.payload.balance,
      };
    case 'GET_STORES_SUCCESS':
      return {
        ...state,
        listStores: concatListData(
          metaData.page,
          state.listStores,
          action.payload.docs,
        ),
        metaDataListStore: metaData,
      };
    case 'GET_LIST_ORDER_SUCCESS':
      return {
        ...state,
        listOrder: concatListData(
          metaData.page,
          state.listOrder,
          action.payload.docs,
        ),
        metaDataListOrder: metaData,
      };
    case 'GET_STORE_BY_ID':
      return {
        ...state,
        menu: {},
      };
    case 'GET_STORE_BY_ID_SUCCESS':
      return {
        ...state,
        menu: action.payload.menu,
      };
    case 'REQUEST_PAYMENT_SUCCESS':
      return {
        ...state,
        requestPaymentCode: action.payload.statusCode,
        requestPaymentMesage: action.payload.message,
      };
    case 'REQUEST_PAYMENT_FAIL':
      return {
        ...state,
        requestPaymentCode: action.payload.statusCode,
        requestPaymentMesage: action.payload.message,
      };
    case 'RESET_STATE_PAYMENT':
      return {
        ...state,
        requestPaymentCode: '',
        requestPaymentMesage: '',
      };
    case 'CREATE_ORDER_SUCCESS':
      return {
        ...state,
        order: action.payload,
      };
    case 'CONFIRM_ORDER_SUCCESS':
      return {
        ...state,
        confirmOrderMessage: action.payload.message,
        confirmOrderCode: action.payload.statusCode,
      };
    case 'RESET_STATE_CONFIRM_ORDER':
      return {
        ...state,
        confirmOrderMessage: '',
        confirmOrderCode: '',
      };
    case 'GET_ORDER_DETAIL_SUCCESS':
      return {
        ...state,
        order: action.payload,
      };
    case 'UPDATE_ORDER_SUCCESS':
      return {
        ...state,
        order: action.payload,
      };
    case 'RESET_STATE_ORDER':
      return {
        ...state,
        order: {},
      };
    case 'APP_LOGOUT':
      return initialState;
    default:
      return state;
  }
}
function concatListData(page, oldData, newData) {
  if (page === 1) {
    return newData;
  } else {
    return oldData.concat(newData);
  }
}
export default appReducer;
