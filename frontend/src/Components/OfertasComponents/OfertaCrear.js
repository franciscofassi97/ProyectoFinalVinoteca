import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { crearOferta } from "../../redux/action/ofertaActions";

//Actions
import { getProducto } from "../../redux/action/productosActions";

const OfertaCrear = (props) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [precioDescuento, setPrecioDescuento] = useState(0);
  const [fechaFin, setFechaFin] = useState("");

  const getProductoState = useSelector((state) => state.getProducto);
  const { producto } = getProductoState;

  const getNewOfertaState = useSelector((state) => state.newOferta);
  const { success: successOferta } = getNewOfertaState;

  //Parametro id
  const params = useParams();
  const idProducto = params.idProducto;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!producto || producto._id !== idProducto || successOferta) {
      dispatch(getProducto(idProducto));
    } else {
      setNombreProducto(producto.nombre);
      setPrecioProducto(producto.precio);
    }
    if (successOferta) {
      alert(`Se Creo una oferta con exito ${producto.nombre} `);
      props.history.push("/gestionProductos");
    }
  }, [dispatch, idProducto, producto, props.history, successOferta]);

  const submitHandler = (e) => {
    e.preventDefault();
    const oferta = {
      producto: { idProducto: producto._id, precio: producto.precio },
      descuento,
      precioDescuento,
      fechaFin,
    };
    dispatch(crearOferta(oferta));
  };

  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "descuento") {
      setDescuento(value);
      setPrecioDescuento();
    } else if (inputName === "precioDescuento") {
      setPrecioDescuento(value);
    } else if (inputName === "fechaFin") {
      setFechaFin(value);
    }
  };

  const formOfertas = () => (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="nombreProducto">Nombre Producto</label>
          <input
            type="text"
            id="nombreProducto"
            value={nombreProducto}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="precioProducto">Precio :</label>
          <input
            type="text"
            id="precioProducto"
            value={precioProducto}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="descuento">Descuento del {descuento} % </label>
          <input
            type="number"
            required
            id="descuento"
            placeholder="Ej: 30"
            value={descuento}
            onChange={(event) => imputsChange(event, "descuento")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="precioDescuento">Precio Nuevo </label>
          <input
            type="text"
            required
            id="precioDescuento"
            placeholder="Ej: 30"
            value={precioDescuento}
            onChange={(event) => imputsChange(event, "precioDescuento")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaFin">Fin de Oferta </label>
          <input
            type="date"
            required
            id="fechaFin"
            value={fechaFin}
            onChange={(event) => imputsChange(event, "fechaFin")}
          />
        </div>

        <button type="submit">Crear Oferta</button>
      </form>
    </div>
  );

  return (
    <div>
      <h1>Crear Oferta </h1>
      {formOfertas()}
    </div>
  );
};

export default OfertaCrear;
