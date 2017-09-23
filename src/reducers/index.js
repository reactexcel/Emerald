import { combineReducers } from 'redux';
import { signup } from './signpage';
import { login } from './login';
import { profileUpdate } from './updateprofile';
import { getjobPost } from './jobpostdetails';
import { getprofile } from './getuserprofile';
import { loader } from './loader';
import { pushnotification } from './pushnotification';
import { hireuser } from './hireuser';
import { location } from './userlocation';


export default combineReducers({
  signup,
  login,
  profileUpdate,
  getjobPost,
  getprofile,
  loader,
  pushnotification,
  hireuser,
  location,
});
