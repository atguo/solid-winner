export const LOGOUT = 'LOGOUT'
export const LOGIN_RESP = 'LOGIN_RESP'
export const CONFIRM_LOGIN_ERROR = 'CONFIRM_LOGIN_ERROR'

export const logout = () => {
  return {type: LOGOUT};
}

export const confirmLoginError = () => {
  return {type: CONFIRM_LOGIN_ERROR};
}
 