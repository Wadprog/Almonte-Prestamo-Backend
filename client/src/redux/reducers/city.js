import {
  CITY_FETCH_REQUEST,
  CITY_FETCH_SUCCESS,
  CITY_FETCH_FAIL,
  CITY_ADD_FAIL,
  CITY_ADD_SUCCESS,
  CITY_DELETE_REQUEST,
  CITY_DELETE_SUCCESS,
  CITY_DELETE_FAIL,
} from "../Const";

const initialState = {
  cities: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CITY_DELETE_REQUEST:
    case CITY_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CITY_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        cities: [...state.cities, payload],
      };
    case CITY_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        cities: payload.cities,
      };
    case CITY_ADD_FAIL:
    case CITY_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        cities: [],
      };
    case CITY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        cities: state.cities.filter(city => city.id !== payload.id),
      };
    case CITY_DELETE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
