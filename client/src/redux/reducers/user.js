import {
	USER_FETCH_REQUEST,
	USER_FETCH_SUCCESS,
	USER_FETCH_FAIL,
	USER_ADD_FAIL,
	USER_ADD_SUCCESS
} from '../actions/Const';
const initialState = {
	users: [],
	loading: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_FETCH_REQUEST:
			return {
				...state,
				loading: true
			};
		case USER_ADD_SUCCESS:
			return {
				...state,
				loading: false,
				users: [ ...state.users, payload ]
			};
		case USER_FETCH_SUCCESS:
			return {
				...state,
				loading: false,
				users: payload
			};
		case USER_ADD_FAIL:
		case USER_FETCH_FAIL:
			return {
				...state,
				loading: false,
				users: []
			};
		default:
			return state;
	}
}
