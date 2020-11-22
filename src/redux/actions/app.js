import apiConfigs from '@configs/api';

export function showLoading() {
  return {
    type: 'SHOW_LOADING',
    payload: {},
  };
}
export function hideLoading() {
  return {
    type: 'HIDE_LOADING',
    payload: {},
  };
}
export function checkBalance(page = 1, limit = 10, email) {
  return {
    type: 'CHECK_BALANCE',
    method: 'GET',
    api: `${
      apiConfigs.BASE_API
    }/check-balance?page=${page}&limit=${limit}&email=${email}`,
    token: true,
  };
}

export function checkTotalAmount(email) {
  return {
    type: 'CHECK_TOTAL_AMOUNT',
    method: 'GET',
    api: `${
      apiConfigs.BASE_API
    }/check-balance?email=${email}&fromDate=2020-02-29T17:00:00.000Z&page=1&toDate=${new Date().toISOString()}`,
    token: true,
  };
}
export function requestPayment(body) {
  return {
    type: 'REQUEST_PAYMENT',
    method: 'POST',
    api: `${apiConfigs.BASE_API}/payment-requests`,
    token: true,
    body,
  };
}
export function requestPaymentHistory(page = 10, limit = 10, email) {
  return {
    type: 'REQUEST_PAYMENT_HISTORY',
    method: 'GET',
    api: `${
      apiConfigs.BASE_API
    }/payment-requests?page=${page}&limit=${limit}&email=${email}`,
    token: true,
  };
}
export function resetStatePayment() {
  return {
    type: 'RESET_STATE_PAYMENT',
    payload: false,
  };
}
