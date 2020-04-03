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
export function createOrder(idStore, body) {
  console.log('store', idStore, body);
  return {
    type: 'CREATE_ORDER',
    createOrder: {
      method: 'POST',
      api: `${apiConfigs.BASE_API}/orders`,
      token: true,
      body: {store: idStore},
    },
    updateOrderDetail: {
      method: 'PUT',
      token: true,
      body,
    },
    getOrderDetail: {
      method: 'GET',
      token: true,
    },
  };
}
export function updateOrderDetail(body, id) {
  return {
    type: 'UPDATE_ORDER',
    updateOrderDetail: {
      method: 'PUT',
      api: `${apiConfigs.BASE_API}/orders/${id}`,
      token: true,
      body,
    },
    getOrderDetail: {
      method: 'GET',
      api: `${apiConfigs.BASE_API}/orders/${id}`,
      token: true,
    },
  };
}

export function getListOrder(page = 1) {
  return {
    type: 'GET_LIST_ORDER',
    method: 'GET',
    api: `${apiConfigs.BASE_API}/orders?page=${page}&limit=10`,
    token: true,
  };
}
export function getOrderDetail(id) {
  return {
    type: 'GET_ORDER_DETAIL',
    method: 'GET',
    api: `${apiConfigs.BASE_API}/orders/${id}`,
    token: true,
  };
}

export function confirmOrder(id) {
  return {
    type: 'CONFIRM_ORDER',
    method: 'POST',
    api: `${apiConfigs.BASE_API}/orders/${id}`,
    token: true,
  };
}
export function resetStateOrder() {
  return {
    type: 'RESET_STATE_ORDER',
    payload: false,
  };
}
export function resetStateConfirmOrder() {
  return {
    type: 'RESET_STATE_CONFIRM_ORDER',
    payload: false,
  };
}
