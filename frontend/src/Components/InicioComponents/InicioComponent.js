//Components
import ContactoComponent from "../ContactanosComponent/ContactoComponent";
import MapComponent from "../Map/MapComponent";
import NovedadesComponent from "../NovedadesComponent/NovedadesComponent";

const InicioComponent = () => {
  return (
    <div>
      <h1>Inicio</h1>
      <div className="Novedades">
        <NovedadesComponent />
        <ContactoComponent />
        <MapComponent />
      </div>
    </div>
  );
};

export default InicioComponent;
