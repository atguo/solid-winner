import fetch from 'isomorphic-fetch'
import {store} from './app'

const call = (name, data, actionType) => {
  fetch('api/' + name + '.json')
    .then(resp => resp.json())
    .then(json => {
      if (actionType) {
        store.dispatch({
          type: actionType,
          data: json
        });
      }
    }).catch(error => {
      if (actionType) {
        store.dispatch({
          type: actionType,
          data: null,
          error
        });
      }
    });
}

export default call

// call('demo.json', data => console.log(data), err => console.log(err))
