import {combineReducers} from 'redux';
import navigation from './navigation';
import shopping_cart from './shopping_cart';

const reducer = combineReducers({
  navigation,
  shopping_cart,
});

export default reducer;
