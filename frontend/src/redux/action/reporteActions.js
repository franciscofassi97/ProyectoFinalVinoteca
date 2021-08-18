import * as actionTypes from "../constants/reportesConstants";
import axios from "axios";

export const ingresosBrutosPorMes = (anio) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.GET_INGRESOS_BRUTOS_MES_REQUEST,
    payload: anio,
  });

  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();

  try {
    const { data } = await axios.get(`/api/reportes/ingreseos/brutos/${anio}`, {
      headers: {
        Authorization: `Bearer ${infoUsuario?.token}`,
      },
    });
    dispatch({
      type: actionTypes.GET_INGRESOS_BRUTOS_MES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionTypes.GET_INGRESOS_BRUTOS_MES_FAIL,
      payload: message,
    });
  }
};

export const getTipoMasVendido = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_TIPO_MAS_VENDIDO_REQUEST });

    const { data } = await axios.get("/api/reportes/tipo/mas/vendido");

    dispatch({
      type: actionTypes.GET_TIPO_MAS_VENDIDO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TIPO_MAS_VENDIDO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cantidadProductosMes = () => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.GET_CANTIDAD_PRODUCTOS_MES_REQUEST,
    // payload: anio,
  });

  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();

  try {
    const { data } = await axios.get(
      `/api/reportes/cantidad/productos/vendidos/por/mes`,
      {
        headers: {
          Authorization: `Bearer ${infoUsuario?.token}`,
        },
      }
    );
    dispatch({
      type: actionTypes.GET_CANTIDAD_PRODUCTOS_MES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionTypes.GET_CANTIDAD_PRODUCTOS_MES_FAIL,
      payload: message,
    });
  }
};

export const comportamientoPorMes =
  (idVarietal) => async (dispatch, getState) => {
    dispatch({
      type: actionTypes.GET_COMPORTAMIENTO_REQUEST,
      payload: idVarietal,
    });

    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    try {
      const { data } = await axios.get(
        `/api/reportes/comportamieto/varietal/${idVarietal}`,
        {
          headers: {
            Authorization: `Bearer ${infoUsuario?.token}`,
          },
        }
      );
      dispatch({
        type: actionTypes.GET_COMPORTAMIENTO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: actionTypes.GET_COMPORTAMIENTO_FAIL,
        payload: message,
      });
    }
  };
