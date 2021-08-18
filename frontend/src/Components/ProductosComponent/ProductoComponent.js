import { Link } from "react-router-dom";

const Producto = ({
  imagenUrl,
  nombre,
  precio,
  descripcion,
  productoId,
  isOferta,
  precioDescuento,
}) => {
  return (
    <div className="product">
      <img src={imagenUrl} alt={nombre} />

      <div className="product__info">
        <p className="info__name">{nombre}</p>
        <p className="info__description">{descripcion.substring(0, 100)}... </p>
        {isOferta ? <p> Oferta ${precioDescuento}</p> : <p>{precio}</p>}

        <Link to={`/producto/${productoId}`}>Ver mas</Link>
      </div>
    </div>
  );
};

export default Producto;
