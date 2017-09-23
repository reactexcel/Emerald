import Immutable from 'immutable';
import * as constant from '../constant/general';

const initialstate = {
  isLoading: false,
};
export function loader(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.LOADING) {
    return state.set('isLoading', action.payload);
  }
  return state;
}
