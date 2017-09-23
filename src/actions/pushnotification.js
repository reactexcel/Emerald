import { createAction } from 'redux-actions';
import * as action from '../api/pushnotification';
import * as constant from '../constant/pushnotification';
import { isLoading } from './loader';

function pushSuccess(data) {
  return createAction(constant.PUSH_REQUEST)(data);
}
function isSuccess(data) {
  return createAction(constant.PUSH_SUCCESS)(data);
}
function pushError(data) {
  return createAction(constant.PUSH_ERROR)(data);
}
export function sendNotification(body, type) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(isLoading(true));
      action.sendData(body, type).then((val) => {
        reslove(val);
        dispatch(isLoading(false));
        dispatch(pushSuccess(val.headers));
        dispatch(isSuccess(true));
      }, (error) => {
        dispatch(isLoading(false));
        dispatch(isError(true));
        dispatch(pushError(error));
      },
    );
    });
  };
}
