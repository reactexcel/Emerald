import Immutable from 'immutable';
import * as constant from '../constant/getjoblist';
import * as general from '../constant/general';


const initialstate = {
  data: [],
  member: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  errors: [],
};

export function getjobPost(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.JOB_LIST_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.JOB_LIST_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.JOB_LIST_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.JOB_LIST_ERRORS) {
    return state.set('errors', action.payload);
  } else if (action.type === constant.JOB_MEMBER_REQUEST) {
    return state.set('member', action.payload);
  } else if (action.type === general.SIGNOUT_USER_REQUEST) {
    return state.set('data', action.payload);
  }
  return state;
}
