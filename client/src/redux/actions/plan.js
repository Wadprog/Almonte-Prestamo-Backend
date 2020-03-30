import {
	PLAN_FETCH_REQUEST,
	PLAN_FETCH_SUCCESS,
	PLAN_FETCH_FAIL,
	PLAN_ADD_FAIL,
	PLAN_ADD_SUCCESS,
	PROXY
} from '../actions/Const';

import axios from 'axios';

import { setAlert } from './alert';

export const loadPlan = () => async dispatch => {
	dispatch({
		type: PLAN_FETCH_REQUEST
	});
	try {
		const res = await axios.get(PROXY + '/api/plan');
		dispatch({
			type: PLAN_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PLAN_FETCH_FAIL
		});
	}
};

export const addPlan = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ ...formData });
	dispatch({
		type: PLAN_FETCH_REQUEST
	});
	try {
		const res = await axios.post(PROXY + '/api/plan', body, config);

		dispatch({
			type: PLAN_ADD_SUCCESS,
			payload: res.data
		});
		dispatch(setAlert(` Plan de ${formData.name} creado con exito`, 'success'));
	} catch (error) {
		dispatch(setAlert('Error al agregar plan verifica que hay internet', 'danger'));
			dispatch({ type: PLAN_ADD_FAIL });
		}
	}

