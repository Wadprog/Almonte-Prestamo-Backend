import {
	PLAN_FETCH_REQUEST,
	PLAN_FETCH_SUCCESS,
	PLAN_FETCH_FAIL,
	PLAN_ADD_FAIL,
	PLAN_ADD_SUCCESS
} from '../actions/Const';
const initialState = {
	plans: [],
	loading: false,
	user: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case PLAN_FETCH_REQUEST:
			return {
				...state,
				loading: true
			};
		case PLAN_ADD_SUCCESS:
			return {
				...state,
				loading: false,
				plans: [ ...state.plans, payload ]
			};
		case PLAN_FETCH_SUCCESS:
			return {
				...state,
				loading: false,
				plans: payload
			};
		case PLAN_ADD_FAIL:
		case PLAN_FETCH_FAIL:
			return {
				...state,
				loading: false,
				plans: []
			};
		default:
			return state;
	}
}
