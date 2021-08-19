import * as actionTypes from "../constants/bodegasConstants";

export const bodegaCrearReducer = (state = { bodega: {} }, action) => {
  switch (action.type) {
    case actionTypes.BODEGA_CREAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.BODEGA_CREAR_SUCCESS:
      return {
        loading: false,
        success: true,
        bodega: action.payload,
      };
    case actionTypes.BODEGA_CREAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.BODEGA_CREAR_RESET:
      return {};
    default:
      return state;
  }
};

export const getBodegasReducer = (state = { bodegas: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_BODEGA_REQUEST:
      return {
        loading: true,
        bodegas: [],
      };
    case actionTypes.GET_BODEGA_SUCCESS:
      return {
        loading: false,
        bodegas: action.payload,
      };
    case actionTypes.GET_BODEGA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
