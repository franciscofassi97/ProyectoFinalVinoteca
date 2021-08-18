import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//Components
import LoadingBox from "../MenuComponents/LoadingBox";
//actions
import { getVentasPorUsuario } from "../../redux/action/ventaActions";

const VentasListComponent = () => {
  const dispatch = useDispatch();

  const ventasUsuario = useSelector((state) => state.getVentasPorUsuario);
  const { ventasPorUsuario, loading, error } = ventasUsuario;

  useEffect(() => {
    dispatch(getVentasPorUsuario());
  }, [dispatch]);

  const listaOrdenes = () => (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h1>Error </h1>
      ) : (
        <table>
          <thead>
            <tr>
              <td>
                <strong>Cliente</strong>
              </td>
              <td>
                <strong>Cantidad De Compras</strong>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {ventasPorUsuario.map((usuario) => (
              <tr key={usuario._id.idUsuario}>
                <td>{usuario._id.nombre}</td>
                <td>{usuario.cantidad}</td>
                <td>
                  <Link to={`/detalle/por/usuario/${usuario._id.idUsuario}`}>
                    <button>Ver mas</button>
                  </Link>
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
      <h1>Ordenes</h1>
      {listaOrdenes()}
    </div>
  );
};

export default VentasListComponent;
