import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

//Actions
import {
  eliminarComentario,
  getComentarios,
} from "../../redux/action/comentariosActions";
import LoadingBox from "../MenuComponents/LoadingBox";
import { COMENTARIO_ELIMINAR_RESET } from "../../redux/constants/comentariosConstats";

const GestionComentariosComponent = () => {
  const comentariosState = useSelector((state) => state.todosComentarios);
  const { comentarios, loading, erorr } = comentariosState;

  const comentarioElimnarState = useSelector(
    (state) => state.eliminarComentario
  );
  const { success: successEliminar } = comentarioElimnarState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successEliminar) {
      // alert("Se elimino el comentario con exito");
      dispatch({ type: COMENTARIO_ELIMINAR_RESET });
      dispatch(getComentarios());
    } else {
      dispatch(getComentarios());
    }
  }, [dispatch, successEliminar]);

  const handlerEliminar = (idComentario) => {
    dispatch(eliminarComentario(idComentario));
  };

  const tableComentarios = () => (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : erorr ? (
        <h1>Eroor</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <td>Usuario</td>
              <td>Comentario</td>
            </tr>
          </thead>
          <tbody>
            {comentarios.map((comentario) => (
              <tr>
                <td>{comentario.usuario}</td>
                <td>{comentario.comentario}</td>
                <td>
                  <button
                    onClick={() => handlerEliminar(comentario._id)}
                    className="fa fa-trash"
                  ></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div>
      <h1>Gestion Comentarios</h1>
      {tableComentarios()}
    </div>
  );
};

export default GestionComentariosComponent;
