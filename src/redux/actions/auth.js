import apiConfigs from '@configs/api';

export function login(body) {
  return {
    type: 'LOGIN_APP',
    body,
    method: 'POST',
    api: `${apiConfigs.BASE_API}/auth/login`,
  };
}
export function register(body) {
  return {
    type: 'REGISTER',
    body,
    method: 'POST',
    api: `${apiConfigs.BASE_API}/auth/register`,
  };
}
export function forgetPassword(body) {
  return {
    type: 'FORGET_PASSWORD',
    body,
    method: 'POST',
    api: `${apiConfigs.BASE_API}/auth/forget-password`,
  };
}
export function changePassword(body) {
  return {
    type: 'CHANGE_PASSWORD',
    body,
    method: 'POST',
    api: `${apiConfigs.BASE_API}/auth/reset-password`,
  };
}
export function logout() {
  return {
    type: 'LOGOUT_APP',
    method: 'DELETE',
    api: `${apiConfigs.BASE_API}/auth/logout`,
    token: true,
  };
}
export function getProfile() {
  return {
    type: 'GET_PROFILE',
    method: 'GET',
    api: `${apiConfigs.BASE_API}/auth/profile`,
    token: true,
  };
}
export function resetStateLogin() {
  return {
    type: 'RESET_STATE_LOGIN',
    payload: false,
  };
}
