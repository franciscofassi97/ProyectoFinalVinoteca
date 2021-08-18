import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactApexChart from "react-apexcharts";

//Actions
import { ingresosBrutosPorMes } from "../../redux/action/reporteActions";

//Componests
import LoadinBox from "../MenuComponents/LoadingBox";

const IngresosBrutos = () => {
  const ingresosBrutosPorMesState = useSelector(
    (state) => state.ingresosBrutosPorMes
  );
  const { ingresos, loading, erorr } = ingresosBrutosPorMesState;

  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  const [descripcion, setDescripcion] = useState({});

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const [anio, setAnio] = useState(hoy.getFullYear());

  const dispatch = useDispatch();
  useEffect(() => {
    const montoTotal = [];
    const meses = [];
    if (ingresos) {
      ingresos.map((item) => {
        montoTotal.push(item.total);
        meses.push(item.mes);
      });
      const max = {
        maxMonto: 0,
        mes: 0,
      };
      ingresos.map((monto) => {
        if (max.maxMonto === 0) {
          max.maxMonto = monto.total;
          max.mes = monto.mes;
        } else if (max.maxMonto < monto.total) {
          max.maxMonto = monto.total;
          max.mes = monto.mes;
        }
      });
      setDescripcion(max);

      console.log(montoTotal);
      console.log(meses);

      for (var i = 0; i < meses.length; i++) {
        if (meses[i] === 1) {
          meses[i] = "Enero";
        } else if (meses[i] === 2) {
          meses[i] = "Febrero";
        } else if (meses[i] === 3) {
          meses[i] = "Marzo";
        } else if (meses[i] === 4) {
          meses[i] = "Abril";
        } else if (meses[i] === 5) {
          meses[i] = "Mayo";
        } else if (meses[i] === 6) {
          meses[i] = "Junio";
        } else if (meses[i] === 7) {
          meses[i] = "Julio";
        } else if (meses[i] === 8) {
          meses[i] = "Agosto";
        } else if (meses[i] === 9) {
          meses[i] = "Septiembre";
        } else if (meses[i] === 10) {
          meses[i] = "Octubre";
        } else if (meses[i] === 11) {
          meses[i] = "Noviembre";
        } else if (meses[i] === 12) {
          meses[i] = "Diciembre";
        }
      }

      setSeries([
        {
          name: "Ingresos Brutos",
          data: montoTotal,
        },
      ]);
      setOptions({
        chart: {
          type: "bar",
          height: 800,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: meses,
        },
        yaxis: {
          title: {
            text: "Ingresos Brutos",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val;
            },
          },
        },
      });
    } else {
      dispatch(ingresosBrutosPorMes(anio));
    }
  }, [anio, dispatch, ingresos]);

  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "anio") {
      setAnio(value);
    }
  };
  const handleAnio = () => {
    const a = parseInt(anio);
    dispatch(ingresosBrutosPorMes(a));
  };

  const descripcionParrafo = () => (
    <div>
      <p>
        En el grafico se muestra que los ingresos brutos del mes{" "}
        <strong>{descripcion.mes} </strong> del año <strong>{anio} </strong> se
        dio el pico maximo de ventas con un total de ingresos brutos igual a{" "}
        <strong>${descripcion.maxMonto}</strong>
      </p>
    </div>
  );

  const grafico = () => (
    <div>
      {loading ? (
        <LoadinBox></LoadinBox>
      ) : erorr ? (
        <h1>Error al cargar los datos </h1>
      ) : (
        <div>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            width="900"
          />
          {descripcionParrafo()}
        </div>
      )}
    </div>
  );
  const inputAnio = () => (
    <div>
      <label htmlFor="anio">Ingrese Año</label>
      <input
        id="anio"
        value={anio}
        onChange={(event) => imputsChange(event, "anio")}
      />
      <button onClick={() => handleAnio()}>Aceptar</button>
    </div>
  );

  return (
    <div>
      <h1>Ingresos brutos de el año {anio}</h1>
      {inputAnio()}
      {grafico()}
    </div>
  );
};

export default IngresosBrutos;
