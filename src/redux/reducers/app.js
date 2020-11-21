const initialState = {
  loading: false,
  listBalance: [],
  currentBalance: '',
  totalIncome: 0,
  totalOutcome: 0,
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
    case 'CHECK_TOTAL_AMOUNT_SUCCESS':
      return {
        ...state,
        totalIncome: action.payload.summary.income,
        totalOutcome: action.payload.summary.outcome,
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
