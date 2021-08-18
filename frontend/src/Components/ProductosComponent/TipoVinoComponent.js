import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//ACTIONS
import { crearTipoVino } from "../../redux/action/tipoVinoActions";
import { TIPOVINO_CREAR_RESET } from "../../redux/constants/tipoVinoConstants";
import LoadingBox from "../MenuComponents/LoadingBox";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
    marginRight: theme.spacing(1),
  },
}));

const TipoVinoComponent = (props) => {
  const classes = useStyles();

  const [nombreTipo, setNombreTipo] = useState("");
  const [descripcionTipo, setDescripcionTipo] = useState("");

  const dispatch = useDispatch();

  const tipoVinoState = useSelector((state) => state.tipoVino);
  const { success, loading } = tipoVinoState;

  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "nombreTipo") {
      setNombreTipo(value);
    } else if (inputName === "descripcion") {
      setDescripcionTipo(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newTipo = {
      nombreTipo,
      descripcionTipo,
    };
    if (newTipo) {
      dispatch(crearTipoVino(newTipo));
    }
  };

  const formTipoVino = () => (
    <div className={classes.paper}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div>
          <form className={classes.form} onSubmit={submitHandler}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
            >
              <Grid item xs={12}>
                <TextField
                  autoComplete="fTipo"
                  name="nombreTipo"
                  variant="outlined"
                  required
                  fullWidth
                  id="nombreTipo"
                  label="Nombre del Tipo"
                  autoFocus
                  size="small"
                  value={nombreTipo}
                  onChange={(event) => imputsChange(event, "nombreTipo")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fdescripcion"
                  name="descripcionTipo"
                  variant="outlined"
                  required
                  fullWidth
                  id="descripcionTipo"
                  label="Descricpicon del Tipo"
                  size="small"
                  multiline
                  rows={3}
                  value={descripcionTipo}
                  onChange={(event) => imputsChange(event, "descripcion")}
                />
              </Grid>
            </Grid>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  type="submit"
                  aria-label="Agregar"
                >
                  Aceptar
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </div>
  );

  return <div>{formTipoVino()}</div>;
};

export default TipoVinoComponent;
