import * as actionTypes from "../constants/ofertasConstants";

export const crearOfertaReducer = (state = { oferta: {} }, action) => {
  switch (action.type) {
    case actionTypes.OFERTA_CREAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.OFERTA_CREAR_SUCCESS:
      return {
        loading: false,
        success: true,
        oferta: action.payload,
      };
    case actionTypes.OFERTA_CREAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.OFERTA_CREAR_RESET:
      return {};
    default:
      return state;
  }
};

export const getOfertasReducer = (state = { ofertas: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_OFERTAS_REQUEST:
      return {
        loading: true,
        ofertas: [],
      };
    case actionTypes.GET_OFERTAS_SUCCESS:
      return {
        loading: false,
        ofertas: action.payload,
      };
    case actionTypes.GET_OFERTAS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPrecioOfertaReducer = (state = { precio: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRECIO_OFERTA_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_PRECIO_OFERTA_SUCCESS:
      return {
        loading: false,
        precio: action.payload,
      };
    case actionTypes.GET_PRECIO_OFERTA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_PRECIO_OFERTA_RESET:
      return {
        precio: {},
      };
    default:
      return state;
  }
};

export const getOfertasGestionReducer = (state = { ofertas: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_GESTION_OFERTA_REQUEST:
      return {
        loading: true,
        ofertas: [],
      };
    case actionTypes.GET_GESTION_OFERTA_SUCCESS:
      return {
        loading: false,
        ofertas: action.payload,
      };
    case actionTypes.GET_GESTION_OFERTA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_GESTION_OFERTA_RESET:
      return {
        ofertas: [],
      };
    default:
      return state;
  }
};

export const eliminarOfertaReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ELMINIAR_OFERTA_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.ELMINIAR_OFERTA_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.ELMINIAR_OFERTA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.ELMINIAR_OFERTA_RESET:
      return {};
    default:
      return state;
  }
};
