import axios from 'axios';
import {
	PROFILE_FETCH_REQUEST,
	PROFILE_FETCH_SUCCESS,
	PROFILE_FETCH_FAIL,
	FILTER,
	PROFILE_SAVE_REQUEST,
	PROFILE_SAVE_SUCCESS,
	PROFILE_SAVE_FAIL,
	PROFILE_UPDATE_REQUEST,
	PROFILE_UPDATE_SUCCESS,
	PROFILE_UPDATE_FAIL
} from '../Const';

import { setAlert } from './alert';

export const filterProfiles = (value, profiles) => async dispatch => {
	let filter = profiles.filter(item => !item.name.trim().toLowerCase().indexOf(value.trim().toLowerCase()));
	console.log(`Amen ${profiles[0]} and the filter is ${filter}`);
	dispatch({
		type: FILTER,
		payload: filter
	});
};
export const loadProfiles = () => async dispatch => {
	dispatch({
		type: PROFILE_FETCH_REQUEST
	});
	try {
		const res = await axios.get('/api/client');
		dispatch({
			type: PROFILE_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_FETCH_FAIL
		});
		dispatch(setAlert(`Error ${error.response.data.msg}`, 'danger', 400));
	}
};

export const registerClient = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ ...formData });
	dispatch({
		type: PROFILE_SAVE_REQUEST
	});
	try {
		const res = await axios.post('/api/client', body, config);
		console.log(res);
		dispatch({
			type: PROFILE_SAVE_SUCCESS,
			payload: res.data
		});
		dispatch(setAlert(`${formData.name} creado con exito`, 'success'));
		dispatch(loadProfiles());
	} catch (error) {
		dispatch({ type: PROFILE_SAVE_FAIL });
		dispatch(setAlert(`Error ${error.response.data.msg}`, 'danger'));
	}
};

export const updateClient = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ ...formData });
	dispatch({
		type: PROFILE_UPDATE_REQUEST
	});
	try {
		const res = await axios.put('/api/client', body, config);
		console.log(res);
		dispatch({
			type: PROFILE_UPDATE_SUCCESS,
			payload: res.data
		});
		dispatch(setAlert(`${formData.name} actualizado con exito`, 'success'));
		dispatch(loadProfiles());
	} catch (error) {
		dispatch({
			type: PROFILE_UPDATE_FAIL
		});
		dispatch(setAlert(` Error  ${error.response.data.msg}`, 'danger'));
	}
};
