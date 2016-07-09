import * as Action from '../action/shopping_cart';
import update from 'immutability-helper';

const initState = {
  cart: [
    {itemID: "1", itemAmount: 1},
    {itemID: "2", itemAmount: 1},
  ]
};

const shopping_cart = (state = initState, action) => {
  switch (action.type) {
    case Action.ADD_CART_ITEM:
    {
      let cart = state.cart;

      let index = cart.findIndex((item) => (
        item.itemID === action.itemID
      ));
      //console.log("index   ", index);
      console.log("index state   ", state);
      if (index != -1){
        let currentAmount = cart[index].itemAmount;
        return update(state, {cart: {$splice: [[index, 1, {itemID: action.itemID, itemAmount: currentAmount + 1}]]}});
      }

      return update(state, {cart: {$push: [{itemID: action.itemID, itemAmount:  1}]}});
    }
    case Action.CHANGE_CART_ITEM_AMOUNT:
    {
      let cart = state.cart;

      let index = cart.findIndex((item) => (
        item.itemID === action.itemID
      ));
      return update(state, {cart: {$splice: [[index, 1, {itemID: action.itemID, itemAmount: action.itemAmount}]]}});
    }
    case Action.DELETE_CART_ITEM:
    {
      let cart = state.cart;

      let index = cart.findIndex((item) => (
        item.itemID === action.itemID
      ));

      return update(state, {cart: {$splice: [[index, 1]]}});
    }
    default:
      return state;
  }
};

export default shopping_cart;