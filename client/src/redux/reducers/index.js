import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import loan from './loan';
import city from './city';
import plan from './plan';
import payment from './payment';
export default combineReducers({
	alert,
	auth,
	profile,
	loan,
	city,
	plan,
	payment
});
