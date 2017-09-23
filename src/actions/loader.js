import { createAction } from 'redux-actions';
import * as constant from '../constant/general';

export function isLoading(data) {
  return createAction(constant.LOADING)(data);
}
