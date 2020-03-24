import {
	STATISTICS_FETCH_REQUEST,
	STATISTICS_FETCH_SUCCESS,
	STATISTICS_FETCH_FAIL,
	
} from '../actions/Const';
const initialState = {
	statistics: [],
	loading: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case STATISTICS_FETCH_REQUEST:
			return {
				...state,
				loading: true
			};
		case STATISTICS_FETCH_SUCCESS:
			return {
				...state,
				loading: false,
				statistics: payload
			};

		case STATISTICS_FETCH_FAIL:
			return {
				...state,
				loading: false,
				statistic: []
			};
		default:
			return state;
	}
}
