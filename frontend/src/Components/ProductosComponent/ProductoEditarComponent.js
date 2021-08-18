import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//Component loading
import LoadingBox from "../MenuComponents/LoadingBox";

import {
  actualizarProducto,
  getProducto,
} from "../../redux/action/productosActions";

//impoer action llenar Combos
import { getBodegas } from "../../redux/action/bodegasActions";
import { getTipoVinos } from "../../redux/action/tipoVinoActions";
import { getVarietales } from "../../redux/action/varietalActions";

const ProductoEditarComponent = (props) => {
  //Atributos del producto
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState(0);
  const [contendioNeto, setContendioNeto] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [imagenUrl, setImagenUrl] = useState("");
  const [selectedTipoVino, setSelectedTipoVino] = useState("Seleccionado");
  const [tipoVinoCombo, setTipoVinoCombo] = useState([]);
  const [selectedVarietal, setselectedVarietal] = useState("Seleccionado");
  const [varietalCombo, setVarietalCombo] = useState([]);
  const [selectedBodega, setSelectedBodega] = useState("Sleccionado");
  const [bodegaCombo, setBodegaCombo] = useState([]);

  //state de getProducto
  const getProductoState = useSelector((state) => state.getProducto);
  const {
    loading: loadingProducto,
    producto,
    error: errorProducto,
  } = getProductoState;
  //state actualizar producto
  const productoActualizarState = useSelector(
    (state) => state.actualizarProducto
  );
  const {
    loading: loadingActualizar,
    error: errorActualizar,
    success: successActualizar,
  } = productoActualizarState;

  //State Combos

  const getTipoVino = useSelector((state) => state.getTipoVino);
  const { tipoVino } = getTipoVino;

  const getVarietale = useSelector((state) => state.getVarietal);
  const { varietal } = getVarietale;

  const getBodegasState = useSelector((state) => state.getBodega);
  const { bodega } = getBodegasState;

  //Parametro id
  const params = useParams();
  const idProducto = params.idProducto;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBodegas());
    dispatch(getTipoVinos());
    dispatch(getVarietales());

    if (successActualizar) {
      alert(`Se actualizo con exito el producto ${producto.nombre} `);
      props.history.push("/gestionProductos");
    }
    if (!producto || producto._id !== idProducto || successActualizar) {
      dispatch(getProducto(idProducto));
    } else {
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setStock(producto.stock);
      setPrecio(producto.precio);
      setContendioNeto(producto.contendioNeto);
      setImagenUrl(producto.imagenUrl);
      setSelectedTipoVino(producto.nombreTipo);
      setTipoVinoCombo(producto.idTipoVino);
      setBodegaCombo(producto.idBodega);
      setSelectedBodega(producto.nombreBodega);
      setVarietalCombo(producto.idVarietal);
      setselectedVarietal(producto.nombreVarietal);
    }
  }, [dispatch, idProducto, producto, props.history, successActualizar]);

  const submitHandler = (e) => {
    e.preventDefault();
    const updateProducto = {
      _id: params.idProducto,
      nombre,
      descripcion,
      stock,
      contendioNeto,
      precio,
      imagenUrl,
      tipoVino: tipoVinoCombo,
      varietal: varietalCombo,
      bodega: bodegaCombo,
    };
    dispatch(actualizarProducto(updateProducto));
  };

  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "nombre") {
      setNombre(value);
    } else if (inputName === "descripcion") {
      setDescripcion(value);
    } else if (inputName === "stock") {
      setStock(value);
    } else if (inputName === "contenidoNeto") {
      setContendioNeto(value);
    } else if (inputName === "precio") {
      setPrecio(value);
    }
  };
  const onComboChange = (event, comboName) => {
    let value = event.target.value;
    if (comboName === "tipoVino") {
      setTipoVinoCombo(value);
    } else if (comboName === "varietal") {
      setVarietalCombo(value);
    } else if (comboName === "bodega") {
      setBodegaCombo(value);
    }
  };
  const handleChangeImagen = (event, inputFileName) => {
    let value = event.target.files[0];
    if (inputFileName === "imagenUrl") {
      setImagenUrl(value);
    }
  };

  const mostrarProductoActualizar = () => (
    <div>
      {loadingProducto || loadingActualizar ? (
        <LoadingBox></LoadingBox>
      ) : errorProducto || errorActualizar ? (
        <h1>Se produjo un error</h1>
      ) : (
        <form onSubmit={submitHandler} encType="multipart/form-data">
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
            <label htmlFor="descripcion"> Descripcion</label>
            <textarea
              id="descripcion"
              placeholder="Ingrese descripcion"
              required
              value={descripcion}
              onChange={(event) => imputsChange(event, "descripcion")}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              required
              id="stock"
              placeholder="Cantidad en stock"
              value={stock}
              onChange={(event) => imputsChange(event, "stock")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contenidoNeto"> Contenido</label>
            <input
              type="number"
              required
              id="contenidoNeto"
              placeholder="Contenido Neto"
              value={contendioNeto}
              onChange={(event) => imputsChange(event, "contenidoNeto")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="precio"> Precio</label>
            <input
              type="number"
              required
              id="precio"
              placeholder="Precio"
              value={precio}
              onChange={(event) => imputsChange(event, "precio")}
            />
          </div>
          <div className="form-group" id="">
            <label htmlFor="imagen">Seleccione imagen</label>
            <input
              onChange={(event) => handleChangeImagen(event, "imagenUrl")}
              type="file"
              accept="image/*"
              name="imagenUrl"
            />
            {imagenUrl ? <img src={imagenUrl} alt={nombre}></img> : null}
          </div>

          <div>
            <select
              onChange={(event) => onComboChange(event, "tipoVino")}
              type="text"
            >
              <option value={tipoVinoCombo}>{selectedTipoVino}</option>
              {tipoVino.map((tipo, index) => {
                return (
                  <option key={index} value={tipo._id}>
                    {tipo.nombreTipo}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <select
              onChange={(event) => onComboChange(event, "varietal")}
              type="text"
            >
              <option value={varietalCombo}>{selectedVarietal}</option>
              {varietal.map((varietal, index) => {
                return (
                  <option key={index} value={varietal._id}>
                    {varietal.nombreVarietal}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            {bodega ? (
              <select
                onChange={(event) => onComboChange(event, "bodega")}
                type="text"
              >
                <option value={bodegaCombo}>{selectedBodega}</option>
                {bodega.map((bodega, index) => {
                  return (
                    <option key={index} value={bodega._id}>
                      {bodega.nombreBodega}
                    </option>
                  );
                })}
              </select>
            ) : null}
          </div>

          <button type="submit">Editar</button>
        </form>
      )}
    </div>
  );

  return <>{mostrarProductoActualizar()}</>;
};

export default ProductoEditarComponent;
