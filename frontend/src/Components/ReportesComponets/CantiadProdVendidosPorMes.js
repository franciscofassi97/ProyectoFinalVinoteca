import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";

//action
import { cantidadProductosMes } from "../../redux/action/reporteActions";
import LoadingBox from "../MenuComponents/LoadingBox";

const CantiadProdVendidosPorMes = () => {
  const cantProductosMesState = useSelector((state) => state.cantProductosMes);
  const { cantidad, loading, error } = cantProductosMesState;

  const [descripcion, setDescripcion] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    const cantidadProductos = [];
    const meses = [];
    const max = {
      maxProductos: 0,
      mes: 0,
    };
    if (cantidad) {
      cantidad.map((item) => {
        cantidadProductos.push(item.totalCantidad);
        meses.push(item.mes);
        if (max.maxProductos === 0) {
          max.maxProductos = item.totalCantidad;
          max.mes = item.mes;
        } else if (max.maxProductos < item.totalCantidad) {
          max.maxProductos = item.totalCantidad;
          max.mes = item.mes;
        }
      });
      setDescripcion(max);

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

      console.log(cantidadProductos);
      console.log(meses);
      console.log(max);

      setOptions({
        series: [
          {
            name: "Cantidad de productos",
            data: cantidadProductos,
          },
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Cantidad de Productos vendidos por Mes",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: meses,
        },
      });
    } else {
      dispatch(cantidadProductosMes());
    }
  }, [cantidad, dispatch]);

  const [options, setOptions] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  });

  const descripcionParrafo = () => (
    <div>
      <p>
        Del analis del grafico se puede observar que en el mes{" "}
        <strong>{descripcion.mes} </strong>
        se alcanzo el pico maximo de productos vedidos, con un total de{" "}
        <strong>{descripcion.maxProductos} </strong> productos
      </p>
    </div>
  );

  const grafico = () => (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h1>Error al cargar el grafico</h1>
      ) : (
        <div>
          <ReactApexChart
            options={options}
            series={options.series}
            type="line"
            width="900"
          />
          {descripcionParrafo()}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1>Cantidad de productos vendidos por mes </h1>
      {grafico()}
    </div>
  );
};

export default CantiadProdVendidosPorMes;
