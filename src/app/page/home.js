import React, {Component} from 'react';
import {setTitle} from '../action/navigation'
import {store} from '../app'

class Home extends Component {
  render() {
    store.dispatch(setTitle('SAPE: 电商平台'))
    return <div> Home! </div>;
  }
}

export default Home;
