import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import loan from './loan';
import city from './city';
import plan from './plan';
import payment from './payment';
import user from './user';
import routina from './routina';
import statistic from './statistic';
import expense from './expense';
export default combineReducers({
	alert,
	auth,
	profile,
	loan,
	city,
	plan,
	payment,
	user,
	routina,
	statistic,
	expense
});
