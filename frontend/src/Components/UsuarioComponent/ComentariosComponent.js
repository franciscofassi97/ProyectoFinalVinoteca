import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//actions
import {
  actualizarComentario,
  comentarioById,
  crearComentario,
  getComentariosIdProducto,
} from "../../redux/action/comentariosActions";
//Components
import LoadingBox from "../MenuComponents/LoadingBox";
import {
  COMENTARIO_ACTUALIZAR_RESET,
  COMENTARIO_CREAR_RESET,
  GET_ONECOMENTARIO_RESET,
} from "../../redux/constants/comentariosConstats";

const ComentariosComponent = ({ idProducto }) => {
  const id = idProducto;

  const [comentario, setComentario] = useState("");
  const [editar, setEditar] = useState(false);

  const getComentariosState = useSelector((state) => state.getComentarios);
  const { comentarios, loading, error } = getComentariosState;

  const getComentarioByIdState = useSelector((state) => state.comentarioById);
  const { comentario: comentarioId } = getComentarioByIdState;

  const comentarioCrearState = useSelector((state) => state.comentarioCrear);
  const { success, loading: loadingComentario } = comentarioCrearState;

  const comentarioActualizarState = useSelector(
    (state) => state.comentarioActualizar
  );
  const { success: succesActualizar } = comentarioActualizarState;

  const usuarioIniciarSesionState = useSelector(
    (state) => state.usuarioIniciarSesion
  );
  const { infoUsuario } = usuarioIniciarSesionState;
  const idUsuario = infoUsuario.usuario.id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComentariosIdProducto(id));

    if (success) {
      alert("Se creo su comentario con exito");
      dispatch({ type: COMENTARIO_CREAR_RESET });
      setComentario("");
    }
    if (comentarioId) {
      setComentario(comentarioId.comentario);
    }
    if (succesActualizar) {
      alert("Se ACTUALIZO su comentario con exito");

      dispatch({ type: COMENTARIO_ACTUALIZAR_RESET });
    }
  }, [comentarioId, dispatch, id, success, succesActualizar]);

  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "comentario") {
      setComentario(value);
    }
  };
  const handleComentario = (e) => {
    e.preventDefault();

    if (editar) {
      if (comentarioId.idUsuario === idUsuario) {
        const actualizar = {
          comentario,
          _id: comentarioId._id,
        };
        dispatch(actualizarComentario(actualizar));
        dispatch({ type: GET_ONECOMENTARIO_RESET });
        setComentario("");
        setEditar(false);
      } else {
        alert("no puede editar este comentario");
        setComentario("");
        setEditar(false);
      }
    } else {
      const newComentario = {
        comentario,
        idProducto: id,
        idUsuario: idUsuario,
      };
      if (newComentario) {
        dispatch(crearComentario(newComentario));
      }
    }
  };

  const editarComentario = (id) => {
    setEditar(true);
    dispatch(comentarioById(id));
  };

  const cancelar = () => {
    setEditar(false);
    dispatch({ type: GET_ONECOMENTARIO_RESET });
    setComentario("");
  };

  const mostrarComentarios = () => (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <h1>Error: No se encuentran los comentarios</h1>
      ) : (
        <div>
          {comentarios.map((comentario) => (
            <ul>
              <li>{comentario.usuario}</li>
              <li>{comentario.comentario}</li>
              <li>
                <button onClick={() => editarComentario(comentario._id)}>
                  Editar
                </button>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );

  const crearComentarioForm = () => (
    <div>
      {loadingComentario ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <form onSubmit={handleComentario}>
          <label htmlFor="comentario"></label>
          <textarea
            id="comentario"
            value={comentario}
            required
            onChange={(event) => imputsChange(event, "comentario")}
          />
          <div>
            <button type="submit">Aceptar</button>
          </div>
          <div>
            {editar ? (
              <button onClick={() => cancelar()}>Cancelar</button>
            ) : null}
          </div>
        </form>
      )}
    </div>
  );

  return (
    <div>
      <h1>Soy un La lista de comentarios</h1>
      {mostrarComentarios()}
      {crearComentarioForm()}
    </div>
  );
};

export default ComentariosComponent;
