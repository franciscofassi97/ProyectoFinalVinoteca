import { Container, IconButton, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Edit } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import { useTheme } from "@material-ui/core/styles";
import DetailsIcon from "@material-ui/icons/Details";
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
import Modal from "../ModalComponent/Modal";
import ProductosCrearEditar from "./ProductosCrearEditar";
import ShowAlert from "../ModalComponent/ShowAlert";

const GestionProductosComponent = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

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
  const {
    success: successCrear,
    loading: loadingCrear,
    error: errorCrear,
  } = productoCrearState;

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
      successCrear ||
      successActualizar ||
      successOferta ||
      successEliminarOferta
    ) {
      dispatch(getProductos());
      setOpenAlert(true);
      setOpenModal(false);

      dispatch({ type: PRODUCTO_CREAR_RESET });
      dispatch({ type: PRODUCTO_ACTUALIZAR_RESET });
      dispatch({ type: OFERTA_CREAR_RESET });
      dispatch({ type: ELMINIAR_OFERTA_RESET });
    } else {
      dispatch(getProductos());
    }

    if (successEliminar) {
      alert("Se elimino un producto con exito");
      dispatch({ type: PRODUCTO_ELIMINAR_RESET });
    }
  }, [
    dispatch,
    successActualizar,
    successCrear,
    successEliminar,
    successEliminarOferta,
    successOferta,
  ]);

  const handleEliminar = (idProducto) => {
    dispatch(eliminarProducto(idProducto));
  };

  const columnas = [
    { title: "Nombre", field: "nombre" },

    { title: "Varietal", field: "nombreVarietal" },

    { title: "Precio", field: "precio", type: "currency" },
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
                    to={`/producto/editar/${rowData._id}`}
                  >
                    <DetailsIcon />
                  </IconButton>
                ),
                tooltip: "editar ",
                onClick: rowData,
              }),
              (rowData) => ({
                icon: () => (
                  <IconButton color="secondary">
                    <DeleteOutlineTwoToneIcon />
                  </IconButton>
                ),
                tooltip: "Eliminar",
                onClick: (event, rowData) => handleEliminar(rowData._id),
              }),
              {
                icon: () => (
                  <IconButton
                    color="primary"
                    onClick={() => setOpenModal(true)}
                  >
                    <AddIcon />
                  </IconButton>
                ),
                isFreeAction: true,
                tooltip: "Crear Producto",
              },
              {
                icon: () => (
                  <IconButton
                    color="primary"
                    component={Link}
                    to="/gestion/ofertas"
                  >
                    <AttachMoneyIcon />
                  </IconButton>
                ),
                isFreeAction: true,
                tooltip: "Ver Ofertas",
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              tableLayout: "auto",
              pageSizeOptions: [5, 10],
              exportButton: true,
              exportAllData: true,
              rowStyle: (rowData, index) => ({
                backgroundColor: index % 2 !== 0 ? "#f5f5f5" : null,
              }),
              headerStyle: {
                backgroundColor: theme.palette.info.light,
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.primary.main,
              },
            }}
            localization={{
              header: {
                actions: "Acciones",
              },
            }}
            style={{
              fontFamily: theme.typography.fontFamily,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <div>
      {loadingAllProductos ? (
        <Modal title="Cargando" openModal={true}>
          <LoadingBox></LoadingBox>
        </Modal>
      ) : errorAllProductos ? (
        <Typography variant="h6" color="error">
          Error al cargar los Productos
        </Typography>
      ) : (
        <div>{table()}</div>
      )}

      {loadingCrear ? (
        <Modal title="Agregar Producto" openModal={true}>
          <LoadingBox></LoadingBox>
        </Modal>
      ) : errorCrear ? (
        <Modal title="Error" openModal={true}>
          <Typography variant="h6" color="error">
            Se ha producido un error
          </Typography>
        </Modal>
      ) : (
        <div>
          <Modal
            title="Agregar Producto"
            openModal={openModal}
            setOpenModal={setOpenModal}
          >
            <ProductosCrearEditar />
          </Modal>

          <ShowAlert
            message="Se creo exitosamente"
            severity="success"
            setOpenAlert={setOpenAlert}
            openAlert={openAlert}
          />
        </div>
      )}

      {/* {loadingCrear ||
      loadingActualizar ||
      loadingAllProductos ||
      loadingEliminar ? (
        <LoadingBox></LoadingBox>
      ) : errorAllProductos ? (
        <h1>Error</h1>
      ) : (
        <div>{table()}</div>
      )} */}
    </div>
  );
};

export default GestionProductosComponent;
