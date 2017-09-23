import Immutable from 'immutable';
import * as constant from '../constant/hireuser';
import * as general from '../constant/general';

const initialstate = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errors: [],
};
export function hireuser(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.HIRE_USER_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.HIRE_USER_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.HIRE_USER_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.HIRE_USER_ERRORS) {
    return state.set('errors', action.payload);
  }
  return state;
}
