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

import axios from "axios";
import { setAlert } from "./alert";

export const loadExpenses = () => async dispatch => {
  dispatch({
    type: EXPENSES_FETCH_REQUEST,
  });
  try {
    const res = await axios.get("/api/expense");
    dispatch({
      type: EXPENSES_FETCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EXPENSES_FETCH_FAIL,
    });
    dispatch(setAlert(`Error ${error.response.data.msg}`, "danger"));
  }
};

export const addExpense = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ ...formData });
  dispatch({
    type: EXPENSES_FETCH_REQUEST,
  });
  try {
    const res = await axios.post("/api/expense", body, config);

    dispatch({
      type: EXPENSES_ADD_SUCCESS,
      payload: res.data,
    });
    dispatch(
      setAlert(` Gatos de ${formData.amount} agregado con exito`, "success")
    );
  } catch (error) {
    dispatch({ type: EXPENSES_ADD_FAIL });
    dispatch(setAlert(`Error ${error.response.data.msg}`, "danger"));
  }
};

export const removeExpenses = id => async dispatch => {
  dispatch({
    type: EXPENSES_DELETE_REQUEST,
  });
  try {
    const res = await axios.delete(`/api/expense/${id}`);

    dispatch({
      type: EXPENSES_DELETE_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert(` Gato borado con exito`, "success"));
  } catch (error) {
    dispatch({ type: EXPENSES_DELETE_FAIL });
    dispatch(setAlert(`Error ${error.response.data.msg}`, "danger"));
  }
};
