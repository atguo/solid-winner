import {combineReducers} from 'redux';
import navigation from './navigation';
import shopping_cart from './shopping_cart';
import account from './account';

const reducer = combineReducers({
  navigation,
  shopping_cart,
  account
});

export default reducer;
