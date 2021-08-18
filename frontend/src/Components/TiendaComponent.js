import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Component
//Tienda Componet renderiza el componente "producto" y este muestra cada uno de los productos.
import Producto from "./ProductosComponent/ProductoComponent";

//ACTIONS
import { getProductos as listaProductos } from "../redux/action/productosActions";
import { getOfertas } from "../redux/action/ofertaActions";

const TiendaComponent = () => {
  const dispatch = useDispatch();

  const getProductos = useSelector((state) => state.getProductos);
  const { productos, loading, error } = getProductos;

  const getProductosOfertaState = useSelector(
    (state) => state.getProductosOferta
  );
  const {
    ofertas,
    loading: loadingOfertas,
    error: errorOfertas,
  } = getProductosOfertaState;
  useEffect(() => {
    dispatch(listaProductos());
    dispatch(getOfertas());
  }, [dispatch]);

  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Tienda</h2>
      <div className="homescreen__products">
        {loading ? (
          <h2>Cargando: </h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          productos.map((producto) => (
            <Producto
              key={producto._id}
              productoId={producto._id}
              nombre={producto.nombre}
              precio={producto.precio}
              descripcion={producto.descripcion}
              imagenUrl={producto.imagenUrl}
            />
          ))
        )}
      </div>
      <h2 className="homescreen__title">Ofertas </h2>
      <div className="homescreen__products">
        {loadingOfertas ? (
          <h2>Cargando: </h2>
        ) : errorOfertas ? (
          <h2>{errorOfertas}</h2>
        ) : (
          ofertas.map((producto) => (
            <Producto
              key={producto._id}
              productoId={producto._id}
              nombre={producto.nombre}
              precio={producto.precio}
              descripcion={producto.descripcion}
              imagenUrl={producto.imagenUrl}
              isOferta={producto.isOferta}
              precioDescuento={producto.precioDescuento}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TiendaComponent;
