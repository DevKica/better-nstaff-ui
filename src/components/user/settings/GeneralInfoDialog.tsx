import { useState } from "react";
import { AlertColor } from "@mui/material";
import CustomSnackBar from "../../globals/CustomSnackBar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { userDataType } from "./../../../types/user";
import { getStoreUserAuthData, setUserData } from "./../../../redux/actions/authActions";
import { useForm } from "../../../hooks/useForm";
import { changeUserGeneralInfo } from "../../../api/user/profileApi";

const GeneralInfoDialog = (props: { open: boolean; setOpen: any }) => {
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [severity, setSeverity] = useState<AlertColor | undefined>("success");
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const authData: userDataType = getStoreUserAuthData();
  const [body, handleChange] = useForm({ name: authData.name, surname: authData.surname });

  const closePopUp = () => {
    if (severity === "success") {
      props.setOpen("");
    }
    setOpenPopUp(false);
  };

  const handleSubmit = async () => {
    const res = await changeUserGeneralInfo(body);
    if (!res) return;
    setOpenPopUp(true);
    if (res.data.status === 200) {
      setSeverity("success");
      setUserData(res.data.message);
      setResMessage(["Success"]);
    } else {
      setResMessage(res.data.message);
      setSeverity("error");
    }
  };

  return (
    <Dialog open={props.open} maxWidth="sm">
      <DialogTitle>Change your general info</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To change your general information, just enter new details and click change
        </DialogContentText>
        <TextField
          required
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          variant="standard"
          value={body.name}
          onChange={handleChange}
        />
        <TextField
          required
          margin="dense"
          label="Surname"
          name="surname"
          fullWidth
          variant="standard"
          value={body.surname}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen("")}>Cancel</Button>
        <Button onClick={handleSubmit}>Change</Button>
      </DialogActions>
      <CustomSnackBar openPopUp={openPopUp} resMessage={resMessage} setter={closePopUp} severity={severity} />
    </Dialog>
  );
};

export default GeneralInfoDialog;
