import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

//Componets
import LoadingBox from "../MenuComponents/LoadingBox";
//Actions
import DetalleVentaPorUsuarioComponent from "../VentaComponents/DetalleVentaPorUsuarioComponent";
import { detalleUsuario } from "../../redux/action/authActions";
import { USUARIO_ACTUALIZAR_RESET } from "../../redux/constants/usuarioConstants";

const PerfilComponent = () => {
  const usuario = useSelector((state) => state.usuarioIniciarSesion);
  const { infoUsuario } = usuario;

  const detalleslUsuario = useSelector((state) => state.usuarioDetalle);
  const {
    loading: loadingDetalleUsuario,
    detallesUsuario,
    error: detalleError,
  } = detalleslUsuario;

  const usuarioActulizar = useSelector((state) => state.usuarioActualizar);
  const { success } = usuarioActulizar;

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(detalleUsuario(infoUsuario.usuario.id));
    if (!detallesUsuario) {
      dispatch(detalleUsuario(infoUsuario.usuario.id));
    }
    if (success) {
      dispatch(detalleUsuario(infoUsuario.usuario.id));
      dispatch({ type: USUARIO_ACTUALIZAR_RESET });
    }
  }, [
    detallesUsuario,
    dispatch,
    infoUsuario.usuario.email,
    infoUsuario.usuario.id,
    infoUsuario.usuario.nombre,
    success,
  ]);
  const mostrarPerfil = () => (
    <div>
      {loadingDetalleUsuario ? (
        <LoadingBox></LoadingBox>
      ) : detalleError ? (
        <h1>Error al cargar perfil </h1>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <td>Nombre Usuario</td>
                <td>Email</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{detallesUsuario.nombre}</td>
                <td>{detallesUsuario.email}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <Link to={`/perfil/editar/${infoUsuario.usuario.id}`}>
              <button className="fa fa-edit"></button>
            </Link>
          </div>
          <div>
            <DetalleVentaPorUsuarioComponent
              idUsuario={infoUsuario.usuario.id}
            ></DetalleVentaPorUsuarioComponent>
          </div>
        </div>
      )}
    </div>
  );

  return <div>{mostrarPerfil()}</div>;
};

export default PerfilComponent;
