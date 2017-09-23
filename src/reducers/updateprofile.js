import Immutable from 'immutable';
import * as constant from '../constant/updateProfile';
import * as genral from '../constant/general';

const initialstate = {
  data: [],
  location: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  skillupdate: false,
  errors: [],
};
export function profileUpdate(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.PROFILE_UPDATE_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.PROFILE_UPDATE_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.PROFILE_UPDATE_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.PROFILE_UPDATE_ERRORS) {
    return state.set('errors', action.payload);
  } else if (action.type === genral.SIGNOUT_USER_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.LOCATION_UPDATE_SUCCESS) {
    return state.set('location', action.payload);
  } else if (action.type === constant.SKILL_UPDATE_SUCCESS) {
    return state.set('skillupdate', action.payload);
  }
  return state;
}
