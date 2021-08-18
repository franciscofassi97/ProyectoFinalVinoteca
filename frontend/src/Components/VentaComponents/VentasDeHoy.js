import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
//Components
import LoadingBox from "../MenuComponents/LoadingBox";

//Action
import { getVentasDiaHoy } from "../../redux/action/ventaActions";

const VentasDeHoy = () => {
  const getVentasDiaHoyState = useSelector((state) => state.ventasHoy);
  const { ventas, loading, error } = getVentasDiaHoyState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVentasDiaHoy());
  }, [dispatch]);
  return (
    <div>
      <h1>Ventas de hoy</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <td>Fecha</td>
              <td>Email</td>
              <td>Numero de compra</td>
              <td>Monto total</td>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr>
                <td>
                  {venta.day}/{venta.month}/{venta.anio}
                </td>
                <td>{venta.email}</td>
                <td>{venta._id}</td>
                <td>{venta.montoTotal}</td>
                <td>
                  <Link to={`/detalle/ver/mas/${venta._id}`}>
                    <button className="fas fa-info"></button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VentasDeHoy;
