import { createAction } from 'redux-actions';
import * as action from '../api/useraddress';
import * as constant from '../constant/useraddress';
import { isLoading } from './loader';

function getUserAddress(data) {
  return createAction(constant.USER_ADD_REQUEST)(data);
}
function isSuccess(data) {
  return createAction(constant.USER_ADD_SUCCESS)(data);
}
function isError(data) {
  return createAction(constant.USER_ADD_ERROR)(data);
}
function getUserAddressError(data) {
  return createAction(constant.USER_ADD_ERRORS)(data);
}
export function getlocation(address) {
  return function (dispatch) {
    return new Promise((reslove, reject) => {
      dispatch(isLoading(true));
      action.getUserAddress(address).then((val) => {
        reslove(val);
        dispatch(getUserAddress(val));
        dispatch(isSuccess(true));
        dispatch(isLoading(false));
      }, (error) => {
        dispatch(isLoading(false));
        dispatch(isError(true));
        dispatch(getUserAddressError(error));
      },
    );
    });
  };
}
