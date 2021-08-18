import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//ACTIONS
import { crearBodega } from "../../redux/action/bodegasActions";

//Compoenen
import LoadingBox from "../MenuComponents/LoadingBox";

//Materia ui
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
    marginRight: theme.spacing(1),
  },
}));

const BodegaComponent = (props) => {
  const classes = useStyles();

  const [nombreBodega, setNombreBodega] = useState("");
  const [descripcionBodega, setDescripcionBodega] = useState("");

  const dispatch = useDispatch();

  const bodegaState = useSelector((state) => state.bodega);
  const { loading } = bodegaState;

  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "nombreBodega") {
      setNombreBodega(value);
    } else if (inputName === "descripcion") {
      setDescripcionBodega(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newBodega = {
      nombreBodega,
      descripcionBodega,
    };
    if (newBodega) {
      dispatch(crearBodega(newBodega));
    }
  };

  const formTipoBodega = () => (
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
                  autoComplete="fbodega"
                  name="nombreBodega"
                  variant="outlined"
                  required
                  fullWidth
                  id="nombreBodega"
                  label="Nombre de la Bodega"
                  autoFocus
                  size="small"
                  value={nombreBodega}
                  onChange={(event) => imputsChange(event, "nombreBodega")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fdescripcion"
                  name="descripcionBodega"
                  variant="outlined"
                  required
                  fullWidth
                  id="descripcionBodega"
                  label="Nombre de la Bodega"
                  size="small"
                  value={descripcionBodega}
                  multiline
                  rows={3}
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

            {/* <button type="submit">Crear</button> */}
          </form>
        </div>
      )}
    </div>
  );

  return <div>{formTipoBodega()}</div>;
};

export default BodegaComponent;
