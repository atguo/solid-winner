import * as Action from '../action/navigation'

let initState = {
  path: '/Home',
  title: 'SAPE: 电商平台'
}

const navigation = (state = initState, action) => {
  switch (action.type) {
    case Action.NAVIGATE_TO:
      return {
        title: action.title,
        path: action.path
      }

    case Action.SET_TITLE:
      return {
        title: action.title,
        path: state.path
      }

    default:
      return state;
  }
}

export default navigation;
