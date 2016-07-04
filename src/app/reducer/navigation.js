import * as Action from '../action/navigation'

let initState = {
  title: 'SAPE: 电商平台'
};

const navigation = (state = initState, action) => {
  switch (action.type) {
    case Action.SET_TITLE:
      return {
        title: action.title,
      };

    default:
      return state;
  }
}

export default navigation;
