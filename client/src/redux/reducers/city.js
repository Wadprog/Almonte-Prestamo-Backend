import {
	CITY_FETCH_REQUEST,
	CITY_FETCH_SUCCESS,
	CITY_FETCH_FAIL,
	CITY_ADD_FAIL,
	CITY_ADD_SUCCESS
} from '../actions/Const';
const initialState = {
	cities: [],
	loading: false,
	user: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CITY_FETCH_REQUEST:
			return {
				...state,
				loading: true
			};
		case CITY_ADD_SUCCESS:
			return {
				...state,
				loading: false,
				cities: [ ...state.cities, payload ]
			};
		case CITY_FETCH_SUCCESS:
			return {
				...state,
				loading: false,
				cities: payload
			};
		case CITY_ADD_FAIL:
		case CITY_FETCH_FAIL:
			return {
				...state,
				loading: false,
				cities: []
			};
		default:
			return state;
	}
}
