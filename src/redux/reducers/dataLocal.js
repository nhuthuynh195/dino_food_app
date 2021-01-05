const initialState = {
  profile: {},
  headers: {},
  cart: [],
  user: {
    email: '',
    password: '',
    rembember: false,
  },
  recentTransactions: [],
};

function dataLocal(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_RECENT_TRANSACTIONS':
      return {
        ...state,
        recentTransactions: action.payload,
      };
    case 'SAVE_PROFILE_LOCAL':
      return {
        ...state,
        profile: action.payload.profile,
        headers: action.payload.headers,
      };
    case 'UPDATE_PROFILE_LOCAL':
      return {
        ...state,
        profile: action.payload,
      };
    case 'SAVE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'APP_LOGOUT':
      return {
        ...state,
        profile: {},
        headers: {},
        cart: [],
        recentTransactions: [],
      };
    default:
      return state;
  }
}

module.exports = dataLocal;
