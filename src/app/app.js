import 'babel-polyfill'
import React from 'react';
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import {Provider} from 'react-redux'
import {createStore} from 'redux'

import Routes from './routes'
import reducer from './reducer'

export let store = createStore(reducer);
store.subscribe(function () {
  console.log('Store:', store.getState());
});

import {Router, Route, IndexRoute, hashHistory} from 'react-router';
injectTapEventPlugin();
render((
  <Provider store={store}>
    {Routes}
  </Provider>
), document.getElementById('app'));
