import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

//React Scroll
import { Link as LinkScroll } from "react-scroll";
//Material- ui
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import AssessmentIcon from "@material-ui/icons/Assessment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import TodayIcon from "@material-ui/icons/Today";
import PieChartIcon from "@material-ui/icons/PieChart";
import BarChartIcon from "@material-ui/icons/BarChart";
import TimelineIcon from "@material-ui/icons/Timeline";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import HomeIcon from "@material-ui/icons/Home";
import Collapse from "@material-ui/core/Collapse";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CommentIcon from "@material-ui/icons/Comment";
import LineWeightIcon from "@material-ui/icons/LineWeight";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/core";
import { USUARIO_DETALLE_RESET } from "../../redux/constants/usuarioConstants";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const MenuListaComponent = () => {
  const usuario = useSelector((state) => state.usuarioIniciarSesion);
  const { infoUsuario } = usuario;

  const dispatch = useDispatch();

  const [openVentas, setOpenVentas] = useState(false);
  const [openReportes, setOpenReportes] = useState(false);
  const [openProductos, setOpenProductos] = useState(false);

  const [inicio, setInicio] = useState(true);

  const classes = useStyles();
  const handleClick = (event, nameOpen) => {
    if (nameOpen === "ventas") {
      setOpenVentas(!openVentas);
    } else if (nameOpen === "reportes") {
      setOpenReportes(!openReportes);
    } else if (nameOpen === "productos") {
      setOpenProductos(!openProductos);
    }
    setInicio(false);
  };

  const menuLista = () => (
    <div>
      <List component="nav">
        <ListItem
          button
          component={Link}
          to="/"
          onClick={() => setInicio(true)}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
        {inicio ? (
          <div>
            <ListItem
              button
              component={LinkScroll}
              to="novedades"
              smooth={true}
              duration={500}
            >
              <ListItemIcon>
                <FiberNewIcon />
              </ListItemIcon>
              <ListItemText primary="Novedades" />
            </ListItem>

            <ListItem
              button
              component={LinkScroll}
              to="contactanos"
              smooth={true}
              duration={500}
            >
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary="Contactanos" />
            </ListItem>
            <ListItem
              button
              component={LinkScroll}
              to="ubicacion"
              smooth={true}
              duration={500}
            >
              <ListItemIcon>
                <NotListedLocationIcon />
              </ListItemIcon>
              <ListItemText primary="Ubicacion" />
            </ListItem>
          </div>
        ) : null}
        <Divider />
        {/* GESTION PRODUCTOS */}
        {infoUsuario && infoUsuario.usuario.isAdmin ? (
          <div>
            <List>
              <ListItem
                button
                onClick={(event) => handleClick(event, "productos")}
                component={Link}
                to="/gestionProductos"
              >
                <ListItemIcon>
                  <BusinessCenterIcon />
                </ListItemIcon>
                <ListItemText primary="Productos" />
                {openProductos ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openProductos} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={classes.nested}
                    component={Link}
                    to="/productos/bodegas"
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bodegas" />
                  </ListItem>

                  <ListItem
                    button
                    className={classes.nested}
                    component={Link}
                    to="/productos/varietales"
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Varietales" />
                  </ListItem>

                  <ListItem
                    button
                    className={classes.nested}
                    component={Link}
                    to="/productos/tipos"
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tipos Bebidas" />
                  </ListItem>
                </List>
              </Collapse>

              {/* SECCION VENTAS */}
              <ListItem
                button
                onClick={(event) => handleClick(event, "ventas")}
                component={Link}
                to="/gestionventas"
              >
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Ventas" />
                {openVentas ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openVentas} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={classes.nested}
                    component={Link}
                    to="/ventas/hoy"
                  >
                    <ListItemIcon>
                      <TodayIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ventas hoy" />
                  </ListItem>
                </List>
              </Collapse>

              <ListItem
                button
                onClick={(event) => handleClick(event, "reportes")}
              >
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Informes" />
                {openReportes ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openReportes} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={classes.nested}
                    component={Link}
                    to="/cantidad/productos/vendidos"
                  >
                    <ListItemIcon>
                      <TimelineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ventas por mes" />
                  </ListItem>

                  <ListItem
                    button
                    className={classes.nested}
                    component={Link}
                    to="/reportes"
                  >
                    <ListItemIcon>
                      <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ingresos Brutos" />
                  </ListItem>

                  <ListItem
                    button
                    className={classes.nested}
                    component={Link}
                    to="/reportes/varietal/mas/vendido"
                  >
                    <ListItemIcon>
                      <PieChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Varietal mas vendido" />
                  </ListItem>
                </List>
              </Collapse>

              <ListItem
                button
                component={Link}
                to="/comentarios"
                onClick={() => setInicio(false)}
              >
                <ListItemIcon>
                  <CommentIcon />
                </ListItemIcon>
                <ListItemText primary="Comentarios" />
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/gestion/novedades"
                onClick={() => setInicio(false)}
              >
                <ListItemIcon>
                  <LineWeightIcon />
                </ListItemIcon>
                <ListItemText primary="Novedades" />
              </ListItem>
            </List>
          </div>
        ) : infoUsuario && !infoUsuario.usuario.isAdmin ? (
          <div>
            <ListItem
              button
              component={Link}
              to="/perfil"
              onClick={() => dispatch({ type: USUARIO_DETALLE_RESET })}
            >
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/perfil"
              onClick={() => dispatch({ type: USUARIO_DETALLE_RESET })}
            >
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Mis Compras" />
            </ListItem>

            <ListItem button component={Link} to="/tienda">
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Tienda" />
            </ListItem>
          </div>
        ) : null}
        <Divider />
        <ListItem
          button
          component={Link}
          to="/terminos/condiciones"
          onClick={() => setInicio(false)}
        >
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <ListItemText primary="Terminos y Condiciones" />
        </ListItem>
      </List>
    </div>
  );

  return <div>{menuLista()}</div>;
};

export default MenuListaComponent;
