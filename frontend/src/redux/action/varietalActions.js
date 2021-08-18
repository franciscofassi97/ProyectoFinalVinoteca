import * as actionTypes from "../constants/varietalConstants";
import axios from "axios";

export const crearVarietal = (varietal) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.VARIETAL_CREAR_REQUEST, payload: varietal });

    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    const { data } = await axios.post("/api/varietal/crear", varietal, {
      headers: { Authorization: `Bearer ${infoUsuario.token}` },
    });
    dispatch({ type: actionTypes.VARIETAL_CREAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.VARIETAL_CREAR_FAIL, payload: message });
  }
};

export const getVarietales = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_VARIETAL_REQUEST });

    const { data } = await axios.get("/api/varietal");

    dispatch({
      type: actionTypes.GET_VARIETAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_VARIETAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
