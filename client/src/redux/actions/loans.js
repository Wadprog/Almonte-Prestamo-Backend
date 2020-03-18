import axios from 'axios';
import { LOAN_ADD_REQUEST, LOAN_ADD_FAIL, LOAN_ADD_SUCCESS, LOAN_FETCH_FAIL, LOAN_FETCH_SUCCESS,LOAN_FETCH_REQUEST } from './Const';

export const loadLoans = () => async dispatch => {
  dispatch({
    type:LOAN_FETCH_REQUEST
  })
	try {
		const res = await axios.get('/api/loan');
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
		const res = await axios.post('/api/loan', body, config);
		dispatch({
			type: LOAN_ADD_SUCCESS,
			
    });
    dispatch(loadLoans())
	} catch (error) {
    console.log(` here is the error ${error}`)
		dispatch({
			type: LOAN_ADD_FAIL
		});
	}
};
