import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Redux
import { getBodegas } from "../../redux/action/bodegasActions";
import { BODEGA_CREAR_RESET } from "../../redux/constants/bodegasConstants";
//Componenets
import LoadingBox from "../MenuComponents/LoadingBox";
import BodegaComponent from "./BodegasComponent";
import Modal from "../ModalComponent/Modal";
import ShowAlert from "../ModalComponent/ShowAlert";

//Material ui
import { Container, Grid, IconButton, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import AddIcon from "@material-ui/icons/Add";
import { useTheme } from "@material-ui/core/styles";

const GestionBodegas = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const getBodegasState = useSelector((state) => state.getBodegas);
  const {
    bodegas,
    loading: loadingBodegas,
    error: errorBodegas,
  } = getBodegasState;

  const bodegaState = useSelector((state) => state.bodega);
  const {
    success,
    loading: loadingCrearBodega,
    error: errorCrearBodega,
  } = bodegaState;

  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      setOpenAlert(true);
      dispatch({ type: BODEGA_CREAR_RESET });
      dispatch(getBodegas());
      setOpenModal(false);
    } else {
      dispatch(getBodegas());
    }
  }, [dispatch, success]);

  const columnas = [
    {
      title: "Bodega",
      field: "nombreBodega",
    },
    {
      title: "Descripcion",
      field: "descripcionBodega",
      emptyValue: () => <em>No se agrego Descripcion</em>,
      sorting: false,
      searchable: false,
    },
  ];

  const handleEliminar = () => {
    return null;
  };

  const tabla = () => (
    <Container component="main">
      <Grid container spacing={1}>
        <Grid item xs={6} sm={12}>
          <MaterialTable
            columns={columnas}
            data={bodegas}
            title="Bodegas"
            actions={[
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
                    onClick={() => setOpenModal(true)}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                ),
                isFreeAction: true,
                tooltip: "Agregar Bodega",
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
      {loadingBodegas ? (
        <Modal title="Cargando" openModal={true}>
          <LoadingBox></LoadingBox>
        </Modal>
      ) : errorBodegas ? (
        <h1>Error al cargar las Bodegas</h1>
      ) : (
        <div>{tabla()}</div>
      )}

      {loadingCrearBodega ? (
        <Modal title="Agregar Bodega" openModal={true}>
          <LoadingBox></LoadingBox>
        </Modal>
      ) : errorCrearBodega ? (
        <Modal title="Error" openModal={true}>
          <Typography variant="h6" color="error">
            Se ha producido un error
          </Typography>
        </Modal>
      ) : (
        <Modal
          title="Agregar Bodega"
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <BodegaComponent />
        </Modal>
      )}

      <ShowAlert
        message="Se creo exitosamente"
        severity="success"
        setOpenAlert={setOpenAlert}
        openAlert={openAlert}
      />
    </div>
  );
};

export default GestionBodegas;
