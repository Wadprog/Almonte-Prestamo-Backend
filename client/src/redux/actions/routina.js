import { ROUTINA_FETCH_SUCCESS, ROUTINA_FETCH_REQUEST, ROUTINA_FETCH_FAIL, PROXY } from '../actions/Const';

import axios from 'axios';

export const loadRoutina = () => async dispatch => {
	dispatch({
		type: ROUTINA_FETCH_REQUEST
	});
	try {
		const res = await axios.get(PROXY + '/api/loan/get/routine');
		dispatch({
			type: ROUTINA_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: ROUTINA_FETCH_FAIL
		});
	}
};
