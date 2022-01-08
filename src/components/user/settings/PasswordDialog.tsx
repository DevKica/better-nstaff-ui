import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CustomSnackBar from "../../globals/CustomSnackBar";
import { useForm } from "../../../hooks/useForm";
import { AlertColor } from "@mui/material";
import { changePassword } from "../../../api/user/authApi";

const PasswordDialog = (props: { open: boolean; setOpen: any }) => {
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [severity, setSeverity] = useState<AlertColor | undefined>("success");
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [body, handleChange] = useForm({ oldPassword: "", password: "", repeatPassword: "" });

  const closePopUp = () => {
    if (severity === "success") {
      props.setOpen("");
    }
    setOpenPopUp(false);
  };

  const handleSubmit = async () => {
    const res = await changePassword(body);
    if (!res) return;
    setOpenPopUp(true);
    setResMessage(res.data.message);
    if (res.data.status === 200) {
      setSeverity("success");
    } else {
      setSeverity("error");
    }
  };

  return (
    <Dialog open={props.open} maxWidth="sm">
      <DialogTitle>Change your password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To change your password, enter your old password and new password (and repetition of it)
        </DialogContentText>
        <TextField
          margin="dense"
          required
          label="Old password"
          name="oldPassword"
          type="password"
          fullWidth
          variant="standard"
          value={body.oldPassword}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          required
          label="New password"
          name="password"
          type="password"
          fullWidth
          variant="standard"
          value={body.password}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          required
          label="Repeat your new password"
          name="repeatPassword"
          type="password"
          fullWidth
          variant="standard"
          value={body.repeatPassword}
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

export default PasswordDialog;
