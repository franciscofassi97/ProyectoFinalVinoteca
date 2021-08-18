import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button, Paper, Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    padding: 2,
  },
  box: {
    width: "100%",
    backgroundColor: theme.palette.primary.light,
  },

  item: { width: "100%", backgroundColor: theme.palette.primary.main },
  butonn: {
    margin: 2,
    width: "100%",
    color: "white",
  },
}));

const ProbandoForm = () => {
  const classes = useStyles();

  const barraAcciones = () => (
    <Grid container spacing={8} className={classes.paper}>
      <Grid item xs={4}>
        <Box bgcolor="primary.main" className={classes.box}>
          <Paper className={classes.item}>
            <Button className={classes.butonn}>Ver Bodegas</Button>
          </Paper>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box bgcolor="primary.main"></Box>
      </Grid>

      <Grid item xs={4}>
        <Box bgcolor="primary.main"></Box>
      </Grid>
    </Grid>
  );

  return <div>{barraAcciones()}</div>;
};

export default ProbandoForm;
