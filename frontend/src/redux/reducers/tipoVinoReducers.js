import * as actionTypes from "../constants/tipoVinoConstants";

export const tipoVinoCrearReducer = (state = { tipoVino: {} }, action) => {
  switch (action.type) {
    case actionTypes.TIPOVINO_CREAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.TIPOVINO_CREAR_SUCCESS:
      return {
        loading: false,
        success: true,
        tipoVino: action.payload,
      };
    case actionTypes.TIPOVINO_CREAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.TIPOVINO_CREAR_RESET:
      return {};
    default:
      return state;
  }
};

export const getTipoVInoReducer = (state = { tipoVino: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_TIPOVINO_REQUEST:
      return {
        loading: true,
        tipoVino: [],
      };
    case actionTypes.GET_TIPOVINO_SUCCESS:
      return {
        loading: false,
        tipoVino: action.payload,
      };
    case actionTypes.GET_TIPOVINO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
