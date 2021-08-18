import * as actionTypes from "../constants/bodegasConstants";
import axios from "axios";

export const crearBodega = (bodega) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.BODEGA_CREAR_REQUEST, payload: bodega });

    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    const { data } = await axios.post("/api/bodegas/crear", bodega, {
      headers: { Authorization: `Bearer ${infoUsuario.token}` },
    });
    dispatch({ type: actionTypes.BODEGA_CREAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.BODEGA_CREAR_FAIL, payload: message });
  }
};

export const getBodegas = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_BODEGA_REQUEST });

    const { data } = await axios.get("/api/bodegas");

    dispatch({
      type: actionTypes.GET_BODEGA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_BODEGA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
