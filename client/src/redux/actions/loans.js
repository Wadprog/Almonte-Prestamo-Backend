import axios from "axios";
import { setAlert } from "./alert";
import { loadPayment } from "./payment";
import {
  GET_SELECTED_LOANS_REQUEST,
  GET_SELECTED_LOANS_SUCCESS,
  GET_SELECTED_LOANS_FAIL,
  ADD_PAY_REQUEST,
  ADD_PAY_SUCCESS,
  ADD_PAY_FAIL,
  GET_LOAN_REQUEST,
  GET_LOAN_FAIL,
  GET_LOAN_SUCCESS,
  LOAN_ADD_REQUEST,
  LOAN_ADD_FAIL,
  LOAN_ADD_SUCCESS,
  LOAN_FETCH_FAIL,
  LOAN_FETCH_SUCCESS,
  LOAN_FETCH_REQUEST,
  PAYMENT_ADD_REQUEST,
  PAYMENT_ADD_SUCCESS,
  LOAN_PAYMENT_ADD_FAIL,
  FILTER_LOAN,
  LOAN_CANCEL_REQUEST,
  LOAN_CANCEL_SUCCESS,
  LOAN_CANCEL_FAIL,
  LOAN_RENEW_REQUEST,
  LOAN_RENEW_SUCCESS,
  LOAN_RENEW_FAIL,
  REMOVE_LASTPAYMENT_SUCCESS,
  REMOVE_LASTPAYMENT_REQUEST,
  REMOVE_LASTPAYMENT_FAIL,
} from "../Const";

export const loadClientLoan = id => async dispatch => {
  dispatch({
    type: GET_SELECTED_LOANS_REQUEST,
  });

  try {
    const res = await axios.get(`/api/loan/client/${id}`);
    dispatch({
      type: GET_SELECTED_LOANS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELECTED_LOANS_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};
export const filterLoans = (value, loans) => async dispatch => {
  let filter = loans.filter(
    loan =>
      !loan.client.name.trim().toLowerCase().indexOf(value.trim().toLowerCase())
  );

  dispatch({
    type: FILTER_LOAN,
    payload: filter,
  });
};
export const addpay = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ ...formData });
  dispatch({
    type: ADD_PAY_REQUEST,
  });

  try {
    const res = await axios.post(`/api/loan/due/${formData.id}`, body, config);
    dispatch(loadPayment());
    dispatch(setAlert(`Pago agregado con exito`, "success"));
  } catch (error) {
    dispatch({
      type: ADD_PAY_FAIL,
    });
    dispatch(setAlert(`Error ${error.response.data.msg}`, "danger"));
  }
};
export const getLoanById = id => async dispatch => {
  dispatch({
    type: GET_LOAN_REQUEST,
  });
  try {
    const res = await axios.get(`/api/loan/${id}`);
    dispatch({
      type: GET_LOAN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_LOAN_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const loadLoans = () => async dispatch => {
  dispatch({
    type: LOAN_FETCH_REQUEST,
  });
  try {
    const res = await axios.get("/api/loan");
    dispatch({
      type: LOAN_FETCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOAN_FETCH_FAIL,
    });
    dispatch(setAlert(`Error ${error.response.data.msg}`, "danger"));
  }
};

export const addLoan = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ ...formData });

  try {
    dispatch({
      type: LOAN_ADD_REQUEST,
    });
    const res = await axios.post("/api/loan", body, config);
    dispatch({
      type: LOAN_ADD_SUCCESS,
    });
    dispatch(loadLoans());
    dispatch(setAlert(` Prestamo creado con exito`, "success"));
  } catch (error) {
    dispatch({
      type: LOAN_ADD_FAIL,
    });
    dispatch(setAlert(`Error ${error.response.data.msg}`, "danger"));
  }
};

export const removeLoan = id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({
      type: LOAN_CANCEL_REQUEST,
    });
    const res = await axios.post("/api/loan/cancel/" + id, null, config);
    dispatch({
      type: LOAN_CANCEL_SUCCESS,
    });
    dispatch(loadLoans());
    dispatch(setAlert(` Prestamo cancelado con exito`, "success"));
  } catch (error) {
    dispatch({
      type: LOAN_CANCEL_FAIL,
    });
    dispatch(setAlert(`Error ${error.response.data.msg}`, "danger"));
  }
};

export const renewLoan = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ ...formData });

  try {
    dispatch({
      type: LOAN_RENEW_REQUEST,
    });
    const res = await axios.post(
      "/api/loan/renew/" + formData.id,
      body,
      config
    );

    dispatch({
      type: LOAN_RENEW_SUCCESS,
    });
    dispatch(loadLoans());
    dispatch(setAlert(` Prestamo Renovado con exito`, "success"));
  } catch (error) {
    dispatch({
      type: LOAN_RENEW_FAIL,
    });
    dispatch(setAlert(`Error ${error.response.data.msg}`, "danger"));
  }
};
export const payLoan = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ ...formData });

  try {
    dispatch({
      type: PAYMENT_ADD_REQUEST,
    });
    const res = await axios.post("/api/loan/due/" + formData.id, body, config);
    dispatch({
      type: PAYMENT_ADD_SUCCESS,
      payload: res.data,
    });
    dispatch(loadLoans());
    dispatch(setAlert(` Prestamo Pagado con exito`, "success"));
  } catch (error) {
    dispatch({
      type: LOAN_PAYMENT_ADD_FAIL,
    });
    dispatch(setAlert(`Error ${error.response.data.msg}`, "danger"));
  }
};

export const RemoveLastPayment = id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({
      type: REMOVE_LASTPAYMENT_REQUEST,
    });
    const res = await axios.post("/api/loan/lastpay/" + id, null, config);
    dispatch({
      type: REMOVE_LASTPAYMENT_SUCCESS,
    });
    dispatch(loadLoans());
    dispatch(setAlert(` El ultimo pago fue cancelado con exito`, "success"));
  } catch (error) {
    dispatch({
      type: REMOVE_LASTPAYMENT_FAIL,
    });
    dispatch(setAlert(`Error ${error.response.data.msg}`, "danger"));
  }
};
