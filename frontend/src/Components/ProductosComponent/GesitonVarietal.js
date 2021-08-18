import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Redux
import { getVarietales } from "../../redux/action/varietalActions";
import { VARIETAL_CREAR_RESET } from "../../redux/constants/varietalConstants";
//Componenets
import LoadingBox from "../MenuComponents/LoadingBox";
import VarietalComponent from "./VarietalComponent";
import Modal from "../ModalComponent/Modal";
import ShowAlert from "../ModalComponent/ShowAlert";

//Material ui
import { Container, Grid, IconButton, Typography } from "@material-ui/core";

import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import { useTheme } from "@material-ui/core/styles";

const GesitonVarietal = () => {
  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const getVarietalState = useSelector((state) => state.getVarietal);
  const {
    varietal,
    loading: loadingVarietales,
    error: errorVarietales,
  } = getVarietalState;

  const getVarietalCrearState = useSelector((state) => state.varietal);
  const {
    success: succesVarietal,
    loading: loadingCrearVarietal,
    error: errorCrearVarietal,
  } = getVarietalCrearState;

  const dispatch = useDispatch();
  useEffect(() => {
    if (succesVarietal) {
      setOpenAlert(true);
      dispatch({ type: VARIETAL_CREAR_RESET });
      dispatch(getVarietales());
      setOpenModal(false);
    } else {
      dispatch(getVarietales());
    }
  }, [dispatch, succesVarietal]);

  const columnas = [
    {
      title: "Varietal",
      field: "nombreVarietal",
    },
    {
      title: "Descripcion Varietal",
      field: "descripcionVarietal",
      emptyValue: () => <em>No se agrego Descripcion</em>,
      sorting: false,
      searchable: false,
    },
  ];

  const handleEliminar = (id) => {
    console.log(id);
  };

  console.log(theme);

  const tabla = () => (
    <Container component="main">
      <Grid container spacing={1}>
        <Grid item xs={6} sm={12}>
          <MaterialTable
            columns={columnas}
            data={varietal}
            title="Varietales"
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
                tooltip: "Agregar Varietal",
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
      {loadingVarietales ? (
        <Modal title="Cargando" openModal={true}>
          <LoadingBox></LoadingBox>
        </Modal>
      ) : errorVarietales ? (
        <Typography variant="h6" color="error">
          Error al cargar varietales
        </Typography>
      ) : (
        <div>{tabla()}</div>
      )}

      {loadingCrearVarietal ? (
        <Modal title="Cargando ">
          <LoadingBox></LoadingBox>
        </Modal>
      ) : errorCrearVarietal ? (
        <Modal title="Error ">
          <Typography variant="h6" color="error">
            Se ha producido un error
          </Typography>
        </Modal>
      ) : (
        <Modal
          title="Agregar Varietal"
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <VarietalComponent />
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

export default GesitonVarietal;
