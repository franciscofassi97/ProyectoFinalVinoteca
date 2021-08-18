import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import LoadingBox from "../MenuComponents/LoadingBox";
import ReactApexChart from "react-apexcharts";

//Action!
import { comportamientoPorMes } from "../../redux/action/reporteActions";
import { getVarietales } from "../../redux/action/varietalActions";

const ComportamientoMesVarietal = () => {
  const comportamientoPorMesState = useSelector(
    (state) => state.comportamientoPorMes
  );
  const { cantidad, loading, error } = comportamientoPorMesState;

  const [varietalCombo, setVarietalCombo] = useState([]);

  const getVarietaleState = useSelector((state) => state.getVarietal);
  const { varietal } = getVarietaleState;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVarietales());
    const cantidadProductos = [];
    const meses = [];

    if (cantidad) {
      cantidad.map((item) => {
        cantidadProductos.push(item.cantidad);
        meses.push(item.mes);
      });

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
  const onComboChange = (event, comboName) => {
    let value = event.target.value;
    if (comboName === "varietal") {
      setVarietalCombo(value);
    }
  };
  const handleCombo = (_id) => {
    dispatch(comportamientoPorMes(_id));
  };

  const grafico = () => (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <h1>Error al cargar el grafico</h1>
      ) : (
        <div>
          <div>
            <select
              onChange={(event) => onComboChange(event, "varietal")}
              type="text"
            >
              <option value={varietalCombo}>Seleccionar</option>
              {varietal.map((varietal, index) => {
                return (
                  <option
                    key={index}
                    value={varietal._id}
                    onClick={() => handleCombo(varietal._id)}
                  >
                    {varietal.nombreVarietal}
                  </option>
                );
              })}
            </select>
          </div>
          <ReactApexChart
            options={options}
            series={options.series}
            type="line"
            width="900"
          />
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1>{grafico()} </h1>
    </div>
  );
};

export default ComportamientoMesVarietal;
