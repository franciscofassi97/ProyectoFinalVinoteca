import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//ACTIONS
import { crearVarietal } from "../../redux/action/varietalActions";

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

const VarietalComponent = (props) => {
  const classes = useStyles();

  const [nombreVarietal, setNombreVarietal] = useState("");
  const [descripcionVarietal, setDescripcionVarietal] = useState("");

  const dispatch = useDispatch();

  const varietalState = useSelector((state) => state.varietal);
  const { success, loading } = varietalState;

  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "nombreVarietal") {
      setNombreVarietal(value);
    } else if (inputName === "descripcion") {
      setDescripcionVarietal(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newVarietal = {
      nombreVarietal,
      descripcionVarietal,
    };
    if (newVarietal) {
      dispatch(crearVarietal(newVarietal));
    }
  };

  const formVarietal = () => (
    <div className={classes.paper}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div>
          <form onSubmit={submitHandler}>
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
                  autoComplete="fVarietal"
                  name="nombreVarietal"
                  variant="outlined"
                  required
                  fullWidth
                  id="nombreVarietal"
                  label="Nombre de Varietal"
                  autoFocus
                  size="small"
                  value={nombreVarietal}
                  onChange={(event) => imputsChange(event, "nombreVarietal")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="fdescripcion"
                  name="descripcionVarietal"
                  variant="outlined"
                  required
                  fullWidth
                  id="descripcionVarietal"
                  label="Descripcion del Varietal"
                  size="small"
                  multiline
                  rows={3}
                  value={descripcionVarietal}
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

  return <div>{formVarietal()}</div>;
};

export default VarietalComponent;
