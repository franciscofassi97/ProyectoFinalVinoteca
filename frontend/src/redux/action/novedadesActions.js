import * as actionTypes from "../constants/novedadesConstants";
import axios from "axios";

export const getNovedades = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_NOVEDADES_REQUEST });

    const { data } = await axios.get("/api/novedades");

    dispatch({
      type: actionTypes.GET_NOVEDADES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_NOVEDADES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const eliminarNovedad = (novedadId) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.NOVEDAD_ELIMINAR_REQUEST,
    payload: novedadId,
  });
  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();
  try {
    axios.delete(`/api/novedades/eliminar/${novedadId}`, {
      headers: { Authorization: `Bearer ${infoUsuario.token}` },
    });
    dispatch({ type: actionTypes.NOVEDAD_ELIMINAR_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.NOVEDAD_ELIMINAR_FAIL, payload: message });
  }
};

export const crearNovedad = (novedad) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.NOVEDAD_CREAR_REQUEST, payload: novedad });

    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    const formData = new FormData();
    formData.append("descripcion", novedad.descripcion);
    formData.append("imagenUrl", novedad.imagenUrl);

    const { data } = await axios.post("/api/novedades/crear", formData, {
      headers: {
        Authorization: `Bearer ${infoUsuario.token}`,
      },
    });
    dispatch({ type: actionTypes.NOVEDAD_CREAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.NOVEDAD_CREAR_FAIL, payload: message });
  }
};
