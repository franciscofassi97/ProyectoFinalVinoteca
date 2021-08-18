import * as actionTypes from "../constants/usuarioConstants";
import axios from "axios";

export const iniciarSesion = (email, contrasena) => async (dispatch) => {
  dispatch({
    type: actionTypes.USUARIO_INICIARSESION_REQUEST,
    payload: { email, contrasena },
  });
  try {
    const { data } = await axios.post("/api/auth/iniciar", {
      email,
      contrasena,
    });
    dispatch({
      type: actionTypes.USUARIO_INICIARSESION_SUCCESS,
      payload: data,
    });
    localStorage.setItem("token", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USUARIO_INICIARSESION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registrar = (nombre, email, contrasena) => async (dispatch) => {
  dispatch({
    type: actionTypes.USUARIO_REGISTRAR_REQUEST,
    payload: { email, contrasena },
  });
  try {
    const { data } = await axios.post("/api/auth/registrar", {
      nombre,
      email,
      contrasena,
    });
    dispatch({
      type: actionTypes.USUARIO_REGISTRAR_SUCCESS,
      payload: data,
    });
    dispatch({
      type: actionTypes.USUARIO_INICIARSESION_SUCCESS,
      payload: data,
    });
    localStorage.setItem("token", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USUARIO_REGISTRAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detalleUsuario = (idUsuario) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.USUARIO_DETALLE_REQUEST, payload: idUsuario });

  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();

  try {
    const { data } = await axios.get(`/api/auth/${idUsuario}`, {
      headers: {
        Authorization: `Bearer ${infoUsuario?.token}`,
      },
    });
    dispatch({ type: actionTypes.USUARIO_DETALLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.USUARIO_DETALLE_FAIL, payload: message });
  }
};

export const actualizarUsuario = (usuario) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.USUARIO_ACTUALIZAR_REQUEST, payload: usuario });
  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();
  try {
    const { data } = await axios.put(
      `/api/auth/actualizar/${infoUsuario.usuario.id}`,
      usuario,
      {
        headers: { Authorization: `Bearer ${infoUsuario.token}` },
      }
    );
    dispatch({ type: actionTypes.USUARIO_ACTUALIZAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.USUARIO_ACTUALIZAR_FAIL, payload: message });
  }
};

export const cerrarSesion = () => (dispatch) => {
  localStorage.removeItem("token");
  // localStorage.removeItem('cartItems');
  // localStorage.removeItem('shippingAddress');
  dispatch({ type: actionTypes.USUARIO_CERRARSESION });
  // document.location.href = '/login';
};

// export const loadUser = () => {
//   return (dispatch, getState) =>{
//       const token = getState().usuarioIniciarSesion.token
//       if(token){
//         dispatch({
//           type: actionTypes.LOAD_USER,
//           token
//         })
//       }else return null
//   }
// }
