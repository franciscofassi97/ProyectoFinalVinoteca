import * as actionTypes from "../constants/reportesConstants";

// ingresosBrutosPorMes

export const ingresosBrutosPorMesReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_INGRESOS_BRUTOS_MES_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_INGRESOS_BRUTOS_MES_SUCCESS:
      return {
        loading: false,
        ingresos: action.payload,
      };
    case actionTypes.GET_INGRESOS_BRUTOS_MES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_INGRESOS_BRUTOS_MES_RESET:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export const tipoMasVendidoReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case actionTypes.GET_TIPO_MAS_VENDIDO_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_TIPO_MAS_VENDIDO_SUCCESS:
      return {
        loading: false,
        tipoMasVendio: action.payload,
      };
    case actionTypes.GET_TIPO_MAS_VENDIDO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_TIPO_MAS_VENDIDO_RESET:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export const cantidadProductosMesReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_CANTIDAD_PRODUCTOS_MES_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_CANTIDAD_PRODUCTOS_MES_SUCCESS:
      return {
        loading: false,
        cantidad: action.payload,
      };
    case actionTypes.GET_CANTIDAD_PRODUCTOS_MES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_CANTIDAD_PRODUCTOS_MES_RESET:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export const comportamientoPorMesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_COMPORTAMIENTO_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_COMPORTAMIENTO_SUCCESS:
      return {
        loading: false,
        cantidad: action.payload,
      };
    case actionTypes.GET_COMPORTAMIENTO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_COMPORTAMIENTO_RESET:
      return {
        loading: true,
      };
    default:
      return state;
  }
};
