import { Container, IconButton } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Edit } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

//Action
import {
  getProductos,
  eliminarProducto,
} from "../../redux/action/productosActions";

//ConstansReset
import {
  PRODUCTO_ACTUALIZAR_RESET,
  PRODUCTO_CREAR_RESET,
  PRODUCTO_ELIMINAR_RESET,
} from "../../redux/constants/productosConstants";

//Components
import LoadingBox from "../MenuComponents/LoadingBox";
import {
  ELMINIAR_OFERTA_RESET,
  OFERTA_CREAR_RESET,
} from "../../redux/constants/ofertasConstants";

const GestionProductosComponent = () => {
  const getTodosLosProductos = useSelector((state) => state.getProductos);
  const {
    productos: allProductos,
    loading: loadingAllProductos,
    error: errorAllProductos,
  } = getTodosLosProductos;

  const eliminarProductoState = useSelector((state) => state.productoEliminado);
  const {
    loading: loadingEliminar,

    success: successEliminar,
  } = eliminarProductoState;

  const productoCrearState = useSelector((state) => state.crearProducto);
  const { success: successCrear, loading: loadingCrear } = productoCrearState;

  const crearOfertaState = useSelector((state) => state.newOferta);
  const { success: successOferta } = crearOfertaState;

  const productoActualizarState = useSelector(
    (state) => state.actualizarProducto
  );
  const {
    loading: loadingActualizar,

    success: successActualizar,
  } = productoActualizarState;

  const eliminarOfertaState = useSelector((state) => state.eliminarOferta);
  const { success: successEliminarOferta } = eliminarOfertaState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !allProductos ||
      successCrear ||
      successActualizar ||
      successOferta ||
      successEliminarOferta
    ) {
      dispatch(getProductos());
      dispatch({ type: PRODUCTO_CREAR_RESET });
      dispatch({ type: PRODUCTO_ACTUALIZAR_RESET });
      dispatch({ type: OFERTA_CREAR_RESET });
      dispatch({ type: ELMINIAR_OFERTA_RESET });
    } else if (successEliminar) {
      alert("Se elimino un producto con exito");
      dispatch({ type: PRODUCTO_ELIMINAR_RESET });
    }
  }, [
    allProductos,
    dispatch,
    successActualizar,
    successCrear,
    successEliminar,
    successEliminarOferta,
    successOferta,
  ]);

  const handlerEliminar = (idProducto) => {
    dispatch(eliminarProducto(idProducto));
  };

  const columnas = [
    { title: "Nombre", field: "nombre" },

    { title: "Varietal", field: "nombreVarietal" },

    { title: "Precio", field: "precio", type: "numeric" },
  ];

  const table = () => (
    <Container component="main">
      <Grid container spacing={1}>
        <Grid item xs={6} sm={12}>
          <MaterialTable
            columns={columnas}
            data={allProductos}
            title="Lista de productos"
            actions={[
              (rowData) => ({
                icon: () => (
                  <IconButton
                    component={Link}
                    to={`/productocrear/${rowData._id}`}
                  >
                    <Edit />
                  </IconButton>
                ),
                tooltip: "editar ",
                onClick: rowData,
              }),
              {
                icon: "delete",
                tooltip: "Eliminar Producto",
                onClick: (event, rowData) => handlerEliminar(rowData._id),
              },
              {
                icon: () => (
                  <IconButton component={Link} to="/productocrear">
                    <AddIcon />
                  </IconButton>
                ),
                isFreeAction: true,
                tooltip: "Crear Producto",
              },
              // (rowData) => ({
              //   icon: () => (
              //     <IconButton
              //       component={Link}
              //       to={`/ofertas/crear/${rowData._id}`}
              //     >
              //       <AttachMoneyIcon />
              //     </IconButton>
              //   ),
              //   tooltip: "Crear Oferta ",
              //   onClick: rowData,
              // }),
              {
                icon: () => (
                  <IconButton component={Link} to="/gestion/ofertas">
                    <AttachMoneyIcon />
                  </IconButton>
                ),
                isFreeAction: true,
                tooltip: "Ver Ofertas",
              },
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
            localization={{
              header: {
                actions: "Acciones",
              },
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <div>
      {loadingCrear ||
      loadingActualizar ||
      loadingAllProductos ||
      loadingEliminar ? (
        <LoadingBox></LoadingBox>
      ) : errorAllProductos ? (
        <h1>Error</h1>
      ) : (
        <div>{table()}</div>
      )}
    </div>
  );
};

export default GestionProductosComponent;
