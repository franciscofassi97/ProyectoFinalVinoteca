import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//Componets
import LoadingBox from "../MenuComponents/LoadingBox";
//Actions
import {
  getNovedades,
  eliminarNovedad,
} from "../../redux/action/novedadesActions";
import { NOVEDAD_ELIMINAR_RESET } from "../../redux/constants/novedadesConstants";

const GestionNovedades = () => {
  const getNovedadesState = useSelector((state) => state.getNovedades);
  const { novedades, loading, error } = getNovedadesState;

  const eliminarNovedadState = useSelector((state) => state.eliminarNovedad);
  const { success } = eliminarNovedadState;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNovedades());
    if (success) {
      alert("Se eliminio una novedad con exito");
      dispatch({ type: NOVEDAD_ELIMINAR_RESET });
      dispatch(getNovedades());
    }
  }, [dispatch, success]);

  const handlerEliminar = (idNovedad) => {
    dispatch(eliminarNovedad(idNovedad));
  };
  const novedadesTable = () => (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <div>
          <Link to="/novedad/crear">
            <span>
              <i className="far fa-plus-square"></i>
            </span>
          </Link>
          <table>
            <thead>
              <tr>
                <td>Descripcion</td>
                <td>Imagen</td>
              </tr>
            </thead>
            <tbody>
              {novedades.map((novedad) => (
                <tr>
                  <td>{novedad.descripcion}</td>
                  <td>
                    <img
                      src={novedad.imagenUrl}
                      alt={novedad._id}
                      width="100"
                      height="100"
                    />
                  </td>
                  <td>
                    <a href={novedad.imagenUrl}>Ver Imagen</a>
                  </td>
                  <td>
                    <button
                      onClick={() => handlerEliminar(novedad._id)}
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
      <h1>Gestion Novedades</h1>
      {novedadesTable()}
    </div>
  );
};

export default GestionNovedades;
