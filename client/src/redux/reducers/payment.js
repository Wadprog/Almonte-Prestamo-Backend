import {
	PAYMENT_FETCH_REQUEST,
	PAYMENT_FETCH_SUCCESS,
	PAYMENT_FETCH_FAIL,
	PAYMENT_ADD_FAIL,
	PAYMENT_ADD_SUCCESS
} from '../actions/Const';
const initialState = {
	payments: [],
	loading: false,
	user: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case PAYMENT_FETCH_REQUEST:
			return {
				...state,
				loading: true
			};
		case PAYMENT_ADD_SUCCESS:
			return {
				...state,
				loading: false,
				payments: [ ...state.payments, payload ]
			};
		case PAYMENT_FETCH_SUCCESS:
			return {
				...state,
				loading: false,
				payments: payload
			};
		case PAYMENT_ADD_FAIL:
		case PAYMENT_FETCH_FAIL:
			return {
				...state,
				loading: false,
				payments: []
			};
		default:
			return state;
	}
}
