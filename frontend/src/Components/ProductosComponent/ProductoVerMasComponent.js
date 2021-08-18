import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

//Components
import ComentariosComponent from "../UsuarioComponent/ComentariosComponent";

//Actions
import { getProducto } from "../../redux/action/productosActions";
import { addCarrito } from "../../redux/action/carritoActions";

const ProductoVerMasComponent = ({ match, history }) => {
  const [cantidad, setCantidad] = useState(1);
  const [precioOferta, setPrecioOferta] = useState(0);

  const dispatch = useDispatch();

  const productoDetalle = useSelector((state) => state.getProducto);
  const { loading, error, producto } = productoDetalle;

  const getProductosOfertaState = useSelector(
    (state) => state.getProductosOferta
  );
  const { ofertas } = getProductosOfertaState;

  useEffect(() => {
    if (producto && match.params.id !== producto._id) {
      dispatch(getProducto(match.params.id));
    } else {
      ofertas.map((oferta) => {
        if (oferta._id === match.params.id)
          setPrecioOferta(oferta.precioDescuento);
      });
    }
  }, [dispatch, match, ofertas, precioOferta, producto]);

  const addCarritoHandler = () => {
    dispatch(addCarrito(producto._id, cantidad, precioOferta));
    history.push("/carrito");
  };

  return (
    <div className="prodctscreen">
      {loading ? (
        <h2>Cargando...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productoscreen__left">
            <div className="left__imagen">
              <img src={producto.imagenUrl} alt={producto.nombre} />
            </div>
          </div>
          <div className="left__info">
            <p className="left__name"> {producto.nombre}</p>
            <p>${producto.precio}</p>
            <p>{producto.descripcion}</p>
          </div>
          <div className="productoscreen__rigth">
            <div className="right__info">
              {producto.isOferta ? (
                <div>
                  <p>Oferta!! Antes: ${producto.precio}</p>
                  <p>Ahora $ {precioOferta}</p>
                </div>
              ) : (
                <p>{producto.precio}</p>
              )}
              <p>
                Estado:{" "}
                <span>{producto.stock > 0 ? "En stock" : "SIN STOCK"}</span>
              </p>
              <p>
                <select
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                >
                  {[...Array(producto.stock).keys()].map((cantidad) => (
                    <option key={cantidad + 1} value={cantidad + 1}>
                      {cantidad + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addCarritoHandler}>
                  Agregar al Carrito
                </button>
              </p>
            </div>
          </div>
        </>
      )}
      <div>
        <ComentariosComponent
          idProducto={match.params.id}
        ></ComentariosComponent>
      </div>
    </div>
  );
};

export default ProductoVerMasComponent;
