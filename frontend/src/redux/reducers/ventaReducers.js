import * as actionTypes from "../constants/ventaConstants";

export const crearVentaReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.VENTA_CREAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.VENTA_CREAR_SUCCESS:
      return {
        loading: false,
        success: true,
        venta: action.payload,
      };
    case actionTypes.VENTA_CREAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.VENTA_CREAR_RESET:
      return {};
    default:
      return state;
  }
};

export const getVentasPorUsuarioReducer = (
  state = { ventasPorUsuario: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_VENTAS_REQUEST:
      return {
        loading: true,
        ventasPorUsuario: [],
      };
    case actionTypes.GET_VENTAS_EXITOSO:
      return {
        loading: false,
        ventasPorUsuario: action.payload,
      };
    case actionTypes.GET_VENTAS_FALLO:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getDetalleVentaPorUsuarioReducer = (
  state = { detalle: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_DETALLEVENTA_REQUEST:
      return {
        loading: true,
        detalle: [],
      };
    case actionTypes.GET_DETALLEVENTA_SUCCESS:
      return {
        loading: false,
        detalle: action.payload,
      };
    case actionTypes.GET_DETALLEVENTA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_DETALLEVENTA_RESET:
      return {
        detalle: [],
      };
    default:
      return state;
  }
};

export const getVentaReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case actionTypes.GET_VENTA_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_VENTA_SUCCESS:
      return {
        loading: false,
        venta: action.payload,
      };
    case actionTypes.GET_VENTA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_VENTA_RESET:
      return {
        venta: {},
      };
    default:
      return state;
  }
};

//entregarOrdenReducer

export const entregarOrdenReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.VENTA_ENTREGAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.VENTA_ENTREGAR_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.VENTA_ENTREGAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.VENTA_ENTREGAR_RESET:
      return {};
    default:
      return state;
  }
};

// pagarOrden

export const pagarOrdenReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.VENTA_PAGAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.VENTA_PAGAR_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.VENTA_PAGAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.VENTA_PAGAR_RESET:
      return {};
    default:
      return state;
  }
};

export const pagarEntregarOrdenReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.VENTA_PAGAR_ENTREGAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.VENTA_PAGAR_ENTREGAR_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.VENTA_PAGAR_ENTREGAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.VENTA_PAGAR_ENTREGAR_RESET:
      return {};
    default:
      return state;
  }
};

// getVentasDiaHoy

export const getVentasDiaHoyReducer = (
  state = {
    ventas: [],
  },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_VENTAS_HOY_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_VENTAS_HOY_SUCCESS:
      return {
        loading: false,
        ventas: action.payload,
      };
    case actionTypes.GET_VENTAS_HOY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_VENTAS_HOY_RESET:
      return {};
    default:
      return state;
  }
};

export const cancelarOrdenReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.VENTA_CANCELAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.VENTA_CANCELAR_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.VENTA_CANCELAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.VENTA_CANCELAR_RESET:
      return {};
    default:
      return state;
  }
};
