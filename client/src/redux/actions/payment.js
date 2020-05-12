import {
  PAYMENT_FETCH_REQUEST,
  PAYMENT_FETCH_SUCCESS,
  PAYMENT_FETCH_FAIL,
  SELECTED_PAYMENTS_FAIL,
  SELECTED_PAYMENTS_REQUEST,
  SELECTED_PAYMENTS_SUCCESS,
} from "../Const";

import axios from "axios";
import { setAlert } from "./alert";
export const getPaymentsById = (id) => async (dispatch) => {
  dispatch({
    type: SELECTED_PAYMENTS_REQUEST,
  });
  try {
    const res = await axios.get(`/api/payment/loan/${id}`);
    dispatch({
      type: SELECTED_PAYMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SELECTED_PAYMENTS_FAIL,
    });
    dispatch(setAlert(`Error ${error.data.msg}`, "danger"));
  }
};
export const loadPayment = () => async (dispatch) => {
  dispatch({
    type: PAYMENT_FETCH_REQUEST,
  });
  try {
    const res = await axios.get("/api/payment");
    dispatch({
      type: PAYMENT_FETCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_FETCH_FAIL,
    });
  }
};
