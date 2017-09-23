import Immutable from 'immutable';
import * as constant from '../constant/signup';
import * as general from '../constant/general';

const initialstate = {
  data: '',
  isLoading: false,
  isSuccess: false,
  isError: false,
  errors: [],
};

export function signup(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.SIGNUP_USER_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.SIGNUP_USER_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.SIGNUP_USER_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.SIGNUP_USER_ERRORS) {
    return state.set('errors', action.payload);
  } else if (action.type === constant.SIGNOUT_USER_REQUEST) {
    return state.set('data', action.payload);
  }
  return state;
}
