import * as Action from '../action/shopping_cart';
import update from 'immutability-helper';

const initState = {
  cart: [
    {itemNo: "1", itemAmount: 1},
    {itemNo: "2", itemAmount: 1},
  ]
};

const shopping_cart = (state = initState, action) => {
  switch (action.type) {
    case Action.ADD_CART_ITEM:
    {
      let cart = state.cart;

      let index = cart.findIndex((item) => (
        item.itemNo === action.itemNo
      ));

      if (index != -1){
        let currentAmount = state[index].itemAmount;
        return update(state, {cart: {$splice: [[index, 1, {itemNo: action.itemNo, itemAmount: currentAmount + 1}]]}});
      }

      return update(state, {cart: {$push: [{itemNo: action.itemNo, itemAmount:  1}]}});
    }
    case Action.CHANGE_CART_ITEM_AMOUNT:
    {
      let cart = state.cart;

      let index = cart.findIndex((item) => (
        item.itemNo === action.itemNo
      ));
      return update(state, {cart: {$splice: [[index, 1, {itemNo: action.itemNo, itemAmount: action.itemAmount}]]}});
    }
    case Action.DELETE_CART_ITEM:
    {
      let cart = state.cart;

      let index = cart.findIndex((item) => (
        item.itemNo === action.itemNo
      ));

      return update(state, {cart: {$splice: [[index, 1]]}});
    }
    default:
      return state;
  }
};

export default shopping_cart;