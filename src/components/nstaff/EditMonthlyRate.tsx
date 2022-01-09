import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertColor } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { updateMonthlyRate } from "../../api/nstaff/monthlyRatesApi";
import CustomSnackBar from "../globals/CustomSnackBar";

const EditMonthlyRateDialog = ({ open, setOpen, monthlyRate }: { open: boolean; setOpen: any; monthlyRate: any }) => {
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [severity, setSeverity] = useState<AlertColor | undefined>("success");
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [body, handleChange] = useForm({ rate: monthlyRate.rate });

  const closePopUp = () => {
    if (severity === "success") {
      setOpen(false);
      window.location.reload();
    }
    setOpenPopUp(false);
  };

  const handleSubmit = async () => {
    const res = await updateMonthlyRate(body, monthlyRate._id);
    if (!res) return;
    if (res.data.status === 200) {
      setSeverity("success");
    } else {
      setSeverity("error");
    }
    setResMessage(res.data.message);
    setOpenPopUp(true);
  };

  return (
    <Dialog
      maxWidth="sm"
      open={open}
      sx={{
        textAlign: "center",
      }}
    >
      <Grid item>
        <DialogTitle>Update your rate for {monthlyRate.month}</DialogTitle>
      </Grid>
      <DialogContent>
        <Grid item sx={{ my: 2 }}>
          <TextField fullWidth disabled label="Month" name="month" type="month" value={monthlyRate.month} />
        </Grid>
        <Grid item sx={{ my: 2 }}>
          <TextField fullWidth label="rate" name="rate" type="number" value={body.rate} onChange={handleChange} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogActions>
      <CustomSnackBar openPopUp={openPopUp} resMessage={resMessage} setter={closePopUp} severity={severity} />
    </Dialog>
  );
};

export default EditMonthlyRateDialog;
