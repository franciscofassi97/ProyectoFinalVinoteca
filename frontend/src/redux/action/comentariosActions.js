import * as actionTypes from "../constants/comentariosConstats";
import axios from "axios";

export const getComentariosIdProducto = (id) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.GET_COMENTARIOS_REQUEST, payload: id });
  try {
    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    const { data } = await axios.get(`/api/comentarios/${id}`, {
      headers: { Authorization: `Bearer ${infoUsuario.token}` },
    });

    dispatch({
      type: actionTypes.GET_COMENTARIOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_COMENTARIOS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const crearComentario = (comentario) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.COMENTARIO_CREAR_REQUEST,
      payload: comentario,
    });

    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    const { data } = await axios.post("/api/comentarios/crear", comentario, {
      headers: { Authorization: `Bearer ${infoUsuario.token}` },
    });
    dispatch({ type: actionTypes.COMENTARIO_CREAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.COMENTARIO_CREAR_FAIL, payload: message });
  }
};

export const actualizarComentario =
  (comentario) => async (dispatch, getState) => {
    dispatch({
      type: actionTypes.COMENTARIO_ACTUALIZAR_REQUEST,
      payload: comentario,
    });
    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    try {
      const { data } = await axios.put(
        `/api/comentarios/${comentario._id}`,
        comentario,
        {
          headers: { Authorization: `Bearer ${infoUsuario.token}` },
        }
      );
      dispatch({
        type: actionTypes.COMENTARIO_ACTUALIZAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: actionTypes.COMENTARIO_ACTUALIZAR_FAIL,
        error: message,
      });
    }
  };

export const comentarioById = (idComentario) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.GET_ONECOMENTARIO_REQUEST,
    payload: idComentario,
  });

  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();

  try {
    const { data } = await axios.get(
      `/api/comentarios/comentario/${idComentario}`,
      {
        headers: {
          Authorization: `Bearer ${infoUsuario?.token}`,
        },
      }
    );
    dispatch({ type: actionTypes.GET_ONECOMENTARIO_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.GET_ONECOMENTARIO_FAIL, payload: message });
  }
};

export const getComentarios = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_TODOS_COMENTARIOS_REQUEST });

    const { data } = await axios.get("/api/comentarios");

    dispatch({
      type: actionTypes.GET_TODOS_COMENTARIOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TODOS_COMENTARIOS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const eliminarComentario =
  (comentarioId) => async (dispatch, getState) => {
    dispatch({
      type: actionTypes.COMENTARIO_ELIMINAR_REQUEST,
      payload: comentarioId,
    });
    const {
      usuarioIniciarSesion: { infoUsuario },
      todosComentarios: { comentarios },
    } = getState();
    try {
      axios.delete(`/api/comentarios/${comentarioId}`, {
        headers: { Authorization: `Bearer ${infoUsuario.token}` },
      });
      dispatch({
        type: actionTypes.COMENTARIO_ELIMINAR_SUCCESS,
        payload: { comentarioId, comentarios },
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: actionTypes.COMENTARIO_ELIMINAR_FAIL,
        payload: message,
      });
    }
  };
