const initialState = {
  loading: false,
  listBalance: [],
  currentBalance: '',
  menu: {},
  requestPaymentSucces: false,
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
        requestPaymentSucces: true,
      };
    case 'REQUEST_PAYMENT_FAIL':
      return {
        ...state,
        requestPaymentSucces: false,
      };
    case 'CREATE_ORDER_SUCCESS':
      return {
        ...state,
        order: action.payload,
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
    case 'APP_LOGOUT':
      return initialState;
    default:
      return state;
  }
}

// function calculatePage({page, pages, total}) {
//   const temptTotalPage =
//     total_count % per_page === 0
//       ? parseInt(total_count / per_page)
//       : parseInt(total_count / per_page) + 1;
//   return {
//     currentPage: current_page,
//     totalPage: temptTotalPage,
//   };
// }

function concatListData(page, oldData, newData) {
  if (page === 1) {
    return newData;
  } else {
    return oldData.concat(newData);
  }
}
export default appReducer;
