import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
//Action
import { iniciarSesion, cerrarSesion } from "../../redux/action/authActions";

const LoginComponent = ({ history }) => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const usuarioIniciarSesion = useSelector(
    (state) => state.usuarioIniciarSesion
  );
  const { infoUsuario } = usuarioIniciarSesion;

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(iniciarSesion(email, contrasena));
    history.push("/");
  };

  const cerrarSesionhandle = () => {
    dispatch(cerrarSesion());
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        {infoUsuario ? (
          <label>Bienvenido:{infoUsuario.nombre}</label>
        ) : (
          <label>Iniciar Sesion</label>
        )}
        <div className="form-group">
          <label htmlFor="Correo"> Correo</label>
          <input
            type="email"
            required
            id="Correo"
            placeholder="Ingrese correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Contrasena"> Contraseña</label>
          <input
            type="password"
            required
            id="Contrasena"
            placeholder="Ingrese Contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>

        <button type="submit">Ingresar</button>
        <samp>
          ¿No tienes una cuenta? <Link to="/registro">Registarse</Link>
        </samp>
      </form>
      <button type="submit" onClick={() => cerrarSesionhandle()}>
        Salir
      </button>
    </div>
  );
};

export default LoginComponent;
