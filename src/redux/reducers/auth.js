const initialState = {
  loginSuccess: false,
  errorLogin: '',
  profile: {},
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
    case 'RESET_STATE_LOGIN':
      return {
        ...state,
        loginSuccess: false,
        errorLogin: '',
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
