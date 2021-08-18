import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Actions
import { cerrarSesion } from "../../redux/action/authActions";

const SideDrawerComponent = ({ show, click }) => {
  const dispatch = useDispatch();
  const sideDrawerClass = ["sidedrawer"];

  if (show) {
    sideDrawerClass.push("show");
  }

  const carrito = useSelector((state) => state.carrito);
  const { carritoItems } = carrito;

  const getCarritoCantidad = () => {
    return carritoItems.reduce(
      (cantidad, item) => Number(item.cantidad) + cantidad,
      0
    );
  };

  const cerrarSesionHandle = () => {
    dispatch(cerrarSesion());
  };

  const usuario = useSelector((state) => state.usuarioIniciarSesion);
  const { infoUsuario } = usuario;

  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer__links" onClick={click}>
        <li>
          <Link to="/carrito">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Carrito{" "}
              <span className="sidedrawer__cartbadge">
                {getCarritoCantidad()}
              </span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/tienda">Shop</Link>
        </li>
        {infoUsuario ? (
          <li>
            <Link to="/login">
              <span onClick={() => cerrarSesionHandle()}>Cerrar Sesion</span>
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Iniciar sesion</Link>
          </li>
        )}
        <li>{infoUsuario ? <Link to={`/perfil`}>Perfil</Link> : null}</li>
      </ul>
    </div>
  );
};

export default SideDrawerComponent;
