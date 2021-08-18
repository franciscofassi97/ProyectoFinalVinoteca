import GoogleMaps from "simple-react-google-maps";

const MapComponent = () => {
  return (
    <div id="ubicacion">
      <h1>¿Donde nos econtramos?</h1>

      <GoogleMaps
        apiKey={"AIzaSyB5xNVgLTNTf7sSBcOZBrcQmB1k7HSIBfc"}
        style={{ height: "400px", width: "300px" }}
        zoom={15}
        center={{
          lat: -30.984994449195355,
          lng: -64.09703050429943,
        }}
        markers={{ lat: -30.984994449195355, lng: -64.09703050429943 }}
      />
    </div>
  );
};

export default MapComponent;
