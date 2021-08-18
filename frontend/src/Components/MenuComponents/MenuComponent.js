import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//Material-UI
import { IconButton, makeStyles, Button, Tooltip } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//Action
import { cerrarSesion } from "../../redux/action/authActions";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${240}px)`,
      marginLeft: 240,
    },
  },
}));

const MenuComponent = (props) => {
  const usuario = useSelector((state) => state.usuarioIniciarSesion);
  const { infoUsuario } = usuario;

  const carrito = useSelector((state) => state.carrito);
  const { carritoItems } = carrito;

  const getCarritoCantidad = () => {
    return carritoItems.reduce(
      (cantidad, item) => Number(item.cantidad) + cantidad,
      0
    );
  };

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (cerrarSesionAlerta) => {
    setOpen(false);

    if (cerrarSesionAlerta === "si") {
      dispatch(cerrarSesion());
    }
  };

  const classes = useStyles();
  const menu = () => (
    <AppBar className={classes.appBar} position="fixed" color="primary">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
          onClick={() => props.accionAbrir()}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Vinoteca de Jose
        </Typography>

        <Tooltip aria-label="add to shopping cart" title={getCarritoCantidad()}>
          <IconButton
            color="inherit"
            component={Link}
            to="/tienda"
            aria-label="add to shopping cart"
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>

        {!infoUsuario ? (
          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            to="/login"
          >
            Iniciar Sesion
          </Button>
        ) : (
          <div>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleClickOpen}
            >
              Cerrar Sesion
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="Cerrar-sesison"
            >
              <DialogTitle id="alert-dialog-title">
                {"Cerrar Sesion"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="Cerrar-sesison">
                  ¿Esta seguro que desea cerrar sesion?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose("no")} color="primary">
                  NO
                </Button>
                <Button
                  onClick={() => handleClose("si")}
                  color="primary"
                  autoFocus
                >
                  SI
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );

  return <div>{menu()}</div>;
};

export default MenuComponent;
