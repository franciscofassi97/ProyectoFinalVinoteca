import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="outlined" {...props} />;
}

const ShowAlert = ({ message, severity, setOpenAlert, openAlert }) => {
  const [vertical, setVertical] = useState("bottom");
  const [horizontal, setHorizontal] = useState("right");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={openAlert}
      autoHideDuration={2000}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ShowAlert;
