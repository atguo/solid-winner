import React from 'react';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';

import Master from './master';

import Home from './page/home';
import ItemDetail from './page/item_detail'
import ItemList from './page/item_list'
import ShoppingCart from './page/shopping_cart'
import Pay from './page/pay'
import Register from './page/register'

const Routes = (
  <Router history={hashHistory} >
    <Route path='/' component={Master} >
      <IndexRedirect to='Home' />
      <Route path='Home' component={Home} />
      <Route path='ItemDetail/:itemId' component={ItemDetail} />
      <Route path='ItemList(/query/:query)(/sortBy/:sortBy)(/filterBy/:filterBy)' component={ItemList} />
      <Route path='ShoppingCart' component={ShoppingCart} />
      <Route path='Pay' component={Pay} />
      <Route path='Register' component={Register} />

    </Route>
  </Router>
);

export default Routes;
