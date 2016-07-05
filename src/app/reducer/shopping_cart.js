import * as Action from '../action/shopping_cart';
import update from 'immutability-helper';

const initState = {
  cart: {
    "1111": 1,
    "12212": 1,
  }
};

const shopping_cart = (state = initState, action) => {
  switch (action.type) {
    case Action.ADD_CART_ITEM:
    {
      let new_cart = {};
      new_cart[action.itemId] = 1;
      return update(state, {cart: {$merge: new_cart}});
    }
    case Action.CHANGE_CART_ITEM_AMOUNT:
    {
      let new_cart = {};
      new_cart[action.itemId] = action.itemAmount;
      return update(state, {cart: {$merge: new_cart}});
    }
    case Action.DELETE_CART_ITEM:
    {
      return state;
    }
    default:
      return state;
  }
};

export default shopping_cart;