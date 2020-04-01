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
export function checkBalance(page = 1, email) {
  return {
    type: 'CHECK_BALANCE',
    method: 'GET',
    api: `${
      apiConfigs.BASE_API
    }/check-balance?page=${page}&limit=${10}&email=${email}`,
    token: true,
  };
}

export function getStores(page = 1, sortBy = '-createdAt', keyword = '') {
  console.log('keyword', keyword);
  console.log('sortBy', sortBy);
  return {
    type: 'GET_STORES',
    method: 'GET',
    api: `${
      apiConfigs.BASE_API
    }/stores?page=${page}&limit=${10}&sortBy=${sortBy}&keyword=${keyword}`,
    token: true,
  };
}
export function getStoreById(id) {
  return {
    type: 'GET_STORE_BY_ID',
    method: 'GET',
    api: `${apiConfigs.BASE_API}/stores/${id}/menu`,
    token: true,
  };
}
export function requestPayment(body) {
  return {
    type: 'REQUEST_PAYMENT',
    method: 'POST',
    api: `${apiConfigs.BASE_API}/payment-request`,
    token: true,
    body,
  };
}
export function createOrder(body) {
  return {
    type: 'CREATE_ORDER',
    method: 'POST',
    api: `${apiConfigs.BASE_API}/orders`,
    token: true,
    body,
  };
}
export function getListOrder(body) {
  return {
    type: 'CREATE_ORDER',
    method: 'POST',
    api: `${apiConfigs.BASE_API}/orders`,
    token: true,
    body,
  };
}
export function updateOrderDetail(body, id) {
  return {
    type: 'UPDATE_ORDER',
    method: 'PUT',
    api: `${apiConfigs.BASE_API}/orders/${id}`,
    token: true,
    body,
  };
}
