import Immutable from 'immutable';
import * as constant from '../constant/useraddress';
import * as general from '../constant/general';

const initialstate = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errors: [],
};

export function location(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.USER_ADD_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.USER_ADD_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.USER_ADD_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.USER_ADD_ERRORS) {
    return state.set('errors', action.payload);
  } else if (action.type === constant.SIGNOUT_USER_REQUEST) {
    return state.set('data', action.payload);
  }
  return state;
}
