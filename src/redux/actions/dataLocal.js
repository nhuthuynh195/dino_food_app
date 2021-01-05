export function updateProfileLocal(profile) {
  return {
    type: 'UPDATE_PROFILE_LOCAL',
    payload: profile,
  };
}
export function addToCart(cart) {
  return {
    type: 'ADD_TO_CART',
    payload: cart,
  };
}
export function removeCart() {
  return {
    type: 'REMOVE_CART',
    payload: {},
  };
}
export function saveUser(user) {
  return {
    type: 'SAVE_USER',
    payload: user,
  };
}
export function saveRecentTransactions(body) {
  return {
    type: 'SAVE_RECENT_TRANSACTIONS',
    payload: body,
  };
}
