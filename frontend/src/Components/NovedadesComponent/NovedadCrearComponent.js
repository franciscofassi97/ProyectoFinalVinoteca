import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

//Constants
import { NOVEDAD_CREAR_RESET } from "../../redux/constants/novedadesConstants";
//Actions
import { crearNovedad } from "../../redux/action/novedadesActions";
import LoadingBox from "../MenuComponents/LoadingBox";

const NovedadCrearComponent = (props) => {
  const newNovedadState = useSelector((state) => state.newNovedad);
  const { success, loading, error } = newNovedadState;

  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      alert("Se creo la novedad con exito");
      dispatch({ type: NOVEDAD_CREAR_RESET });
      props.history.push("/gestion/novedades");
    }
  }, [dispatch, success, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newNovedad = {
      descripcion,
      imagenUrl,
    };
    dispatch(crearNovedad(newNovedad));
  };
  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "descripcion") {
      setDescripcion(value);
    }
  };

  const handleChangeImagen = (event, inputFileName) => {
    let value = event.target.files[0];
    if (inputFileName === "imagenUrl") {
      setImagenUrl(value);
    }
  };

  const formCrearNovedad = () => (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h1>Error al crear novedad</h1>
      ) : (
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="descripcion"> Descripcion</label>
            <textarea
              id="descripcion"
              placeholder="Ingrese descripcion"
              required
              value={descripcion}
              onChange={(event) => imputsChange(event, "descripcion")}
            ></textarea>
          </div>
          <div className="form-group" id="">
            <label htmlFor="imagen">Seleccione imagen</label>
            <input
              onChange={(event) => handleChangeImagen(event, "imagenUrl")}
              type="file"
              accept="image/*"
              name="imagenUrl"
              required
            />
          </div>
          <button type="submit">Crear Novedad</button>
        </form>
      )}
    </div>
  );
  return (
    <div>
      <h1>Form Crear Novedad</h1>
      {formCrearNovedad()}
    </div>
  );
};

export default NovedadCrearComponent;
