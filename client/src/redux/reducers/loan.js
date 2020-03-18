import { FILTER_LOAN, LOAN_ADD_REQUEST, LOAN_ADD_FAIL, LOAN_ADD_SUCCESS, LOAN_FETCH_FAIL, LOAN_FETCH_SUCCESS,LOAN_FETCH_REQUEST } from '../actions/Const';
const initialState = {
	filteredLoans:[],
	loans: [],
	loading: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOAN_FETCH_SUCCESS:
			return {
				...state,
				loans: payload,
				filteredLoans:payload,
				loading: false
			};
			case LOAN_FETCH_REQUEST:
			case LOAN_ADD_REQUEST: 
			return{
				...state, 
				loading: true
			}
			case LOAN_ADD_FAIL:
			case LOAN_ADD_SUCCESS:
			return{
				...state, 
				loading:false, 
			}
		case LOAN_FETCH_FAIL:
			return {
				...state,
				loading: false,
				loans: [],
				filteredLoans:[]
			};
			case FILTER_LOAN:
				return {
					...state,
					filteredLoans:payload
				}
		default:
			return { ...state };
	}
}
