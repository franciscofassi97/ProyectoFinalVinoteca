import * as actionTypes from "../constants/novedadesConstants";

export const getNovedadesReducer = (state = { novedades: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_NOVEDADES_REQUEST:
      return {
        loading: true,
        novedades: [],
      };
    case actionTypes.GET_NOVEDADES_SUCCESS:
      return {
        loading: false,
        novedades: action.payload,
      };
    case actionTypes.GET_NOVEDADES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const eliminarNovedadReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.NOVEDAD_ELIMINAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.NOVEDAD_ELIMINAR_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.NOVEDAD_ELIMINAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.NOVEDAD_ELIMINAR_RESET:
      return {};
    default:
      return state;
  }
};

export const crearNovedadReducer = (state = { novedad: {} }, action) => {
  switch (action.type) {
    case actionTypes.NOVEDAD_CREAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.NOVEDAD_CREAR_SUCCESS:
      return {
        loading: false,
        success: true,
        novedad: action.payload,
      };
    case actionTypes.NOVEDAD_CREAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.NOVEDAD_CREAR_RESET:
      return {};
    default:
      return state;
  }
};
