import React from 'react';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';

import Master from './master';

import Home from './page/home';
import ItemDetail from './page/item_detail'
import ItemList from './page/item_list'
import ShoppingCart from './page/shopping_cart'
import Pay from './page/pay'
import Register from './page/register'
import Setting from './page/setting'
import Order from "./page/order"
import OrderDetail from "./page/order_detail"

const Routes = (
  <Router history={hashHistory} >
    <Route path='/' component={Master} >
      <IndexRedirect to='Home' />
      <Route path='Home' component={Home} />
      <Route path='ItemDetail/:itemID' component={ItemDetail} />
      <Route path='ItemList(/query/:query)(/sortBy/:sortBy)(/filterBy/:filterBy)' component={ItemList} />
      <Route path='ShoppingCart' component={ShoppingCart} />
      <Route path='Pay' component={Pay} />
      <Route path='Register' component={Register} />
      <Route path='Setting' component={Setting} />
      <Route path='Order' component={Order} />
      <Route path='OrderDetail' component={OrderDetail} />
    </Route>
  </Router>
);

export default Routes;
