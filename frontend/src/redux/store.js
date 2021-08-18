import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//Reducers

import {
  getProductosReducer,
  getProductoReducer,
  productoCrearReducer,
  productoActualizarReducer,
  eliminarProductoReducer,
} from "./reducers/productosReducers";
import { carritoReducer } from "./reducers/carritoReducers";
import {
  usuarioIniciarSesionReducer,
  usuarioRegistarReducer,
  usuarioDetalleReducer,
  actualizarUsuarioReducer,
} from "./reducers/authReducers";
import {
  crearVentaReducer,
  getVentasPorUsuarioReducer,
  getDetalleVentaPorUsuarioReducer,
  getVentaReducer,
  entregarOrdenReducer,
  pagarOrdenReducer,
  pagarEntregarOrdenReducer,
  getVentasDiaHoyReducer,
  cancelarOrdenReducer,
} from "./reducers/ventaReducers";
import {
  tipoVinoCrearReducer,
  getTipoVInoReducer,
} from "./reducers/tipoVinoReducers";
import {
  varietalCrearReducer,
  getVarietalReducer,
} from "./reducers/varietalReducers";
import {
  getBodegasReducer,
  bodegaCrearReducer,
} from "./reducers/bodegasReducer";

import {
  getComentariosIdProductoReducer,
  crearComentarioReducer,
  comentarioActualizarReducer,
  comentarioByIdReducer,
  getComentariosReducer,
  eliminarComentarioReducer,
} from "./reducers/comentariosReducer";

import {
  ingresosBrutosPorMesReducer,
  tipoMasVendidoReducer,
  cantidadProductosMesReducer,
  comportamientoPorMesReducer,
} from "./reducers/reportesReducers";

import {
  crearOfertaReducer,
  getOfertasReducer,
  getPrecioOfertaReducer,
  getOfertasGestionReducer,
  eliminarOfertaReducer,
} from "./reducers/ofertasReducers";

import {
  getNovedadesReducer,
  eliminarNovedadReducer,
  crearNovedadReducer,
} from "./reducers/novedadesReducer";

const initialState = {
  usuarioIniciarSesion: {
    infoUsuario: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
  },
};

const reducer = combineReducers({
  getProductos: getProductosReducer,
  getProducto: getProductoReducer,
  crearProducto: productoCrearReducer,
  actualizarProducto: productoActualizarReducer,
  productoEliminado: eliminarProductoReducer,

  tipoVino: tipoVinoCrearReducer,
  getTipoVino: getTipoVInoReducer,

  varietal: varietalCrearReducer,
  getVarietal: getVarietalReducer,

  bodega: bodegaCrearReducer,
  getBodegas: getBodegasReducer,

  carrito: carritoReducer,

  venta: crearVentaReducer,
  getVenta: getVentaReducer,
  getVentasPorUsuario: getVentasPorUsuarioReducer,
  getDetallePorUsuario: getDetalleVentaPorUsuarioReducer,
  entregarOrden: entregarOrdenReducer,
  pagarOrden: pagarOrdenReducer,
  cancelarOrden: cancelarOrdenReducer,
  pagarEntregar: pagarEntregarOrdenReducer,
  ventasHoy: getVentasDiaHoyReducer,

  usuarioIniciarSesion: usuarioIniciarSesionReducer,
  usuarioRegistrar: usuarioRegistarReducer,
  usuarioDetalle: usuarioDetalleReducer,
  usuarioActualizar: actualizarUsuarioReducer,

  getComentarios: getComentariosIdProductoReducer,
  comentarioCrear: crearComentarioReducer,
  comentarioActualizar: comentarioActualizarReducer,
  comentarioById: comentarioByIdReducer,
  todosComentarios: getComentariosReducer,
  eliminarComentario: eliminarComentarioReducer,

  ingresosBrutosPorMes: ingresosBrutosPorMesReducer,
  tipoMasVendidos: tipoMasVendidoReducer,
  cantProductosMes: cantidadProductosMesReducer,
  comportamientoPorMes: comportamientoPorMesReducer,

  newOferta: crearOfertaReducer,
  getProductosOferta: getOfertasReducer,
  getPrecioOferta: getPrecioOfertaReducer,
  getGestionOfertas: getOfertasGestionReducer,
  eliminarOferta: eliminarOfertaReducer,

  getNovedades: getNovedadesReducer,
  eliminarNovedad: eliminarNovedadReducer,
  newNovedad: crearNovedadReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
