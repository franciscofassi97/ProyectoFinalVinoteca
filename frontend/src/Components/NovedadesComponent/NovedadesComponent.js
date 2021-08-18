import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Actions
import { getNovedades } from "../../redux/action/novedadesActions";

const NovedadesComponent = () => {
  const getNovedadesState = useSelector((state) => state.getNovedades);
  const { novedades } = getNovedadesState;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNovedades());
  }, [dispatch]);

  const mostrarImagenes = () => (
    <div>
      {novedades.map((novedad) => (
        <div>
          <img
            className="imagenNovedades"
            src={novedad.imagenUrl}
            width="300"
            height="300"
            alt={novedad._id}
          />
        </div>
      ))}
    </div>
  );
  return (
    <div id="novedades">
      <h1>Novedades</h1>
      {mostrarImagenes()}
    </div>
  );
};

export default NovedadesComponent;
