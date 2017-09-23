import { createAction } from 'redux-actions';
import * as action from '../api/updateProfile';
import * as constant from '../constant/updateProfile';
import { isLoading } from './loader';

function profileUpdateSuceess(data) {
  return createAction(constant.PROFILE_UPDATE_REQUEST)(data);
}
function isSuccess(data) {
  return createAction(constant.PROFILE_UPDATE_SUCCESS)(data);
}
function isError(data) {
  return createAction(constant.PROFILE_UPDATE_ERROR)(data);
}
function profileUpdateError(data) {
  return createAction(constant.PROFILE_UPDATE_ERRORS)(data);
}
function userLocationSuceess(data) {
  if (data == true) {
    return createAction(constant.LOCATION_UPDATE_SUCCESS)(data);
  } else if (data == false) {
    return createAction(constant.LOCATION_UPDATE_ERROR)(data);
  }
}
function userSkill(data) {
  return createAction(constant.SKILL_UPDATE_SUCCESS)(data);
}
export function userInfoUpdate(userId, fname, lname, phonenum, location, token) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(isLoading(true));
      action.userProfileupdate(userId, fname, lname, phonenum, location, token).then((val) => {
        resolve(val);
        dispatch(isSuccess(true));
        dispatch(profileUpdateSuceess(val));
        dispatch(isLoading(false));
      }, (error) => {
        dispatch(isLoading(false));
        dispatch(isError(true));
        dispatch(profileUpdateError(error));
      },
    );
    });
  };
}
export function userSkillUpdate(userId, skills) {
  return function (dispatch, getState) {
    dispatch(isLoading(true));
    return new Promise((resolve, reject) => {
      action.userSkillUpdate(userId, skills).then((val) => {
        resolve(val);
        dispatch(isLoading(false));
        dispatch(userSkill(true));
      }, (error) => {
        reject(false);
        dispatch(userSkill(false));
      });
    });
  };
}
export function userLoactionupdate(userId, address) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(isLoading(true));
      action.userPlotupdate(userId, address).then((val) => {
        resolve(val);
        dispatch(userLocationSuceess(val));
        dispatch(isLoading(false));
      }, (error) => {
        dispatch(isLoading(false));
        dispatch(userLocationSuceess(error));
      },
    );
    });
  };
}
export function userImageUpload(userId, images) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(isLoading(true));
      action.userImageUpload(userId, images).then((val) => {
        resolve(val);
        // dispatch(userLocationSuceess(val));
        dispatch(isLoading(false));
      }, (error) => {
        dispatch(isLoading(false));
        // dispatch(userLocationSuceess(error));
      },
    );
    });
  };
}
export function updatelocation(userId, userlocation) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(isLoading(true));
      action.userLocationUpdate(userId, userlocation).then((val) => {
        resolve(val);
        // dispatch(userLocationSuceess(val));
        dispatch(isLoading(false));
      }, (error) => {
        dispatch(isLoading(false));
        // dispatch(userLocationSuceess(error));
      },
    );
    });
  };
}
export function updateServicesPrice(userId, servicesPrice) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(isLoading(true));
      action.udpatePrice(userId, servicesPrice).then((val) => {
        resolve(val);
        // dispatch(userLocationSuceess(val));
        dispatch(isLoading(false));
      }, (error) => {
        dispatch(isLoading(false));
        // dispatch(userLocationSuceess(error));
      },
    );
    });
  };
}
