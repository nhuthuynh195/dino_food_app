const initialState = {
  loginSuccess: false,
  errorLogin: '',
  profile: {},
  changePassword: {
    message: '',
    code: '',
  },
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

// function calculatePage({ current_page, per_page, total_count }) {
//     const temptTotalPage = total_count % per_page === 0 ? parseInt(total_count / per_page) : parseInt(total_count / per_page) + 1;
//     return {
//         currentPage: current_page,
//         totalPage: temptTotalPage
//     }
// }

// function concatListData(page, oldData, newData) {
//     if (page === 1) {
//         return newData;
//     } else {
//         return oldData.concat(newData);
//     }
// }

export default authReducer;
