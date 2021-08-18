import { Divider, Drawer, makeStyles } from "@material-ui/core";
import MenuListaComponent from "./MenuListaComponent";

const styles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
}));

const Cajon = (props) => {
  const classes = styles();
  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
      variant={props.variant}
      open={props.open}
      onClose={props.onClose ? props.onClose : null}
    >
      <div className={classes.toolbar}></div>
      <Divider />
      <MenuListaComponent />
    </Drawer>
  );
};

export default Cajon;
