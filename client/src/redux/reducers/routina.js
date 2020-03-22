import {
	ROUTINA_FETCH_REQUEST,
	ROUTINA_FETCH_SUCCESS,
	ROUTINA_FETCH_FAIL
} from '../actions/Const';
const initialState = {
	loans: [],
	loading: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ROUTINA_FETCH_REQUEST:
			return {
				...state,
				loading: true
			};
		
		case ROUTINA_FETCH_SUCCESS:
			return {
				...state,
				loading: false,
				loans: payload
			};
		
		case ROUTINA_FETCH_FAIL:
			return {
				...state,
				loading: false,
				loans: []
			};
		default:
			return state;
	}
}
