import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Actions
import { registrar } from "../../redux/action/authActions";

const RegistroComponent = ({ history }) => {
  const dispatch = useDispatch();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registrar(nombre, email, contrasena));
    history.push("/");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h3>Registar</h3>
        <div className="form-group">
          <label htmlFor="nombre"> Nombre</label>
          <input
            type="string"
            required
            id="nombre"
            placeholder="Nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

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
          <label htmlFor="contrasena"> Contraseña</label>
          <input
            type="password"
            required
            id="contrasena"
            placeholder="Ingrese contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>

        <button type="submit">Registrarse</button>
        <samp>
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar</Link>
        </samp>
      </form>
    </div>
  );
};

export default RegistroComponent;
