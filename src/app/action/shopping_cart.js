export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const CHANGE_CART_ITEM_AMOUNT = 'CHANGE_CART_ITEM_NUM';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

export const addCartItem = (itemId) => {
  return {
    type: ADD_CART_ITEM,
    itemId
  }
};

export const changeCartItemAmount = (itemId, itemAmount) => {
  return {
    type: CHANGE_CART_ITEM_AMOUNT,
    itemId,
    itemAmount,
  }
};

export const deleteCartItem = (itemId) => {
  return {
    type: DELETE_CART_ITEM,
    itemId,
  }
};

