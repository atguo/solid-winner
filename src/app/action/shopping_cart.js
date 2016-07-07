export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const CHANGE_CART_ITEM_AMOUNT = 'CHANGE_CART_ITEM_NUM';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

export const addCartItem = (itemID) => {
  return {
    type: ADD_CART_ITEM,
    itemID
  }
};

export const changeCartItemAmount = (itemID, itemAmount) => {
  return {
    type: CHANGE_CART_ITEM_AMOUNT,
    itemID,
    itemAmount,
  }
};

export const deleteCartItem = (itemID) => {
  return {
    type: DELETE_CART_ITEM,
    itemID,
  }
};

