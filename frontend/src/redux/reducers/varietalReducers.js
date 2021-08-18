import * as actionTypes from "../constants/varietalConstants";

export const varietalCrearReducer = (state = { varietal: {} }, action) => {
  switch (action.type) {
    case actionTypes.VARIETAL_CREAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.VARIETAL_CREAR_SUCCESS:
      return {
        loading: false,
        success: true,
        varietal: action.payload,
      };
    case actionTypes.VARIETAL_CREAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.VARIETAL_CREAR_RESET:
      return {};
    default:
      return state;
  }
};

export const getVarietalReducer = (state = { varietal: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_VARIETAL_REQUEST:
      return {
        loading: true,
        varietal: [],
      };
    case actionTypes.GET_VARIETAL_SUCCESS:
      return {
        loading: false,
        varietal: action.payload,
      };
    case actionTypes.GET_VARIETAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
