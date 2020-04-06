import {
	USER_LOAD_FAIL,
	USER_LOAD_REQUEST,
	USER_LOAD_SUCCESS,
	LOG_OUT,
	LOG_IN_FAIL,
	LOG_IN_SUCCESS,
	LOG_IN_REQUEST
} from '../actions/Const';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOAD_REQUEST:
		case LOG_IN_REQUEST:
			return {
				...state,
				loading: true
			};
		case USER_LOAD_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			};

		case LOG_IN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};

		case USER_LOAD_FAIL:
		case LOG_OUT:
		case LOG_IN_FAIL:
			localStorage.removeItem('token');
			return {
				...state,
				loading: false,
				isAuthenticated: false
			};
		default:
			return state;
	}
}
