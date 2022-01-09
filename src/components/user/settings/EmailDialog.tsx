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
import { changeEmail } from "../../../api/user/authApi";
import { getStoreUserAuth, setUserData } from "../../../redux/actions/authActions";

const EmailDialog = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [severity, setSeverity] = useState<AlertColor | undefined>("success");
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [body, handleChange] = useForm({ email: "", password: "" });
  const userAuthData: any = getStoreUserAuth();

  const closePopUp = () => {
    if (severity === "success") {
      setOpen("");
    }
    setOpenPopUp(false);
  };

  const handleSubmit = async () => {
    const res = await changeEmail(body);
    if (!res) return;
    setOpenPopUp(true);
    if (res.data.status === 200) {
      if (!userAuthData.isAcitve) {
        setUserData(res.data.message);
      }
      setResMessage(["Success"]);
      setSeverity("success");
    } else {
      setResMessage(res.data.message);
      setSeverity("error");
    }
  };

  return (
    <Dialog open={open} maxWidth="sm">
      <DialogTitle>Change your email</DialogTitle>
      <DialogContent>
        <DialogContentText>To change your email, just enter new email and your current password</DialogContentText>
        <TextField
          margin="dense"
          required
          label="New email"
          name="email"
          fullWidth
          variant="standard"
          value={body.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          required
          type="password"
          label="Confirm password"
          name="password"
          fullWidth
          variant="standard"
          value={body.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen("")}>Cancel</Button>
        <Button onClick={handleSubmit}>Change</Button>
      </DialogActions>
      <CustomSnackBar openPopUp={openPopUp} resMessage={resMessage} setter={closePopUp} severity={severity} />
    </Dialog>
  );
};

export default EmailDialog;
