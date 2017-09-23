import { createAction } from 'redux-actions';
import * as action from '../api/getjoblist';
import * as constant from '../constant/getjoblist';
import { isLoading } from './loader';
import * as firebase from 'firebase';
import axios from 'axios';
import { GEOLOCATION_URL } from '../config/config';

function getJobListSuccess(data) {
  return createAction(constant.JOB_LIST_REQUEST)(data);
}
function getJobMembersSuccess(data) {
  return createAction(constant.JOB_MEMBER_REQUEST)(data);
}
function isSuccess(data) {
  return createAction(constant.JOB_LIST_SUCCESS)(data);
}
function isError(data) {
  return createAction(constant.JOB_LIST_ERROR)(data);
}
function getJobListError(data) {
  return createAction(constant.JOB_LIST_ERRORS)(data);
}
function radians(latOrLon) {
  return latOrLon * Math.PI / 180;
}

function distance(point1, point2) {
  var R = 6371; // Radius of the earth in km
  var dLat = radians(point2.latitude - point1.latitude);  // deg2rad below
  var dLon = radians(point2.longitude - point1.longitude);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radians(point1.latitude)) * Math.cos(radians(point2.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = (R * c) * 1000; // Distance in km
  return Math.round(distance);
}

export function getjobList() {
  return function (dispatch) {
    dispatch(isLoading(true));
    return axios.post(GEOLOCATION_URL)
      .then(function (response) {
        return new Promise((reslove, reject) => firebase.database().ref('/userInfo').orderByKey().on('value', (dataSnapshot) => {
          const data = dataSnapshot.val();
          dispatch(getJobMembersSuccess(data));
          const items = [];
          Object.keys(data).map((key, index) => {
            if (data[key].profile.price) {
              const info = {
                id: data[key].profile.id,
                firstname: data[key].profile.firstname,
                lastname: data[key].profile.lastname,
                location: data[key].profile.location,
                phonenumber: data[key].profile.phonenumber,
                skill: data[key].profile.skill,
                skills: data[key].profile.skills,
                price: data[key].profile.price,
                address: data[key].profile.address,
                token: data[key].profile.token,
                image: data[key].profile.image,
                userlocation: data[key].profile.userlocation,
                servicesPrice: data[key].profile.servicesPrice,
                distance: 100000000
              };
              if (data[key].profile.userlocation && data[key].profile.userlocation.latitude) {
                info.distance = distance(data[key].profile.userlocation, {
                  location: response.location.lat,
                  longitude: response.location.lng
                });
              }
              items.push(info);
            }
          });
          items.sort(function (a, b) {
            return a.distance - b.distance;
          });
          reslove(items);
          dispatch(getJobListSuccess(items));
          dispatch(isSuccess(true));
          dispatch(isLoading(false));
        }, (error) => {
          dispatch(isLoading(false));
          dispatch(isError(true));
          dispatch(getJobListError(error));
        }));
      }).catch(function (error) {
        dispatch(isLoading(false));
        dispatch(isError(true));
        dispatch(getJobListError(error));
      });
  };
}
