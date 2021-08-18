import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Component
import LoadingBox from "../MenuComponents/LoadingBox";

// Actions
import {
  getOfertasGestion,
  eliminarOferta,
} from "../../redux/action/ofertaActions";

const GestionOfertas = (props) => {
  const getGestionOfertasState = useSelector(
    (state) => state.getGestionOfertas
  );
  const { ofertas, loading, error } = getGestionOfertasState;

  const eliminarOfertaState = useSelector((state) => state.eliminarOferta);
  const { success } = eliminarOfertaState;

  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      alert("Se elimino un producto con exito");

      dispatch(getOfertasGestion());
      props.history.push("/gestionProductos");
    }
    dispatch(getOfertasGestion());
  }, [dispatch, props.history, success]);

  const handlerEliminar = (idOfera) => {
    dispatch(eliminarOferta(idOfera));
  };

  const listarOfertas = () => (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <div>
          {/* <Link to="/productocrear">
            <span>
              <i className="far fa-plus-square"></i>
            </span>
          </Link> */}
          <table>
            <thead>
              <tr>
                <td>
                  <strong>Nombre</strong>
                </td>
                <td>
                  <strong>Bodega</strong>
                </td>
                <td>
                  <strong>Tipo</strong>
                </td>
                <td>
                  <strong>Varietal</strong>
                </td>
                <td>
                  <strong>Contenido Neto</strong>
                </td>
                <td>
                  <strong>Stock</strong>
                </td>
                <td>
                  <strong>Precio</strong>
                </td>
                <td>
                  <strong>Precio Oferta</strong>
                </td>
                <td>
                  <strong>Fecha Fin Oferta</strong>
                </td>
              </tr>
            </thead>
            <tbody>
              {ofertas.map((oferta) => (
                <tr>
                  <td>{oferta.nombre}</td>
                  <td>{oferta.nombreBodega}</td>
                  <td>{oferta.nombreTipo}</td>
                  <td>{oferta.nombreVarietal}</td>
                  <td>{oferta.contendioNeto}</td>
                  <td>{oferta.stock}</td>
                  <td>{oferta.precio}</td>
                  <td>{oferta.precioDescuento}</td>
                  <td>
                    {oferta.dia}/{oferta.mes}/{oferta.anio}
                  </td>
                  <td>
                    <button
                      onClick={() => handlerEliminar(oferta._id)}
                      className="fa fa-trash"
                    ></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1>Ofertas component</h1>
      {listarOfertas()}
    </div>
  );
};

export default GestionOfertas;
