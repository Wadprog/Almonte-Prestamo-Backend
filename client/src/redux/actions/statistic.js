import { STATISTICS_FETCH_REQUEST, STATISTICS_FETCH_SUCCESS, STATISTICS_FETCH_FAIL, PROXY } from '../Const';

import axios from 'axios';
import { setAlert } from './alert';

export const loadStatistic = () => async dispatch => {
	dispatch({
		type: STATISTICS_FETCH_REQUEST
	});
	try {
		const res = await axios.get(PROXY + '/api/statistic');
		dispatch({
			type: STATISTICS_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: STATISTICS_FETCH_FAIL
		});
	}
};
