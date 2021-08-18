import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Components
import LoadingBox from "../MenuComponents/LoadingBox";
//Actions
import { getDetalleVentaPorUsuario } from "../../redux/action/ventaActions";

const DetalleVentaPorUsuarioComponent = ({ idUsuario }) => {
  const params = useParams();

  const detalleUsuarioState = useSelector(
    (state) => state.getDetallePorUsuario
  );
  const { detalle, loading, error } = detalleUsuarioState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (idUsuario) {
      dispatch(getDetalleVentaPorUsuario(idUsuario));
    } else {
      dispatch(getDetalleVentaPorUsuario(params.id));
    }
  }, [dispatch, params.id, idUsuario]);

  const listaDetalleUsuario = () => (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h1>Error al obtener los datos del usuario</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <td>
                <strong>Fecha de compra</strong>
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
                <strong>Pago</strong>
              </td>
              <td>
                <strong>Entrega</strong>
              </td>
              <td>
                <strong>Ver mas</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            {detalle.map((detalle) => (
              <tr key={detalle._id}>
                <td>{detalle.fechaCompra}</td>
                <td>{detalle.direccion}</td>
                <td>{detalle.formaPago}</td>
                <td>{detalle.montoTotal}</td>
                {!detalle.isPagado ? <td>No</td> : <td>Si</td>}
                {!detalle.isEntregado ? <td>No</td> : <td>Si</td>}
                <td>
                  {idUsuario ? (
                    <Link to={`/detalle/compras/${detalle._id}`}>
                      <button className="fas fa-info"></button>
                    </Link>
                  ) : (
                    <Link to={`/detalle/ver/mas/${detalle._id}`}>
                      <button className="fas fa-info"></button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div>
      <h1>Detalle Ventas</h1>
      {listaDetalleUsuario()}
    </div>
  );
};

export default DetalleVentaPorUsuarioComponent;
