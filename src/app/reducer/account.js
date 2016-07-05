import update from 'immutability-helper'
import call from '../api'
import * as Action from '../action/account'

const guestState = {
  token: '',
  username: '',
  status: 'guest',
};

const account = (state = guestState, action) => {
  switch (action.type) {
    case Action.LOGIN_RESP: {
      if (action.data) {
        if (action.data.status == 'success') {
          let ret = action.data.result;
          ret.status = 'logged in';
          return ret;
        }
        if (action.data.status == 'incorrect') {
          return update(guestState, {$set: {status: 'incorrect'}});
        }
      }
      return update(guestState, {$set: {status: 'error'}});
    }

    case Action.CONFIRM_LOGIN_ERROR: {
      return update(state, {$set: {status: 'guest'}});
    }

    case Action.LOGOUT: {
      call('logout', {token: state.token})
      return guestState;
    }

    default:
      return state;
  }
}

export default account;
