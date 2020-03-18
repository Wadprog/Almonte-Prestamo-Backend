import axios from 'axios';
import {Redirect} from 'react-router-dom'
import { PROFILE_FETCH_REQUEST, PROFILE_FETCH_SUCCESS, PROFILE_FETCH_FAIL, FILTER, PROFILE_SAVE_REQUEST, PROFILE_SAVE_SUCCESS, PROFILE_SAVE_FAIL, } from './Const';

import {setAlert} from './alert'
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
		const res = await axios.get('/api/profile');
		dispatch({
			type: PROFILE_FETCH_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_FETCH_FAIL
		});
	}
};

export const registerClient = (formData) => async dispatch => {

   const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ ...formData })
	dispatch({
		type: PROFILE_SAVE_REQUEST
	});
	try {
				const res = await axios.post('api/profile', body, config)
				dispatch({type:PROFILE_SAVE_SUCCESS})
    dispatch(setAlert("Success", 'success'))
				dispatch(loadProfiles());
				
    
     
	} catch (error) {
  
				const errors = error.response.data.errors;
			
				if (errors) 
		{
  errors.forEach( err=> dispatch(setAlert(err.msg, 'danger')))
    dispatch({type: PROFILE_SAVE_FAIL})
	}
}}


