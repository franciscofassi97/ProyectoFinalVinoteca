import * as actionTypes from "../constants/tipoVinoConstants";
import axios from "axios";

export const crearTipoVino = (tipoVino) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.TIPOVINO_CREAR_REQUEST, payload: tipoVino });

    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    const { data } = await axios.post("/api/tipoVino/crear", tipoVino, {
      headers: { Authorization: `Bearer ${infoUsuario.token}` },
    });
    dispatch({ type: actionTypes.TIPOVINO_CREAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.TIPOVINO_CREAR_FAIL, payload: message });
  }
};

export const getTipoVinos = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_TIPOVINO_REQUEST });

    const { data } = await axios.get("/api/tipoVino");

    dispatch({
      type: actionTypes.GET_TIPOVINO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TIPOVINO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
