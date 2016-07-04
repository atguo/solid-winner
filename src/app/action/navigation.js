export const NAVIGATE_TO = 'NAVIGATE_TO'
export const SET_TITLE = 'SET_TITLE'

export const navigateTo = (title, path) => {
  return {
    type: NAVIGATE_TO,
    path
  }
}

export const setTitle = (title) => {
  return {
    type: SET_TITLE,
    title
  }
}
