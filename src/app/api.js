import fetch from 'isomorphic-fetch'

const call = (name, data, callback) => {
  fetch('http://localhost:8080/api/' + name, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(json => {
      if (callback) {
        console.log('API SUCC', name, data, json)
        callback(json, null);
      }
    }).catch(error => {
      if (callback) {
        console.log('API FAIL', name, data, error)
        callback(null, error);
      }
    });
}

export default call
