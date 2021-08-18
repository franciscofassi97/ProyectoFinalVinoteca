import * as actionTypes from "../constants/productosConstants";
import axios from "axios";

export const getProductos = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTOS_REQUEST });

    const { data } = await axios.get("/api/productos");

    dispatch({
      type: actionTypes.GET_PRODUCTOS_EXITOSO,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTOS_FALLO,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProducto = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCTO_REQUEST });

  try {
    let { data } = await axios.get(`/api/productos/${id}`);

    dispatch({
      type: actionTypes.GET_PRODUCTO_EXITOSO,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTO_FALLO,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reiniciarProducto = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCTO_REINICIAR });
};

export const crearProducto = (producto) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.PRODUCTO_CREAR_REQUEST, payload: producto });

    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("descripcion", producto.descripcion);
    formData.append("stock", producto.stock);
    formData.append("contendioNeto", producto.contendioNeto);
    formData.append("precio", producto.precio);
    formData.append("imagenUrl", producto.imagenUrl);
    formData.append("tipoVino", producto.tipoVino);
    formData.append("varietal", producto.varietal);
    formData.append("bodega", producto.bodega);

    const { data } = await axios.post("/api/productos/crear", formData, {
      headers: {
        Authorization: `Bearer ${infoUsuario.token}`,
      },
    });
    dispatch({ type: actionTypes.PRODUCTO_CREAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.PRODUCTO_CREAR_FAIL, payload: message });
  }
};

export const actualizarProducto = (producto) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.PRODUCTO_ACTUALIZAR_REQUEST,
    payload: producto,
  });
  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();

  const formData = new FormData();

  formData.append("nombre", producto.nombre);
  formData.append("descripcion", producto.descripcion);
  formData.append("stock", producto.stock);
  formData.append("contendioNeto", producto.contendioNeto);
  formData.append("precio", producto.precio);
  formData.append("imagenUrl", producto.imagenUrl);
  formData.append("tipoVino", producto.tipoVino);
  formData.append("varietal", producto.varietal);
  formData.append("bodega", producto.bodega);

  try {
    const { data } = await axios.put(
      `/api/productos/actualizar/${producto._id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${infoUsuario.token}` },
      }
    );
    dispatch({ type: actionTypes.PRODUCTO_ACTUALIZAR_SUCCESS, payload: data });
    dispatch(getProducto(producto._id));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.PRODUCTO_ACTUALIZAR__FAIL, error: message });
  }
};

export const eliminarProducto = (productoId) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.PRODUCTO_ELIMINAR_REQUEST,
  });
  const {
    usuarioIniciarSesion: { infoUsuario },
    getProductos: { productos },
  } = getState();
  try {
    axios.delete(`/api/productos/eliminar/${productoId}`, {
      headers: { Authorization: `Bearer ${infoUsuario.token}` },
    });
    dispatch({
      type: actionTypes.PRODUCTO_ELIMINAR_SUCCESS,
      payload: { productos, productoId },
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.PRODUCTO_ELIMINAR_FAIL, payload: message });
  }
};
