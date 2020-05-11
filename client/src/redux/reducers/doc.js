import {
	DOC_FETCH_REQUEST,
	DOC_FETCH_SUCCESS,
	DOC_FETCH_FAIL,

} from '../Const';
const initialState = {
	docs: [],
	loading: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case DOC_FETCH_REQUEST:
			return {
				...state,
				loading: true
			};
	
		case DOC_FETCH_SUCCESS:
			return {
				...state,
				loading: false,
			 docs: payload
			};

		case DOC_FETCH_FAIL:
			return {
				...state,
				loading: false,
				docs: []
			};
		default:
			return state;
	}
}
