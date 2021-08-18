import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { TIPOVINO_CREAR_RESET } from "../../redux/constants/tipoVinoConstants";
import { getTipoVinos } from "../../redux/action/tipoVinoActions";

//Compoenents
import LoadingBox from "../MenuComponents/LoadingBox";
import TipoVinoComponent from "./TipoVinoComponent";
//Materia ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import MaterialTable from "material-table";
import { IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../ModalComponent/Modal";
import ShowAlert from "../ModalComponent/ShowAlert";
import { useTheme } from "@material-ui/core/styles";

export const GestionTipos = () => {
  const theme = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const getTiposState = useSelector((state) => state.getTipoVino);
  const { tipoVino, loading: loadingTipos, error } = getTiposState;

  const tipoState = useSelector((state) => state.tipoVino);
  const {
    success,
    loading: loadingCrearTipo,
    error: errorCrearTIpo,
  } = tipoState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setOpenAlert(true);
      dispatch({ type: TIPOVINO_CREAR_RESET });
      dispatch(getTipoVinos());
      setOpenModal(false);
    } else {
      dispatch(getTipoVinos());
    }
  }, [dispatch, success]);

  const columnas = [
    {
      title: "Tipo",
      field: "nombreTipo",
      align: "center",
    },
    {
      title: "Descripcion",
      field: "descripcionTipo",
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
            data={tipoVino}
            title="Tipos de Bebidas"
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
                tooltip: "Agregar Tipo",
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
      <div>
        {loadingTipos ? (
          <Modal title="Cargando" openModal={true}>
            <LoadingBox></LoadingBox>
          </Modal>
        ) : error ? (
          <Typography variant="h6" color="error">
            <h1>Error al cargar la lista </h1>
          </Typography>
        ) : (
          <div>{tabla()}</div>
        )}
      </div>
      <div>
        {loadingCrearTipo ? (
          <Modal title="Cargando" openModal={true}>
            <LoadingBox></LoadingBox>
          </Modal>
        ) : errorCrearTIpo ? (
          <Modal title="Error ">
            <Typography variant="h6" color="error">
              Se ha producido un error
            </Typography>
          </Modal>
        ) : (
          <Modal
            title="Agregar Tipo"
            openModal={openModal}
            setOpenModal={setOpenModal}
          >
            <TipoVinoComponent />
          </Modal>
        )}

        <ShowAlert
          message="Se creo exitosamente"
          severity="success"
          setOpenAlert={setOpenAlert}
          openAlert={openAlert}
        />
      </div>
    </div>
  );
};
