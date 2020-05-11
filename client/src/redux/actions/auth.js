import axios from 'axios';
import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOAD_FAIL,
	USER_LOAD_REQUEST,
	USER_LOAD_SUCCESS,
	LOG_OUT,
	LOG_IN_FAIL,
	LOG_IN_SUCCESS,
	LOG_IN_REQUEST
} from '../Const';

import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

/********************* LOG OUT Function*****************************/
export const logout = () => async dispatch => {
	dispatch({
		type: LOG_OUT
	});
};
/*************************LOG IN Function*************************/
export const login = ({ name, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ name, password });

	try {


		dispatch({
			type: LOG_IN_REQUEST
		});

		const res = await axios.post('api/auth', body, config);
		dispatch({
			type: LOG_IN_SUCCESS,
			payload: res.data
		});
		dispatch(setAlert(`Bienvenido de regreso`, 'success'));

	} catch ( error) {
			dispatch(setAlert(` Error ${error.response.data.msg} `, 'danger'));
		dispatch({
			type: LOG_IN_FAIL
		});
	}
};

/*************************GET USER DETAILS*************************/

export const loadUser = () => async dispatch => {
	if (localStorage.token) setAuthToken(localStorage.token);
	try {
		dispatch({
			type: USER_LOAD_REQUEST
		});
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOAD_SUCCESS,
			payload: res.data
		});
			

	} catch (error) {
		console.log(error)
		dispatch(setAlert(`${error.response.data.msg} `, 'danger'));
		dispatch({
			type: USER_LOAD_FAIL
		});
	}
};
