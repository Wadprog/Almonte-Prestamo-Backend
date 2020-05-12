import {
  ADD_PAY_REQUEST,
  ADD_PAY_SUCCESS,
  ADD_PAY_FAIL,
  GET_LOAN_REQUEST,
  GET_LOAN_FAIL,
  GET_LOAN_SUCCESS,
  FILTER_LOAN,
  LOAN_ADD_REQUEST,
  LOAN_ADD_FAIL,
  LOAN_ADD_SUCCESS,
  LOAN_FETCH_FAIL,
  LOAN_FETCH_SUCCESS,
  LOAN_FETCH_REQUEST,
  LOAN_PAYMENT_ADD_FAIL,
  LOAN_PAYMENT_ADD_SUCCESS,
  LOAN_PAYMENT_ADD_REQUEST,
  LOAN_CANCEL_REQUEST,
  LOAN_CANCEL_SUCCESS,
  LOAN_CANCEL_FAIL,
  LOAN_RENEW_REQUEST,
  LOAN_RENEW_SUCCESS,
  LOAN_RENEW_FAIL,
  GET_SELECTED_LOANS_REQUEST,
  GET_SELECTED_LOANS_FAIL,
  GET_SELECTED_LOANS_SUCCESS,
} from "../Const";

const initialState = {
  filteredLoans: [],
  loans: [],
  loading: false,
  loan: null,
  selectedLoans: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LOAN_SUCCESS:
      return {
        ...state,
        loan: payload,
        loading: false,
      };

    case GET_LOAN_FAIL:
      return {
        ...state,
        loan: null,
        loading: false,
      };
    case GET_SELECTED_LOANS_SUCCESS:
      return {
        ...state,
        selectedLoans: payload,
        loading: false,
      };

    case GET_SELECTED_LOANS_FAIL:
      return {
        ...state,
        selectedLoans: [],
        loading: false,
      };

    case LOAN_FETCH_SUCCESS:
      return {
        ...state,
        loans: payload,
        filteredLoans: payload,
        loading: false,
      };
    case GET_SELECTED_LOANS_REQUEST:
    case GET_LOAN_REQUEST:
    case LOAN_RENEW_REQUEST:
    case LOAN_CANCEL_REQUEST:
    case LOAN_PAYMENT_ADD_REQUEST:
    case LOAN_FETCH_REQUEST:
    case LOAN_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAN_RENEW_SUCCESS:
    case LOAN_RENEW_FAIL:
    case LOAN_CANCEL_FAIL:
    case LOAN_CANCEL_SUCCESS:
    case LOAN_PAYMENT_ADD_FAIL:
    case LOAN_PAYMENT_ADD_SUCCESS:
    case LOAN_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case LOAN_ADD_FAIL:
    case LOAN_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        loans: [],
        filteredLoans: [],
      };
    case FILTER_LOAN:
      return {
        ...state,
        filteredLoans: payload,
      };
    default:
      return { ...state };
  }
}
