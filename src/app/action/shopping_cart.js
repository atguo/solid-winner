export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const CHANGE_CART_ITEM_AMOUNT = 'CHANGE_CART_ITEM_NUM';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

export const addCartItem = (itemNo) => {
  return {
    type: ADD_CART_ITEM,
    itemNo
  }
};

export const changeCartItemAmount = (itemNo, itemAmount) => {
  return {
    type: CHANGE_CART_ITEM_AMOUNT,
    itemNo,
    itemAmount,
  }
};

export const deleteCartItem = (itemNo) => {
  return {
    type: DELETE_CART_ITEM,
    itemNo,
  }
};

