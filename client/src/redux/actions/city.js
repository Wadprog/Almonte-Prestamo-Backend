import {
	CITY_FETCH_REQUEST,
	CITY_FETCH_SUCCESS,
	CITY_FETCH_FAIL,
	CITY_ADD_FAIL,
	CITY_ADD_SUCCESS,
	PROXY
} from '../actions/Const';

import axios from 'axios';

import { setAlert } from './alert';

export const loadCities = () => async dispatch => {
	dispatch({
		type: CITY_FETCH_REQUEST
	});
	try {
		const res = await axios.get(PROXY + '/api/city');
		dispatch({
			type: CITY_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: CITY_FETCH_FAIL
		});
	}
};

export const addCity = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ ...formData });
	dispatch({
		type: CITY_FETCH_REQUEST
	});
	try {
		const res = await axios.post(PROXY + '/api/city', body, config);

		dispatch({
			type: CITY_ADD_SUCCESS,
			payload: res.data
		});
		dispatch(loadCities);
		dispatch(setAlert(` Ciudad ${formData.name} agregado con exito`, 'success'));
	} catch (error) {
		dispatch(setAlert('Error al agregar ciudad verifica que hay internet', 'danger'));
		dispatch({ type: CITY_ADD_FAIL });
	}
};
