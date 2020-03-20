import { PAYMENT_FETCH_REQUEST, PAYMENT_FETCH_SUCCESS, PAYMENT_FETCH_FAIL, PROXY } from '../actions/Const';

import axios from 'axios';

export const loadPayment = () => async dispatch => {
	dispatch({
		type: PAYMENT_FETCH_REQUEST
	});
	try {
		const res = await axios.get(PROXY + '/api/payment');
		dispatch({
			type: PAYMENT_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PAYMENT_FETCH_FAIL
		});
	}
};
