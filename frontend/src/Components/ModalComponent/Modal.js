import { Divider, IconButton } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core";

const Modal = ({ title, openModal, children, setOpenModal }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={openModal} fullScreen={fullScreen}>
      <DialogTitle id="">
        <div style={{ display: "flex" }}>
          <Typography
            variant="h5"
            color="primary"
            component="div"
            style={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          <IconButton
            variant="outlined"
            color="secondary"
            onClick={() => setOpenModal(false)}
          >
            <HighlightOffIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
