import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";

//Component Loading
import LoadingBox from "../MenuComponents/LoadingBox";
//Actions
import { getTipoMasVendido } from "../../redux/action/reporteActions";
import ComportamientoMesVarietal from "./ComportamientoMesVarietal";

//Material ui
import MaterialTable from "material-table";
import { Container, Grid } from "@material-ui/core";

const VarietalMasVendidoComponents = () => {
  const tipoMasVendidoState = useSelector((state) => state.tipoMasVendidos);
  const { tipoMasVendio, loading, erorr } = tipoMasVendidoState;

  const [descripcion, setDescripcion] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    const cantidad = [];
    const nombreVarietal = [];
    if (tipoMasVendio) {
      tipoMasVendio.map((tipo) => {
        cantidad.push(tipo.cantidad);
        nombreVarietal.push(tipo.nombreVarietal);
      });
      setGraficoData({
        options: {
          labels: nombreVarietal,
          theme: {
            monochrome: {
              enabled: false,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: "100%",
                },
                legend: {
                  show: false,
                },
              },
            },
          ],
        },
        series: cantidad,
      });
      const probando = () => {
        let probando = {
          max: 0,
          nombre: "",
        };

        tipoMasVendio.map((tipo) => {
          if (probando.max === 0) {
            probando.max = tipo.cantidad;
            probando.nombre = tipo.nombreVarietal;
          } else if (probando.max < tipo.cantidad) {
            probando.max = tipo.cantidad;
            probando.nombre = tipo.nombreVarietal;
          }

          // console.log(probando);
          // if (tipo.cantidad > 0) {
          //   probando.max = tipo.cantidad;
          //   probando.nombre = tipo.nombreVarietal;
          // }
        });
        setDescripcion(probando);
      };
      probando();
    } else {
      dispatch(getTipoMasVendido());
    }
  }, [dispatch, tipoMasVendio]);

  const [graficoData, setGraficoData] = useState({
    options: {
      labels: [],
      theme: {
        monochrome: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              show: false,
            },
          },
        },
      ],
    },
    series: [],
  });

  const columnas = [
    { title: "Nombre Varietal", field: "nombreVarietal" },
    { title: "Cantidad", field: "cantidad" },
  ];

  const analisisDeGrafico = () => (
    <div>
      <p>
        El grafico anterior muestra que de todas las ventas realizadas hasta el
        momento, los productos de tipo varietal:
        <strong> {descripcion.nombre}</strong> son los mas vendidos con un total
        de
        <strong> {descripcion.max}</strong> productos vendidos del mismo tipo.
      </p>
    </div>
  );

  const tabla = () => (
    <Container component="main">
      <Grid container spacing={1}>
        <Grid item xs={6} sm={12}>
          <MaterialTable
            columns={columnas}
            data={tipoMasVendio}
            title="Lista"
            options={{
              actionsColumnIndex: -1,
            }}
            localization={{
              header: {
                actions: "Acciones",
              },
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );

  const grafico = () => (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : erorr ? (
        <h1>Error al cargar los datos</h1>
      ) : (
        <div>
          <ReactApexChart
            options={graficoData.options}
            series={graficoData.series}
            type="pie"
            width="600"
          />
          <div>{tabla()}</div>
          <div>
            <ComportamientoMesVarietal />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1>Varietal mas vendido</h1>
      {grafico()}
      {analisisDeGrafico()}
    </div>
  );
};

export default VarietalMasVendidoComponents;
