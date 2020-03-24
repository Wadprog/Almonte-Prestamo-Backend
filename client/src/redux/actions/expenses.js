import {
	EXPENSES_FETCH_REQUEST,
	EXPENSES_FETCH_SUCCESS,
	EXPENSES_FETCH_FAIL,
	EXPENSES_ADD_FAIL,
	EXPENSES_ADD_SUCCESS,
	PROXY
} from '../actions/Const';

import axios from 'axios';
import { setAlert } from './alert';

export const loadExpenses = () => async dispatch => {
	dispatch({
		type: EXPENSES_FETCH_REQUEST
	});
	try {
		const res = await axios.get(PROXY + '/api/expense');
		dispatch({
			type: EXPENSES_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: EXPENSES_FETCH_FAIL
		});
	}
};

export const addExpense = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ ...formData });
	dispatch({
		type: EXPENSES_FETCH_REQUEST
	});
	try {
		const res = await axios.post(PROXY + '/api/expense', body, config);

		dispatch({
			type: EXPENSES_ADD_SUCCESS,
			payload: res.data
		});
		dispatch(setAlert(` Gatos de ${formData.amount} agregado con exito`, 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(`error is ${error}`);
		if (errors) {
			errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
			dispatch({ type: EXPENSES_ADD_FAIL });
		}
	}
};
