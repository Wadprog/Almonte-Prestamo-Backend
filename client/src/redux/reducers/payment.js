import {
  PAYMENT_FETCH_REQUEST,
  PAYMENT_FETCH_SUCCESS,
  PAYMENT_FETCH_FAIL,
  PAYMENT_ADD_FAIL,
  PAYMENT_ADD_SUCCESS,
  PAYMENT_ADD_REQUEST,
  SELECTED_PAYMENTS_REQUEST,
  SELECTED_PAYMENTS_FAIL,
  SELECTED_PAYMENTS_SUCCESS,
} from "../Const";
const initialState = {
  selectedPayment: [],
  payments: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECTED_PAYMENTS_REQUEST:
    case PAYMENT_ADD_REQUEST:
    case PAYMENT_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        payments: [...state.payments, payload],
      };
    case PAYMENT_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        payments: payload,
      };
    case SELECTED_PAYMENTS_SUCCESS:
      return {
        ...state,
        selectedPayment: payload,
        loading: false,
      };
    case SELECTED_PAYMENTS_FAIL:
    case PAYMENT_ADD_FAIL:
    case PAYMENT_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        payments: [],
        selectedPayment: [],
      };
    default:
      return state;
  }
}
