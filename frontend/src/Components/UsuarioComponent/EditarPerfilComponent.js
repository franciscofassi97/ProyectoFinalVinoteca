import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

//Actions
import { actualizarUsuario } from "../../redux/action/authActions";
import { detalleUsuario } from "../../redux/action/authActions";

const EditarPerfilComponent = (props) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const idUsuario = useParams();
  const dispatch = useDispatch();

  const detalleslUsuario = useSelector((state) => state.usuarioDetalle);
  const { detallesUsuario } = detalleslUsuario;

  const usuarioActulizar = useSelector((state) => state.usuarioActualizar);
  const { success } = usuarioActulizar;

  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "nombre") {
      setNombre(value);
    } else if (inputName === "emial") {
      setEmail(value);
    }
  };

  useEffect(() => {
    if (!detallesUsuario) {
      dispatch(detalleUsuario(idUsuario.id));
    } else {
      setNombre(detallesUsuario.nombre);
      setEmail(detallesUsuario.email);
    }
  }, [detallesUsuario, dispatch, idUsuario.id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (idUsuario.id === detallesUsuario._id) {
      const usuario = {
        nombre,
        email,
      };
      dispatch(actualizarUsuario(usuario));
      dispatch(detalleUsuario(idUsuario.id));
    }
  };

  useEffect(() => {
    if (success) {
      // dispatch({ type: USUARIO_ACTUALIZAR_RESET });
      alert("Se actualizo el perfin con exito");
      props.history.push("/perfil");
    }
  }, [dispatch, props.history, success]);

  const formEditar = () => (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="nombre"> Nombre</label>
          <input
            type="text"
            required
            id="nombre"
            placeholder="Nombre Producto "
            value={nombre}
            onChange={(event) => imputsChange(event, "nombre")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Ingrese email"
            value={email}
            onChange={(event) => imputsChange(event, "email")}
          />
        </div>

        <button type="submit">Editar</button>
      </form>
    </div>
  );

  return <div>{formEditar()}</div>;
};

export default EditarPerfilComponent;
