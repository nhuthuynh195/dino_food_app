const initialState = {
  loginSuccess: false,
  errorLogin: '',
  //
  profile: {},
  //
  register: {
    message: '',
    code: '',
  },
  //
  changePassword: {
    message: '',
    code: '',
  },
  //
  forgetPassword: {
    message: '',
    code: '',
  },
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_APP':
      return {
        ...state,
        errorLogin: '',
        loginSuccess: false,
      };
    case 'LOGIN_APP_SUCCESS':
      return {
        ...state,
        loginSuccess: true,
      };
    case 'LOGIN_APP_FAIL':
      return {
        ...state,
        loginSuccess: false,
        errorLogin: action.payload.error,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        register: {
          message: action.payload.message,
          code: action.payload.statusCode,
        },
      };

    case 'FORGET_PASSWORD_SUCCESS':
      return {
        ...state,
        forgetPassword: {
          message: action.payload.message,
          code: action.payload.statusCode,
        },
      };
    case 'CHANGE_PASSWORD_SUCCESS':
      return {
        ...state,
        changePassword: {
          message: action.payload.message,
          code: action.payload.statusCode,
        },
      };
    case 'RESET_STATE_LOGIN':
      return {
        ...state,
        loginSuccess: false,
        errorLogin: '',
        register: {
          message: '',
          code: '',
        },
        changePassword: {
          message: '',
          code: '',
        },
        forgetPassword: {
          message: '',
          code: '',
        },
      };
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        profile: action.payload,
      };
    case 'APP_LOGOUT':
      return initialState;

    default:
      return state;
  }
}

export default authReducer;
