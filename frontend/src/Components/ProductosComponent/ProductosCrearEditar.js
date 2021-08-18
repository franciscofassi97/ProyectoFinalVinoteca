import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Compponent
import LoadingBox from "../MenuComponents/LoadingBox";

//Actions
import { crearProducto } from "../../redux/action/productosActions";
import { getTipoVinos } from "../../redux/action/tipoVinoActions";
import { getVarietales } from "../../redux/action/varietalActions";
import { getBodegas } from "../../redux/action/bodegasActions";

//Constants

//Materia ui
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, MenuItem } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginRight: theme.spacing(1),
  },
}));

const ProductosCrearEditar = (props) => {
  const classes = useStyles();

  const productoCrearState = useSelector((state) => state.crearProducto);
  const {
    success: successCrear,
    loading: loadingCrear,
    error: errorCrear,
  } = productoCrearState;

  const getTipoVino = useSelector((state) => state.getTipoVino);
  const { tipoVino } = getTipoVino;

  const getVarietale = useSelector((state) => state.getVarietal);
  const { varietal } = getVarietale;

  const getBodegasState = useSelector((state) => state.getBodega);
  const { bodega } = getBodegasState;

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState(0);
  const [contendioNeto, setContendioNeto] = useState(0);
  const [precio, setPrecio] = useState(0);

  const [imagenUrl, setImagenUrl] = useState("");

  const [selectedTipoVino] = useState("Seleccionado");
  const [tipoVinoCombo, setTipoVinoCombo] = useState([]);

  const [selectedVarietal] = useState("Seleccionado");
  const [varietalCombo, setVarietalCombo] = useState([]);

  const [selectedBodega] = useState("Sleccionado");
  const [bodegaCombo, setBodegaCombo] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    //1-llenar los combos
    dispatch(getTipoVinos());
    dispatch(getVarietales());
    dispatch(getBodegas());

    if (successCrear) {
      alert("Se creo un producto con exito");

      props.history.push("/gestionProductos");
    }
  }, [dispatch, successCrear, props.history]);

  // Agregar nuevo Producto
  const submitHandler = (e) => {
    e.preventDefault();
    const newProducto = {
      nombre,
      descripcion,
      stock,
      contendioNeto,
      precio,
      imagenUrl,
      tipoVino: tipoVinoCombo,
      varietal: varietalCombo,
      bodega: bodegaCombo,
    };
    dispatch(crearProducto(newProducto));
  };

  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "nombre") {
      setNombre(value);
    } else if (inputName === "descripcion") {
      setDescripcion(value);
    } else if (inputName === "stock") {
      setStock(value);
    } else if (inputName === "contenidoNeto") {
      setContendioNeto(value);
    } else if (inputName === "precio") {
      setPrecio(value);
    }
  };
  const onComboChange = (event, comboName) => {
    let value = event.target.value;
    if (comboName === "tipoVino") {
      setTipoVinoCombo(value);
    } else if (comboName === "varietal") {
      setVarietalCombo(value);
    } else if (comboName === "bodega") {
      setBodegaCombo(value);
    }
  };
  const handleChangeImagen = (event, inputFileName) => {
    let value = event.target.files[0];
    if (inputFileName === "imagenUrl") {
      setImagenUrl(value);
    }
  };

  const handleCancelar = () => {
    props.history.push("/gestionProductos");
  };

  const formProductosNew = () => (
    <Container component="main">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Agregar Producto
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="producto"
                variant="outlined"
                required
                fullWidth
                id="producto"
                label="Nombre Producto"
                autoFocus
                size="small"
                value={nombre}
                onChange={(event) => imputsChange(event, "nombre")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                required
                fullWidth
                id="precio"
                label="Precio"
                name="precio"
                size="small"
                value={precio}
                onChange={(event) => imputsChange(event, "precio")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                required
                fullWidth
                id="stock"
                label="Stock"
                name="stock"
                size="small"
                value={stock}
                onChange={(event) => imputsChange(event, "stock")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                required
                fullWidth
                id="contenidoNeto"
                label="Contendio Neto"
                name="contenidoNeto"
                size="small"
                value={contendioNeto}
                onChange={(event) => imputsChange(event, "contenidoNeto")}
              />
            </Grid>

            {/* Select  */}
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel id="tipoDeVino">Tipo de Vino</InputLabel>
                <Select
                  labelId="tipoDeVino"
                  id="tipoDeVino"
                  label="Tipo de Vino"
                  size="small"
                  onChange={(event) => onComboChange(event, "tipoVino")}
                >
                  <MenuItem value={tipoVinoCombo}>
                    <em>{selectedTipoVino}</em>
                  </MenuItem>
                  {tipoVino.map((tipo, idenx) => {
                    return (
                      <MenuItem key={idenx} value={tipo._id}>
                        {" "}
                        {tipo.nombreTipo}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel id="varietal">Varietal</InputLabel>
                <Select
                  labelId="varietal"
                  id="varietal"
                  label="Varietal"
                  size="small"
                  onChange={(event) => onComboChange(event, "varietal")}
                >
                  <MenuItem value={varietalCombo}>
                    <em>{selectedVarietal}</em>
                  </MenuItem>
                  {varietal.map((varietal, idenx) => {
                    return (
                      <MenuItem key={idenx} value={varietal._id}>
                        {" "}
                        {varietal.nombreVarietal}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel id="bodega">Bodega</InputLabel>

                <Select
                  labelId="bodega"
                  id="bodega"
                  label="Bodega"
                  onChange={(event) => onComboChange(event, "bodega")}
                >
                  <MenuItem value={bodegaCombo}>
                    <em>{selectedBodega}</em>
                  </MenuItem>
                  {bodega.map((bodega, idenx) => {
                    return (
                      <MenuItem key={idenx} value={bodega._id}>
                        {" "}
                        {bodega.nombreBodega}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Descripcion"
                multiline
                fullWidth
                rows={3}
                variant="outlined"
                size="small"
                value={descripcion}
                onChange={(event) => imputsChange(event, "descripcion")}
              />
            </Grid>

            {/* IAMGEN */}
            <Grid item xs={12}>
              <label htmlFor="imagenUrl">
                <input
                  style={{ display: "none" }}
                  id="imagenUrl"
                  type="file"
                  onChange={(event) => handleChangeImagen(event, "imagenUrl")}
                  accept="image/*"
                  name="imagenUrl"
                  required
                />

                <Fab
                  color="primary"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                >
                  <AddIcon /> Agregar Imagen...
                </Fab>
              </label>
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.submit}
                onClick={() => handleCancelar()}
              >
                Cancelar
              </Button>
            </Grid>

            <Grid item>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.submit}
              >
                Crear
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );

  return (
    <div>
      {loadingCrear ? (
        <LoadingBox></LoadingBox>
      ) : errorCrear ? (
        <h1>Error al intentar crear un nuevo producto</h1>
      ) : (
        <div>{formProductosNew()}</div>
      )}
    </div>
  );
};

export default ProductosCrearEditar;
