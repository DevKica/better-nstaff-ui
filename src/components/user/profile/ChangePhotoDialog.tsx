import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomSnackBar from "../../globals/CustomSnackBar";
import { useForm } from "../../../hooks/useForm";
import { AlertColor } from "@mui/material";
import { changeUserProfilePhoto } from "../../../api/user/profileApi";
import { setUserData } from "../../../redux/actions/authActions";

const ChangePhotoDialog = (props: { open: boolean; setOpen: any; setPrivateUser: any }) => {
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [severity, setSeverity] = useState<AlertColor | undefined>("success");
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const closePopUp = () => {
    if (severity === "success") {
      props.setOpen(false);
    }
    setOpenPopUp(false);
  };

  const handleSubmit = async () => {
    if (!file) {
      setResMessage(["Select file"]);
      setSeverity("error");
      setOpenPopUp(true);
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", file, file.name);
    const res = await changeUserProfilePhoto(formData);
    if (!res) return;

    if (res.data.status !== 200) {
      setResMessage(res.data.message);
      setSeverity("error");
    } else {
      setFile(null);
      setResMessage(["Success"]);
      props.setPrivateUser(res.data.message);
      setUserData(res.data.message);
      setSeverity("success");
    }
    setOpenPopUp(true);
  };

  return (
    <Dialog open={props.open} maxWidth="sm">
      <DialogTitle>Change profile photo</DialogTitle>
      <DialogContent>
        <input
          accept="image/png, image/jpeg, image/jpg"
          type="file"
          onChange={e => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>Change</Button>
      </DialogActions>
      <CustomSnackBar openPopUp={openPopUp} resMessage={resMessage} setter={closePopUp} severity={severity} />
    </Dialog>
  );
};

export default ChangePhotoDialog;
