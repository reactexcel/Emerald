import Immutable from 'immutable';
import * as constant from '../constant/login';

const initialstate = {
  data: [],
  open: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errors: [],
};

export function login(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.LOGIN_USER_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.LOGIN_USER_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.LOGIN_USER_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.LOGIN_USER_ERRORS) {
    return state.set('errors', action.payload);
  } else if (action.type === constant.SIGNOUT_USER_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.OPEN_USER_DRAWER) {
    return state.set('open', action.payload);
  }
  return state;
}
