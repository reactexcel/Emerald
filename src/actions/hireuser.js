import { createAction } from 'redux-actions';
import * as action from '../api/hireuser';
import * as constant from '../constant/hireuser';
import { isLoading } from './loader';

function hireSuccess(data) {
  return createAction(constant.HIRE_USER_REQUEST)(data);
}
function isSuccess(data) {
  return createAction(constant.HIRE_USER_LOADING)(data);
}
function isError(data) {
  return createAction(constant.HIRE_USER_SUCCESS)(data);
}
function loginError(data) {
  return createAction(constant.HIRE_USER_ERRORS)(data);
}
export function hirePerson(hiringpersonID, hiredpersonID, array, name) {
  return function (dispatch) {
    dispatch(isLoading(true));
    return new Promise((reslove, reject) => {
      action.hireperson(hiringpersonID, hiredpersonID, name);
      action.hireuser(hiringpersonID, hiredpersonID, array).then((val) => {
        reslove(val);
        // dispatch(isLoading(false));
        dispatch(hireSuccess(val));
        dispatch(isSuccess(true));
      }, (error) => {
        dispatch(isLoading(false));
        dispatch(isError(true));
        dispatch(loginError(error));
      },
    );
    });
  };
}
