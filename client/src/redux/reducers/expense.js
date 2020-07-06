import {
  EXPENSES_FETCH_REQUEST,
  EXPENSES_FETCH_SUCCESS,
  EXPENSES_FETCH_FAIL,
  EXPENSES_ADD_FAIL,
  EXPENSES_ADD_SUCCESS,
  EXPENSES_DELETE_REQUEST,
  EXPENSES_DELETE_SUCCESS,
  EXPENSES_DELETE_FAIL,
} from "../Const";
const initialState = {
  expenses: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case EXPENSES_DELETE_REQUEST:
    case EXPENSES_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EXPENSES_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        expenses: [...state.expenses, payload],
      };
    case EXPENSES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        expenses: payload,
      };
    case EXPENSES_ADD_FAIL:
    case EXPENSES_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        plans: [],
      };
    case EXPENSES_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        expenses: state.expenses.filter(expense => expense._id != payload.id),
      };
    case EXPENSES_DELETE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
