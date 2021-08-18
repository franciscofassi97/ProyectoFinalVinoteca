import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { addCarrito, borrarDelCarrito } from "../redux/action/carritoActions";
//Components
import ItemCarritoComponent from "./ItemCarritoComponent";

const CarritoComponent = () => {
  const dispatch = useDispatch();

  const carrito = useSelector((state) => state.carrito);
  const { carritoItems } = carrito;

  const cantidadChangeHandler = (id, cantidad) => {
    dispatch(addCarrito(id, cantidad));
  };

  const borrarDelCart = (id) => {
    dispatch(borrarDelCarrito(id));
  };

  const getCarritoCantidad = () => {
    return carritoItems.reduce(
      (cantidad, item) => Number(item.cantidad) + cantidad,
      0
    );
  };

  const getCarritoSubTotal = () => {
    return carritoItems.reduce(
      (precio, item) => item.precio * item.cantidad + precio,
      0
    );
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="cartscreen">
      <div className="cartscreen__left">
        <h2>Carrito de compras</h2>
        {carritoItems.length === 0 ? (
          <div>
            Carrito vacio <Link to="/">Volver a inicio</Link>
          </div>
        ) : (
          carritoItems.map((item) => (
            <ItemCarritoComponent
              key={item.producto}
              item={item}
              cantidad={cantidadChangeHandler}
              borrar={borrarDelCart}
            />
          ))
        )}
      </div>
      <div className="cartscreen__right">
        <div className="cartscreen__info">
          <p> Subtotal ({getCarritoCantidad()}) items</p>
          <p>${getCarritoSubTotal().toFixed(2)}</p>
        </div>
        <div>
          <Link to="/checkout">
            <button>Listo</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarritoComponent;
