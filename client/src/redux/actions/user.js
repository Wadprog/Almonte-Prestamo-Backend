import {
	USER_FETCH_REQUEST,
	USER_FETCH_SUCCESS,
	USER_FETCH_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	
} from '../actions/Const';

import axios from 'axios';
import { setAlert } from './alert';

export const loadUsers = () => async dispatch => {
	dispatch({
		type: USER_FETCH_REQUEST
	});
	try {
		const res = await axios.get('/api/user');
		dispatch({
			type: USER_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: USER_FETCH_FAIL
		});
		dispatch(setAlert(`Error ${error.response.data.msg}`, 'danger'))
	}
};

export const register = ({ name, password })  => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ name, password});
	
	try {
		dispatch({
		type: REGISTER_REQUEST
	});
		const res = await axios.post('/api/user', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
		dispatch(setAlert(` Usuario ${name} creado con exito`, 'success'));
	} catch (error) {

		dispatch({ type:  REGISTER_FAIL });
		dispatch(setAlert(`Error ${error.response.data}`, 'danger'));
			
		}
	}

