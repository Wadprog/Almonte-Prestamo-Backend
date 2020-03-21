import {
	USER_FETCH_REQUEST,
	USER_FETCH_SUCCESS,
	USER_FETCH_FAIL,
	USER_ADD_FAIL,
	USER_ADD_SUCCESS,
	PROXY
} from '../actions/Const';

import axios from 'axios';
import { setAlert } from './alert';
export const loadUsers = () => async dispatch => {
	dispatch({
		type: USER_FETCH_REQUEST
	});
	try {
		const res = await axios.get(PROXY + '/api/user');
		dispatch({
			type: USER_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: USER_FETCH_FAIL
		});
	}
};

export const addUser = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ ...formData });
	dispatch({
		type: USER_FETCH_REQUEST
	});
	try {
		const res = await axios.post(PROXY + '/api/user', body, config);

		dispatch({
			type: USER_ADD_SUCCESS,
			payload: res.data
		});
		dispatch(setAlert(` Usuario de ${formData.name} creado con exito`, 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(`error is ${error}`);
		if (errors) {
			errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
			dispatch({ type: USER_ADD_FAIL });
		}
	}
};
