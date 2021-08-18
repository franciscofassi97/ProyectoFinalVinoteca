import * as actionTypes from "../constants/carritoConstants";
import axios from "axios";

export const addCarrito = (id, cantidad, precioOferta) => async (dispatch) => {
  const { data } = await axios.get(`api/productos/${id}`);
  let precioDelProducto = 0;
  if (precioOferta === undefined || precioOferta === 0) {
    precioDelProducto = data.precio;
  } else {
    precioDelProducto = precioOferta;
  }

  dispatch({
    type: actionTypes.AGREGAR_AL_CARRITO,
    payload: {
      producto: data._id,
      nombre: data.nombre,
      imagenUrl: data.imagenUrl,
      precio: precioDelProducto,
      stock: data.stock,
      cantidad,
    },
  });
};

export const borrarDelCarrito = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.BORRAR_DEL_CARRITO,
    payload: id,
  });
};
