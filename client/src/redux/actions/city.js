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

import axios from "axios";

import { setAlert } from "./alert";

export const loadCities = () => async dispatch => {
  dispatch({
    type: CITY_FETCH_REQUEST,
  });
  try {
    const res = await axios.get("/api/city/stats/client");
    dispatch({
      type: CITY_FETCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CITY_FETCH_FAIL,
    });
    dispatch(setAlert(`Error ${error.response.data.msg}`, "danger"));
  }
};

export const addCity = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ ...formData });

  try {
    dispatch({
      type: CITY_FETCH_REQUEST,
    });
    const res = await axios.post("/api/city", body, config);

    dispatch({
      type: CITY_ADD_SUCCESS,
      payload: res.data,
    });

    dispatch(
      setAlert(` Ciudad ${formData.name} agregado con exito`, "success")
    );
  } catch (error) {
    dispatch({ type: CITY_ADD_FAIL });
    dispatch(
      setAlert(`Error al agregar ciudad ${error.response.data.msg}`, "danger")
    );
  }
};

export const removeCity = id => async dispatch => {
  try {
    dispatch({
      type: CITY_DELETE_REQUEST,
    });
    const res = await axios.delete(`/api/city/${id}`);

    dispatch({
      type: CITY_DELETE_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert(` Ciudad Borado con exito`, "success"));
  } catch (error) {
    dispatch({ type: CITY_DELETE_FAIL });
    dispatch(setAlert(`Error al Borar ciudad`, "danger"));
  }
};
