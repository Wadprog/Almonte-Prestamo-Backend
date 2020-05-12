import {
  PROFILE_SAVE_SUCCESS,
  PROFILE_FETCH_REQUEST,
  PROFILE_FETCH_SUCCESS,
  PROFILE_FETCH_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_SAVE_FAIL,
  FILTER,
  LOAD_SELECTED_PROFILE_FAIL,
  LOAD_SELECTED_PROFILE_SUCCESS,
  LOAD_SELECTED_PROFILE_REQUEST,
} from "../Const";
const initialState = {
  isLoading: false,
  profiles: [],
  profile: null,
  filteredProfiles: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_SELECTED_PROFILE_REQUEST:
    case PROFILE_UPDATE_REQUEST:
    case PROFILE_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profiles: payload,
        filteredProfiles: payload,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profiles: [...state.profiles, payload],
      };

    case PROFILE_SAVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...state.filteredProfiles,
        payload,
        ...state.profiles,
        payload,
      };
    case LOAD_SELECTED_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };
    case LOAD_SELECTED_PROFILE_FAIL:
      return {
        ...state,
        profile: null,
        isLoading: false,
      };
    case PROFILE_SAVE_FAIL:
    case PROFILE_UPDATE_FAIL:
    case PROFILE_FETCH_FAIL:
      return {
        isLoading: false,
        profiles: [],
      };
    case FILTER:
      return {
        ...state,
        filteredProfiles: payload,
      };
    default:
      return { ...state };
  }
}
