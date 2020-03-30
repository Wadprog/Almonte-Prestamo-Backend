import { DOC_FETCH_REQUEST, DOC_FETCH_SUCCESS, DOC_FETCH_FAIL, PROXY } from '../actions/Const';

import axios from 'axios';

export const loadDoc = () => async dispatch => {
	dispatch({
		type: DOC_FETCH_REQUEST
	});
	try {
		const res = await axios.get(PROXY + '/api/doc');
		dispatch({
			type: DOC_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: DOC_FETCH_FAIL
		});
	}
};
