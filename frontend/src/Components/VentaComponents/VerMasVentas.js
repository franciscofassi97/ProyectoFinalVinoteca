import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//Actions
import {
  entregarOrden,
  getVenta,
  pagarEntregarOrden,
  pagarOrden,
  cancelarOrden,
} from "../../redux/action/ventaActions";
import {
  VENTA_CANCELAR_RESET,
  VENTA_ENTREGAR_RESET,
  VENTA_PAGAR_ENTREGAR_RESET,
  VENTA_PAGAR_RESET,
} from "../../redux/constants/ventaConstants";
//Components
import LoadingBox from "../MenuComponents/LoadingBox";

const VerMasVentas = (props) => {
  const params = useParams();
  const idVenta = params.id;

  const infoUsuarioState = useSelector((state) => state.usuarioIniciarSesion);
  const { infoUsuario } = infoUsuarioState;

  const getVentaState = useSelector((state) => state.getVenta);
  const { loading, venta, error } = getVentaState;

  const deliveryState = useSelector((state) => state.entregarOrden);
  const {
    loading: loadingDelivery,
    error: errorDelivery,
    success: successDelivery,
  } = deliveryState;

  const pagadoState = useSelector((state) => state.pagarOrden);
  const {
    loading: loadingPago,
    error: errorPago,
    success: successPago,
  } = pagadoState;

  const cacelarState = useSelector((state) => state.cancelarOrden);
  const { success: successCancelar } = cacelarState;

  const entregadoPagadoState = useSelector((state) => state.pagarEntregar);
  const {
    loading: loadingPagadoEntregado,
    error: errorPagadoEntregado,
    success: successPagadoEntreagado,
  } = entregadoPagadoState;

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !venta ||
      venta._id !== idVenta ||
      successDelivery ||
      successPago ||
      successPagadoEntreagado ||
      successCancelar
    ) {
      dispatch(getVenta(idVenta));
      dispatch({ type: VENTA_ENTREGAR_RESET });
      dispatch({ type: VENTA_PAGAR_RESET });
      dispatch({ type: VENTA_PAGAR_ENTREGAR_RESET });
      dispatch({ type: VENTA_CANCELAR_RESET });
    }
    if (successDelivery) {
      alert(`Se actualizo con exito la venta como ENTREGADA`);
    }
    if (successPago) {
      alert(`Se actualizo con exito la venta como PAGADA`);
    }
    if (successPagadoEntreagado) {
      alert(`Se actualizo con exito la venta como PAGADO Y ENTREGADO`);
    }
  }, [
    dispatch,
    idVenta,
    venta,
    successDelivery,
    successPago,
    successPagadoEntreagado,
    successCancelar,
    props.history,
  ]);

  const EntregadoHandler = () => {
    dispatch(entregarOrden(venta._id));
  };
  const PagadoHandler = () => {
    dispatch(pagarOrden(venta._id));
  };

  const PagadoEntregadoHandler = () => {
    dispatch(pagarEntregarOrden(venta._id));
  };
  const cancelarHandler = () => {
    if (window.confirm("¿Esta seguro q desea cancelar la venta?")) {
      dispatch(cancelarOrden(venta._id));
    }
  };

  const detalleVenta = () => (
    <div>
      {loading || loadingDelivery || loadingPago || loadingPagadoEntregado ? (
        <LoadingBox></LoadingBox>
      ) : error || errorDelivery || errorPago || errorPagadoEntregado ? (
        <h1>Error al mostrar la Orden</h1>
      ) : (
        <div>
          <h1>Numero de orden {venta._id}</h1>
          <div>
            <table>
              <thead>
                <tr>
                  <td>
                    <strong>Fecha de compra</strong>
                  </td>
                  <td>
                    <strong>Estado Delivery</strong>
                  </td>
                  <td>
                    <strong>Direccion</strong>
                  </td>
                  <td>
                    <strong>Forma de Pago</strong>
                  </td>
                  <td>
                    <strong>Monto Total</strong>
                  </td>
                  <td>
                    <strong>Estado de Pago</strong>
                  </td>
                  {venta.isCancelada ? <strong>Estado Cancelado</strong> : null}
                  <td>
                    <strong>Productos Adquiridos</strong>
                  </td>
                  <td>
                    <strong>Precio unidad</strong>
                  </td>
                  <td>
                    <strong>Cantidad</strong>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{venta.fechaCompra}</td>
                  {venta.isEntregado ? (
                    <td>Entregado</td>
                  ) : (
                    <td>No entregado</td>
                  )}

                  <td>
                    <ul>
                      <li>{venta.direccionEnvio.ciudad}</li>
                      <li>{venta.direccionEnvio.direccion}</li>
                    </ul>
                  </td>
                  <td>{venta.formaPago}</td>
                  <td>{venta.montoTotal}</td>

                  {venta.isPagado ? <td>Pagado</td> : <td>No pagado</td>}
                  {venta.isCancelada ? <td>Cancelada</td> : null}
                  <td>
                    <ul>
                      {venta.items.map((item) => (
                        <li>{item.nombre}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {venta.items.map((item) => (
                        <li>{item.precio}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {venta.items.map((item) => (
                        <li>{item.cantidad}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            {infoUsuario.usuario.isAdmin ? (
              <div>
                <button type="button" onClick={EntregadoHandler}>
                  Marcar como Entregado
                </button>
                <button type="button" onClick={PagadoHandler}>
                  Marcar como Pagado
                </button>
                <button type="button" onClick={PagadoEntregadoHandler}>
                  Marcar como Pagado y Entregado
                </button>
                <button type="button" onClick={cancelarHandler}>
                  Cancelar
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1>Soy ver mas Ventas</h1>
      {detalleVenta()}
    </div>
  );
};

export default VerMasVentas;
