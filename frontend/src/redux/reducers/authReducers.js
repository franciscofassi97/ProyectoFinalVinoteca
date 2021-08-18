import * as actionTypes from "../constants/usuarioConstants";

export const usuarioIniciarSesionReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USUARIO_INICIARSESION_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.USUARIO_INICIARSESION_SUCCESS:
      return {
        loading: false,
        infoUsuario: action.payload,
        success: true,
      };
    case actionTypes.USUARIO_INICIARSESION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.USUARIO_CERRARSESION:
      return {};

    default:
      return state;
  }
};

export const usuarioRegistarReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USUARIO_REGISTRAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.USUARIO_REGISTRAR_SUCCESS:
      return {
        loading: false,
        infoUsuario: action.payload,
      };
    case actionTypes.USUARIO_REGISTRAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const usuarioDetalleReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case actionTypes.USUARIO_DETALLE_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.USUARIO_DETALLE_SUCCESS:
      return {
        loading: false,
        detallesUsuario: action.payload,
      };
    case actionTypes.USUARIO_DETALLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.USUARIO_DETALLE_RESET:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export const actualizarUsuarioReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USUARIO_ACTUALIZAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.USUARIO_ACTUALIZAR_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.USUARIO_ACTUALIZAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.USUARIO_ACTUALIZAR_RESET:
      return {};
    default:
      return state;
  }
};
