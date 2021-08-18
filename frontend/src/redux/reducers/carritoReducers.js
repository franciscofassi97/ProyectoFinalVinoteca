import * as actionTypes from "../constants/carritoConstants";

export const carritoReducer = (state = { carritoItems: [] }, action) => {
  switch (action.type) {
    case actionTypes.AGREGAR_AL_CARRITO:
      const item = action.payload;

      const existeItem = state.carritoItems.find(
        (x) => x.producto === item.producto
      );
      if (existeItem) {
        return {
          ...state,

          carritoItems: state.carritoItems.map((x) =>
            x.producto === existeItem.producto ? item : x
          ),
        };
      } else {
        return {
          ...state,
          carritoItems: [...state.carritoItems, item],
        };
      }

    case actionTypes.BORRAR_DEL_CARRITO:
      return {
        ...state,
        carritoItems: state.carritoItems.filter(
          (x) => x.producto !== action.payload
        ),
      };
    case actionTypes.VACIAR_EL_CARRITO:
      return {
        carritoItems: [],
      };
    default:
      return state;
  }
};
