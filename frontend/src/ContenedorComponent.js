import { useState } from "react";

import { Route, Switch } from "react-router-dom";

//Material - UI
import { Hidden, makeStyles } from "@material-ui/core";
import Cajon from "./Components/MenuComponents/Cajon";
import MenuComponent from "./Components/MenuComponents/MenuComponent";

//Components
//Components tienda
import TiendaComponent from "./Components/TiendaComponent";
import CarritoComponent from "./Components/CarritoComponent";

//Componets Usuario
import LoginComponent from "./Components/UsuarioComponent/LoginComponent";
import RegistroComponent from "./Components/UsuarioComponent/RegistroComponent";
import PerfilComponent from "./Components/UsuarioComponent/PerfilComponent";
import EditarPerfilComponent from "./Components/UsuarioComponent/EditarPerfilComponent";

//Componets Gestion Productos
import ProductosCrearEditar from "./Components/ProductosComponent/ProductosCrearEditar";
import GestionProductosComponent from "./Components/ProductosComponent/GestionProductosComponent";
import ProductoVerMasComponent from "./Components/ProductosComponent/ProductoVerMasComponent";
import ProductoEditarComponent from "./Components/ProductosComponent/ProductoEditarComponent";

// Gesion ordenes
import VentasListComponent from "./Components/VentaComponents/VentasListComponent";
import DetalleVentaPorUsuarioComponent from "./Components/VentaComponents/DetalleVentaPorUsuarioComponent";
import VerMasVentas from "./Components/VentaComponents/VerMasVentas";
// Routing private
import PrivateRoute from "./Components/routing/PrivateRoute";
import PrivateRouteUsuario from "./Components/routing/PrivateRouteUsuario";
import Checkout from "./Components/VentaComponents/Checkout";
import VentasDeHoy from "./Components/VentaComponents/VentasDeHoy";

//Gestion comentarios
import GestionComentariosComponent from "./Components/ComentariosComponents/GestionComentariosComponent";

//Reportes
import IngresosBrutos from "./Components/ReportesComponets/IngresosBrutosMesComponents";
import VarietalMasVendidoComponents from "./Components/ReportesComponets/VarietalMasVendidoComponents";
import CantiadProdVendidosPorMes from "./Components/ReportesComponets/CantiadProdVendidosPorMes";

//Ofertas
import OfertaCrear from "./Components/OfertasComponents/OfertaCrear";
import GestionOfertas from "./Components/OfertasComponents/GestionOfertas";

//Inicio
import InicioComponent from "./Components/InicioComponents/InicioComponent";

//Novedades
import GestionNovedades from "./Components/NovedadesComponent/GestionNovedades";
import NovedadCrearComponent from "./Components/NovedadesComponent/NovedadCrearComponent";
import ProbandoForm from "./Components/ProductosComponent/ProbandoForm";
import TerminosYCondiciones from "./Components/TerminosYCondiciones";
import GestionBodegas from "./Components/ProductosComponent/GestionBodegas";
import GesitonVarietal from "./Components/ProductosComponent/GesitonVarietal";
import { GestionTipos } from "./Components/ProductosComponent/GestionTipos";

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
              path="/producto/editar/:idProducto"
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
