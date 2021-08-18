import * as actionTypes from "../constants/ventaConstants";
import axios from "axios";

export const crearVenta = (venta) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.VENTA_CREAR_REQUEST, payload: venta });
  try {
    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();
    const { data } = await axios.post("/api/ventas/venta", venta, {
      headers: {
        Authorization: `Bearer ${infoUsuario.token}`,
      },
    });
    dispatch({ type: actionTypes.VENTA_CREAR_SUCCESS, payload: data.venta });
    // dispatch({ type: CART_EMPTY });
    // localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: actionTypes.VENTA_CREAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getVentasPorUsuario = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.GET_VENTAS_REQUEST });
  try {
    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    const { data } = await axios.get("/api/ventas/canditadComprasUsuario", {
      headers: {
        Authorization: `Bearer ${infoUsuario.token}`,
      },
    });

    dispatch({
      type: actionTypes.GET_VENTAS_EXITOSO,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_VENTAS_FALLO,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDetalleVentaPorUsuario = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_DETALLEVENTA_REQUEST });
  try {
    const { data } = await axios.get(`/api/ventas/detalleVentas/${id}`);

    dispatch({
      type: actionTypes.GET_DETALLEVENTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_VENTAS_FALLO,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reiniciarDetalleVenta = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_DETALLEVENTA_RESET });
};

export const getVenta = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_VENTA_REQUEST, payload: id });
  try {
    const { data } = await axios.get(`/api/ventas/vermas/${id}`);

    dispatch({
      type: actionTypes.GET_VENTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_VENTA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reiniciarGetVenta = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_VENTA_RESET });
};

export const entregarOrden = (ventaId) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.VENTA_ENTREGAR_REQUEST, payload: ventaId });
  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();
  try {
    const { data } = axios.put(
      `/api/ventas/delivery/${ventaId}`,
      {},
      {
        headers: { Authorization: `Bearer ${infoUsuario.token}` },
      }
    );
    dispatch({ type: actionTypes.VENTA_ENTREGAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.VENTA_ENTREGAR_FAIL, payload: message });
  }
};

export const pagarOrden = (ventaId) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.VENTA_PAGAR_REQUEST, payload: ventaId });
  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();
  try {
    const { data } = axios.put(
      `/api/ventas/pago/${ventaId}`,
      {},
      {
        headers: { Authorization: `Bearer ${infoUsuario.token}` },
      }
    );
    dispatch({ type: actionTypes.VENTA_PAGAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.VENTA_PAGAR_FAIL, payload: message });
  }
};

export const pagarEntregarOrden = (ventaId) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.VENTA_PAGAR_ENTREGAR_REQUEST,
    payload: ventaId,
  });
  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();
  try {
    const { data } = axios.put(
      `/api/ventas/delivery/pagado/${ventaId}`,
      {},
      {
        headers: { Authorization: `Bearer ${infoUsuario.token}` },
      }
    );
    dispatch({ type: actionTypes.VENTA_PAGAR_ENTREGAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.VENTA_PAGAR_ENTREGAR_FAIL, payload: message });
  }
};

export const getVentasDiaHoy = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.GET_VENTAS_HOY_REQUEST });
  try {
    const {
      usuarioIniciarSesion: { infoUsuario },
    } = getState();

    const { data } = await axios.get("/api/ventas/ventas/por/dia", {
      headers: {
        Authorization: `Bearer ${infoUsuario.token}`,
      },
    });

    dispatch({
      type: actionTypes.GET_VENTAS_HOY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_VENTAS_HOY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cancelarOrden = (ventaId) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.VENTA_CANCELAR_REQUEST, payload: ventaId });
  const {
    usuarioIniciarSesion: { infoUsuario },
  } = getState();
  try {
    const { data } = axios.put(
      `/api/ventas/cancelar/${ventaId}`,
      {},
      {
        headers: { Authorization: `Bearer ${infoUsuario.token}` },
      }
    );
    dispatch({ type: actionTypes.VENTA_CANCELAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.VENTA_CANCELAR_FAIL, payload: message });
  }
};
