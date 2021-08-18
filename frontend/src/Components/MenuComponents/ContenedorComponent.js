import { useState } from "react";

import { Route, Switch } from "react-router-dom";

//Material - UI
import { Hidden, makeStyles } from "@material-ui/core";
import Cajon from "./Cajon";
import MenuComponent from "./MenuComponent";

//Components
//Components tienda
import TiendaComponent from "../TiendaComponent";
import CarritoComponent from "../CarritoComponent";

//Componets Usuario
import LoginComponent from "../UsuarioComponent/LoginComponent";
import RegistroComponent from "../UsuarioComponent/RegistroComponent";
import PerfilComponent from "../UsuarioComponent/PerfilComponent";
import EditarPerfilComponent from "../UsuarioComponent/EditarPerfilComponent";

//Componets Gestion Productos
import ProductosCrearEditar from "../ProductosComponent/ProductosCrearEditar";
import GestionProductosComponent from "../ProductosComponent/GestionProductosComponent";
import ProductoVerMasComponent from "../ProductosComponent/ProductoVerMasComponent";
import TipoVinoComponent from "../ProductosComponent/TipoVinoComponent";
import VarietalComponent from "../ProductosComponent/VarietalComponent";
import ProductoEditarComponent from "../ProductosComponent/ProductoEditarComponent";

// Gesion ordenes
import VentasListComponent from "../VentaComponents/VentasListComponent";
import DetalleVentaPorUsuarioComponent from "../VentaComponents/DetalleVentaPorUsuarioComponent";
import VerMasVentas from "../VentaComponents/VerMasVentas";
// Routing private
import PrivateRoute from "../routing/PrivateRoute";
import PrivateRouteUsuario from "../routing/PrivateRouteUsuario";
import Checkout from "../VentaComponents/Checkout";
import VentasDeHoy from "../VentaComponents/VentasDeHoy";

//Gestion comentarios
import GestionComentariosComponent from "../ComentariosComponents/GestionComentariosComponent";

//Reportes
import IngresosBrutos from "../ReportesComponets/IngresosBrutosMesComponents";
import VarietalMasVendidoComponents from "../ReportesComponets/VarietalMasVendidoComponents";
import CantiadProdVendidosPorMes from "../ReportesComponets/CantiadProdVendidosPorMes";

//Ofertas
import OfertaCrear from "../OfertasComponents/OfertaCrear";
import GestionOfertas from "../OfertasComponents/GestionOfertas";

//Inicio
import InicioComponent from "../InicioComponents/InicioComponent";

//Novedades
import GestionNovedades from "../NovedadesComponent/GestionNovedades";
import NovedadCrearComponent from "../NovedadesComponent/NovedadCrearComponent";
import ProbandoForm from "../ProductosComponent/ProbandoForm";
import TerminosYCondiciones from "../TerminosYCondiciones";
import GestionBodegas from "../ProductosComponent/GestionBodegas";
import GesitonVarietal from "../ProductosComponent/GesitonVarietal";
import { GestionTipos } from "../ProductosComponent/GestionTipos";

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const ContenedorComponent = () => {
  const classes = styles();

  const [abrir, setAbrir] = useState(false);

  const accionAbrir = () => {
    setAbrir(!abrir);
  };
  return (
    <div className={classes.root}>
      <MenuComponent accionAbrir={accionAbrir} />
      <Hidden xsDown>
        <Cajon variant="permanent" open={true} />
      </Hidden>

      <Hidden smUp>
        <Cajon variant="temporary" open={abrir} onClose={accionAbrir} />
      </Hidden>
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        <main>
          <Switch>
            <Route exact path="/" component={InicioComponent} />
            <Route
              exact
              path="/producto/:id"
              component={ProductoVerMasComponent}
            />
            <Route exact path="/carrito" component={CarritoComponent} />
            <Route exact path="/tienda" component={TiendaComponent} />
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/registro" component={RegistroComponent} />
            <Route
              exact
              path="/terminos/condiciones"
              component={TerminosYCondiciones}
            />
            <PrivateRouteUsuario exact path="/checkout" component={Checkout} />
            <PrivateRouteUsuario
              exact
              path="/perfil"
              component={PerfilComponent}
            />
            <PrivateRouteUsuario
              exact
              path="/perfil/editar/:id"
              component={EditarPerfilComponent}
            />
            <PrivateRoute
              exact
              path="/productocrear"
              component={ProductosCrearEditar}
            />
            <PrivateRoute
              exact
              path="/gestionProductos"
              component={GestionProductosComponent}
            />
            <PrivateRoute
              exact
              path="/productocrear/:idProducto"
              component={ProductoEditarComponent}
            />
            {/* <PrivateRoute
              exact
              path="/tipoVino/crear"
              component={TipoVinoComponent}
            /> */}
            {/* <PrivateRoute
              exact
              path="/varietal/crear"
              component={VarietalComponent}
            /> */}

            <PrivateRoute
              exact
              path="/productos/varietales"
              component={GesitonVarietal}
            />
            <PrivateRoute
              exact
              path="/productos/tipos"
              component={GestionTipos}
            />

            <PrivateRoute
              exact
              path="/productos/bodegas"
              component={GestionBodegas}
            />

            <PrivateRoute
              exact
              path="/gestionventas"
              component={VentasListComponent}
            />
            {/* <PrivateRoute
              exact
              path="/panelControl"
              component={PanelComponent}
            /> */}
            <PrivateRoute
              exact
              path="/detalle/por/usuario/:id"
              component={DetalleVentaPorUsuarioComponent}
            />
            <PrivateRoute
              exact
              path="/detalle/ver/mas/:id"
              component={VerMasVentas}
            />
            <PrivateRouteUsuario
              exact
              path="/detalle/compras/:id"
              component={VerMasVentas}
            />
            <PrivateRoute exact path="/ventas/hoy" component={VentasDeHoy} />
            <PrivateRoute
              exact
              path="/comentarios"
              component={GestionComentariosComponent}
            />
            <PrivateRoute exact path="/reportes" component={IngresosBrutos} />
            <PrivateRoute
              exact
              path="/reportes/varietal/mas/vendido"
              component={VarietalMasVendidoComponents}
            />
            <PrivateRoute
              exact
              path="/cantidad/productos/vendidos"
              component={CantiadProdVendidosPorMes}
            />
            <PrivateRoute
              exact
              path="/ofertas/crear/:idProducto"
              component={OfertaCrear}
            />

            <PrivateRoute
              exact
              path="/gestion/ofertas"
              component={GestionOfertas}
            />

            <PrivateRoute
              exact
              path="/gestion/novedades"
              component={GestionNovedades}
            />

            <PrivateRoute
              exact
              path="/novedad/crear"
              component={NovedadCrearComponent}
            />

            <PrivateRoute exact path="/probando" component={ProbandoForm} />
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default ContenedorComponent;
