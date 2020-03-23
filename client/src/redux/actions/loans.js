import axios from 'axios';
import {
	LOAN_ADD_REQUEST,
	LOAN_ADD_FAIL,
	LOAN_ADD_SUCCESS,
	LOAN_FETCH_FAIL,
	LOAN_FETCH_SUCCESS,
	LOAN_FETCH_REQUEST,
	LOAN_PAYMENT_ADD_REQUEST,
	LOAN_PAYMENT_ADD_SUCCESS,
	LOAN_PAYMENT_ADD_FAIL,
	FILTER_LOAN,
	PROXY
} from './Const';

export const filterLoans = (value, loans) => async dispatch => {
	let filter = loans.filter(loan => !loan.client.name.trim().toLowerCase().indexOf(value.trim().toLowerCase()));

	dispatch({
		type: FILTER_LOAN,
		payload: filter
	});
};
export const loadLoans = () => async dispatch => {
	dispatch({
		type: LOAN_FETCH_REQUEST
	});
	try {
		const res = await axios.get(PROXY + '/api/loan');
		dispatch({
			type: LOAN_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: LOAN_FETCH_FAIL
		});
	}
};

export const addLoan = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ ...formData });

	try {
		dispatch({
			type: LOAN_ADD_REQUEST
		});
		const res = await axios.post(PROXY + '/api/loan', body, config);
		dispatch({
			type: LOAN_ADD_SUCCESS
		});
		dispatch(loadLoans());
	} catch (error) {
		console.log(` here is the error ${error}`);
		dispatch({
			type: LOAN_ADD_FAIL
		});
	}
};

export const payLoan = formData => async dispatch => {
	console.log('in payloan');
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ ...formData });

	try {
		dispatch({
			type: LOAN_PAYMENT_ADD_REQUEST
		});
		const res = await axios.post(PROXY + '/api/loan/due/' + formData.id, body, config);
		dispatch({
			type: LOAN_PAYMENT_ADD_SUCCESS
		});
		dispatch(loadLoans());
	} catch (error) {
		console.log(` here is the error ${error}`);
		dispatch({
			type: LOAN_PAYMENT_ADD_FAIL
		});
	}
};
