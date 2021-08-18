import * as actionTypes from "../constants/ofertasConstants";
import axios from "axios";

export const crearOferta = (oferta) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.OFERTA_CREAR_REQUEST, payload: oferta });

    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    const { data } = await axios.post("/api/ofertas/crear", oferta, {
      headers: { Authorization: `Bearer ${infoUsuario.token}` },
    });
    dispatch({ type: actionTypes.OFERTA_CREAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.OFERTA_CREAR_FAIL, payload: message });
  }
};

export const getOfertas = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OFERTAS_REQUEST });

    const { data } = await axios.get("/api/ofertas");

    dispatch({
      type: actionTypes.GET_OFERTAS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_OFERTAS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPrecioOferta = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_PRECIO_OFERTA_REQUEST });

  try {
    let { data } = await axios.get(`/api/ofertas/${id}`);

    dispatch({
      type: actionTypes.GET_PRECIO_OFERTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRECIO_OFERTA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOfertasGestion = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_GESTION_OFERTA_REQUEST });

    const { data } = await axios.get("/api/ofertas/gestion/lista");

    dispatch({
      type: actionTypes.GET_GESTION_OFERTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_GESTION_OFERTA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const eliminarOferta = (ofertaId) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.ELMINIAR_OFERTA_REQUEST,
    payload: ofertaId,
  });
  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();
  try {
    axios.delete(`/api/ofertas/${ofertaId}`, {
      headers: { Authorization: `Bearer ${infoUsuario.token}` },
    });
    dispatch({ type: actionTypes.ELMINIAR_OFERTA_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.ELMINIAR_OFERTA_FAIL, payload: message });
  }
};
