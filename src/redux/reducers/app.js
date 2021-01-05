const initialState = {
  loading: false,
  listBalance: [],
  listRequest: [],
  currentBalance: '',
  totalIncome: 0,
  totalOutcome: 0,
  menu: {},
  requestPaymentCode: '',
  requestPaymentMessage: '',
  transferPaymentCode: '',
  transferPaymentMessage: '',

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
        listBalance: action.payload.docs,
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
        requestPaymentMessage: action.payload.message,
      };

    case 'REQUEST_PAYMENT_HISTORY_SUCCESS':
      return {
        ...state,
        listRequest: action.payload.docs,
      };
    case 'TRANSFER_PAYMENT_SUCCESS':
      return {
        ...state,
        transferPaymentCode: action.payload.statusCode,
        transferPaymentMessage: action.payload.message,
      };
    case 'TRANSFER_PAYMENT_FAIL':
      return {
        ...state,
        transferPaymentCode: action.payload.statusCode,
        transferPaymentMessage: action.payload.message,
      };
    case 'REQUEST_PAYMENT_FAIL':
      return {
        ...state,
        requestPaymentCode: action.payload.statusCode,
        requestPaymentMessage: action.payload.message,
      };
    case 'RESET_STATE_PAYMENT':
      return {
        ...state,
        requestPaymentCode: '',
        requestPaymentMessage: '',
      };
    case 'APP_LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export default appReducer;
