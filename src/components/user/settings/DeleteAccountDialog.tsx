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
import { deleteUserAccount } from "../../../api/user/authApi";

const DeleteAccountDialog = (props: { open: boolean; setOpen: any }) => {
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [severity, setSeverity] = useState<AlertColor | undefined>("success");
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [body, handleChange] = useForm({ password: "" });

  const closePopUp = () => {
    if (severity === "success") {
      props.setOpen("");
    }
    setOpenPopUp(false);
  };

  const handleSubmit = async () => {
    const res = await deleteUserAccount(body);
    if (!res) return;
    setOpenPopUp(true);

    if (res.data.status === 200) {
      setSeverity("success");
      setResMessage(["Success"]);
      window.location.href = `/`;
    } else {
      setResMessage(res.data.message);
      setSeverity("error");
    }
  };

  return (
    <Dialog open={props.open} maxWidth="sm">
      <DialogTitle>Delete your account</DialogTitle>
      <DialogContent>
        <DialogContentText>To delete your account, enter your current password and click delete</DialogContentText>
        <input style={{ display: "none" }} type="text" autoComplete="username" ng-hide="true"></input>
        <TextField
          required
          fullWidth
          margin="dense"
          label="Current password"
          name="password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={body.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen("")}>Cancel</Button>
        <Button color="error" onClick={handleSubmit}>
          Delete
        </Button>
      </DialogActions>
      <CustomSnackBar openPopUp={openPopUp} resMessage={resMessage} setter={closePopUp} severity={severity} />
    </Dialog>
  );
};

export default DeleteAccountDialog;
