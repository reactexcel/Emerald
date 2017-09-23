import { createAction } from 'redux-actions';
import * as action from '../api/signup';
import * as constant from '../constant/signup';
import * as general from '../constant/general';
import { isLoading } from './loader';

function signupSuccess(data) {
  return createAction(constant.SIGNUP_USER_REQUEST)(data);
}
function isSuccess(data) {
  return createAction(constant.SIGNUP_USER_SUCCESS)(data);
}
function isError(data) {
  return createAction(constant.SIGNUP_USER_ERROR)(data);
}
function signupError(data) {
  return createAction(constant.SIGNUP_USER_ERRORS)(data);
}
function signoutSuccess(data) {
  return createAction(general.SIGNOUT_USER_REQUEST)(data);
}
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export function signup(fname, lname, email, password, token) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(isLoading(true));
      action.userRegister(email, password).then((val) => {
        reslove(val);
        const data = val.uid;
        action.userProfileupdate(data, fname, lname, token);
        dispatch(isLoading(false));
        dispatch(signupSuccess(data));
        dispatch(isSuccess(true));
      },
      (error) => {
        dispatch(isLoading(false));
        dispatch(isError(true));
        dispatch(signupError(error)); // hide loader for signup page
      },
    );
    });
  };
}
export function signout() {
  return function (dispatch, getState) {
    dispatch(isLoading(true));
    dispatch(signoutSuccess(''));
    dispatch(isLoading(false));
  };
}
