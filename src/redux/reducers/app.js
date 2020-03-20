const initialState = {
  loading: false,
  listBalance: [],
  currentBalance: '',
  listStores: [],
  menu: {},
  requestPaymentSucces: false,
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
        listBalance: action.payload.histories.docs,
        currentBalance: action.payload.balance,
      };
    case 'GET_STORES_SUCCESS':
      return {
        ...state,
        listStores: action.payload.docs,
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
    case 'APP_LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export default appReducer;
