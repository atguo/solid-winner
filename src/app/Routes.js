import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Home from './page/home';
import Master from './Master';

// import ItemList from 'page/item_list'
// import ItemDetail from 'page/item_detail'
// import ShoppingCart from 'page/shopping_cart'
// import Pay from 'page/pay'

const Routes = (
  <Router history={hashHistory} >
    <Route path='/' component={Master} >
      <IndexRoute component={Home} />
      <Route path="/Home" component={Home} />

      {
      // <Route path="ItemList" component={ItemList} />
      // <Route path="ItemDetail" component={ItemDetail} />
      // <Route path="ShoppingCart" component={ShoppingCart} />
      // <Route path="Pay" component={Pay} />
      }

    </Route>
  </Router>
);

export default Routes;
