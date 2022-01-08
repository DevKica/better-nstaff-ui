import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material";
import ResMessage from "./ResMessage";

const CustomSnackBar = (props: {
  resMessage: string[] | [];
  severity: AlertColor | undefined;
  setter: any;
  openPopUp: boolean;
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      style={{ bottom: 70 }}
      open={props.openPopUp}
      autoHideDuration={100000}
      onClose={() => props.setter()}
    >
      <Alert onClose={() => props.setter()} severity={props.severity}>
        <ResMessage messages={props.resMessage} />
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
