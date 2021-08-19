import * as actionTypes from "../constants/productosConstants";

// // //declarar inuital state
// const initialState = {
//   state: "idle",
// };
// este estado lo compraten todos los reducer...

//IMPORTANTE LAS LISTAS TIENEN UN ESTADO INCIAL DE ARREGLO, REPENSAR EL USEEFFECT EN BASE
//AL ELSE

export const getProductosReducer = (state = { productos: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTOS_REQUEST:
      return {
        loading: true,
        productos: [],
      };
    case actionTypes.GET_PRODUCTOS_EXITOSO:
      return {
        loading: false,
        productos: action.payload,
      };
    case actionTypes.GET_PRODUCTOS_FALLO:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.PRODUCTO_ELIMINAR_SUCCESS:
      return {
        loading: false,
        success: true,
        productos: action.payload.productos.filter(
          (producto) => producto._id !== action.payload.productoId
        ),
      };
    case actionTypes.GET_PRODUCTOS_RESET:
      return {
        loading: false,
        productos: [],
      };
    default:
      return state;
  }
};

export const getProductoReducer = (state = { producto: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTO_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_PRODUCTO_EXITOSO:
      return {
        loading: false,
        producto: action.payload,
      };
    case actionTypes.GET_PRODUCTO_FALLO:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_PRODUCTO_REINICIAR:
      return {
        producto: {},
      };
    default:
      return state;
  }
};

export const productoCrearReducer = (state = { producto: {} }, action) => {
  switch (action.type) {
    case actionTypes.PRODUCTO_CREAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.PRODUCTO_CREAR_SUCCESS:
      return {
        loading: false,
        success: true,
        producto: action.payload,
      };
    case actionTypes.PRODUCTO_CREAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.PRODUCTO_CREAR_RESET:
      return {};
    default:
      return state;
  }
};

export const productoActualizarReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCTO_ACTUALIZAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.PRODUCTO_ACTUALIZAR_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.PRODUCTO_ACTUALIZAR__FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.PRODUCTO_ACTUALIZAR_RESET:
      return {};
    default:
      return state;
  }
};

export const eliminarProductoReducer = (state = {}, action, productos) => {
  switch (action.type) {
    case actionTypes.PRODUCTO_ELIMINAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.PRODUCTO_ELIMINAR_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case actionTypes.PRODUCTO_ELIMINAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.PRODUCTO_ELIMINAR_RESET:
      return {};
    default:
      return state;
  }
};
