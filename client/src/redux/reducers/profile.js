import {
	PROFILE_SAVE_SUCCESS,
	PROFILE_FETCH_REQUEST,
	PROFILE_FETCH_SUCCESS,
	PROFILE_FETCH_FAIL,
	PROFILE_UPDATE_REQUEST,
	PROFILE_UPDATE_SUCCESS,
 PROFILE_UPDATE_FAIL,
 PROFILE_SAVE_FAIL,
	FILTER
} from '../Const';
const initialState = {
	isLoading: false,
	profiles: [],
	filteredProfiles: []
};
export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case PROFILE_UPDATE_REQUEST:
		case PROFILE_FETCH_REQUEST:
			return {
				...state,
				isLoading: true
			};
		case PROFILE_FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				profiles: payload,
				filteredProfiles: payload
			};
		case PROFILE_UPDATE_SUCCESS:
			return {
				...state,
				isLoading: false,
				profiles: [ ...state.profiles, payload ]
			};

		case PROFILE_SAVE_SUCCESS:
			return {
				...state,
				isLoading: false,
				...state.filteredProfiles,
				payload,
				...state.profiles,
				payload
			};
		case PROFILE_SAVE_FAIL:
		case PROFILE_UPDATE_FAIL:
		case PROFILE_FETCH_FAIL:
			return {
				isLoading: false,
				profiles: []
			};
		case FILTER:
			return {
				...state,
				filteredProfiles: payload
			};
		default:
			return { ...state };
	}
}
