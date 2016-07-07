import fetch from 'isomorphic-fetch'

const call = (name, data, callback) => {
  fetch('api/' + name + '.json')
    .then(resp => resp.json())
    .then(json => {
      if (callback) {
        callback(json, null);
      }
    }).catch(error => {
      if (callback) {
        callback(null, error);
      }
    });
}

export default call

// call('demo.json', data => console.log(data), err => console.log(err))
