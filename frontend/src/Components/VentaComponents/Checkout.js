import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

//Actions
import { crearVenta } from "../../redux/action/ventaActions";
import { VENTA_CREAR_RESET } from "../../redux/constants/ventaConstants";
import { VACIAR_EL_CARRITO } from "../../redux/constants/carritoConstants";

const Checkout = (props) => {
  const [direccion, setDireccion] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [formaPago, setFormaPago] = useState("Efectivo");

  const getCarrito = useSelector((state) => state.carrito);
  const { carritoItems } = getCarrito;

  const usuario = useSelector((state) => state.usuarioIniciarSesion);
  const { infoUsuario } = usuario;

  const ventaState = useSelector((state) => state.venta);
  const { success } = ventaState;

  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      alert("Compra realizada con existo");
      dispatch({ type: VENTA_CREAR_RESET });
      dispatch({ type: VACIAR_EL_CARRITO });
      props.history.push("/tienda");
    }
  }, [success, dispatch, props]);

  const getCarritoSubTotal = () => {
    return carritoItems.reduce(
      (precio, item) => item.precio * item.cantidad + precio,
      0
    );
  };

  const crearVentaHandler = (e) => {
    e.preventDefault();
    const venta = {
      usuario: infoUsuario.usuario.id,
      montoTotal: getCarritoSubTotal(),
      items: carritoItems,
      direccionEnvio: { direccion, numeroTelefono, ciudad },
      formaPago,
    };
    dispatch(crearVenta(venta));
  };

  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "direccion") {
      setDireccion(value);
    } else if (inputName === "numeroTelefono") {
      setNumeroTelefono(value);
    } else if (inputName === "ciudad") {
      setCiudad(value);
    }
  };

  const listaCarrito = () => (
    <div>
      <h1>Producto elegidos</h1>
      <table>
        <thead>
          <tr>
            <td>
              <strong>Nombre</strong>
            </td>
            <td>
              <strong>Precio Unitario</strong>
            </td>
            <td>
              <strong>Cantidad</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {carritoItems.map((item) => (
            <tr key={item.producto}>
              <td>{item.nombre}</td>
              <td>{item.precio}</td>
              <td>{item.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <label>Total {getCarritoSubTotal()}</label>
    </div>
  );

  const opcionesDeCompra = () => (
    <div>
      <h1>Ultimos pasos</h1>
      <form onSubmit={crearVentaHandler}>
        <h4>Datos del destino</h4>
        <div className="form-group">
          <label htmlFor="ciudad"> Ciudad </label>
          <input
            type="text"
            required
            id="ciudad"
            placeholder="Cidudad de residencia"
            value={ciudad}
            onChange={(event) => imputsChange(event, "ciudad")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion"> Direccion </label>
          <input
            type="text"
            required
            id="direccion"
            placeholder="Direccion de Envio"
            value={direccion}
            onChange={(event) => imputsChange(event, "direccion")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numeroTelefono"> Numero de Telefono </label>
          <input
            type="text"
            required
            id="numeroTelefono"
            placeholder="Numero de Telefono"
            value={numeroTelefono}
            onChange={(event) => imputsChange(event, "numeroTelefono")}
          />
        </div>
        <div>
          <h4>Seleccione forma de pago</h4>
          <div>
            <input
              type="radio"
              id="efectivo"
              value="Efectivo"
              name="formaPago"
              required
              onChange={(e) => setFormaPago(e.target.value)}
            ></input>
            <label htmlFor="efectivo">Efectivo</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="tarjeta"
              value="Tarjeta"
              name="formaPago"
              required
              onChange={(e) => setFormaPago(e.target.value)}
            ></input>
            <label htmlFor="tarjeta">Tarjeta</label>
          </div>
        </div>
        <button type="submit">Confirman Compra</button>
      </form>
    </div>
  );

  return (
    <div>
      {listaCarrito()}
      {opcionesDeCompra()}
    </div>
  );
};

export default Checkout;
