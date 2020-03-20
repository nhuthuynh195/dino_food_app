const initialState = {
  profile: {},
  headers: {},
  cart: [],
};

function dataLocal(state = initialState, action) {
  switch (action.type) {
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
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: action.payload,
      };
    case 'REMOVE_CART':
      return {
        ...state,
        cart: [],
      };
    case 'APP_LOGOUT':
      return initialState;
    default:
      return state;
  }
}

module.exports = dataLocal;
