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
import { createMonthlyRate } from "../../api/nstaff/monthlyRatesApi";
import CustomSnackBar from "../globals/CustomSnackBar";

const AddMonhtlyRateDialog = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const initialDate = new Date().toISOString().split("T")[0].slice(0, 7);
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [severity, setSeverity] = useState<AlertColor | undefined>("success");
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [body, handleChange] = useForm({ month: initialDate, rate: 19.7 });

  const closePopUp = () => {
    if (severity === "success") {
      setOpen(false);
    }
    setOpenPopUp(false);
  };

  const handleSubmit = async () => {
    const res = await createMonthlyRate(body);
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
        <DialogTitle>Create new month</DialogTitle>
      </Grid>
      <DialogContent>
        <Grid item sx={{ my: 2 }}>
          <TextField fullWidth label="Month" name="month" type="month" value={body.month} onChange={handleChange} />
        </Grid>
        <Grid item sx={{ my: 2 }}>
          <TextField fullWidth label="rate" name="rate" type="number" value={body.rate} onChange={handleChange} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>Change</Button>
      </DialogActions>
      <CustomSnackBar openPopUp={openPopUp} resMessage={resMessage} setter={closePopUp} severity={severity} />
    </Dialog>
  );
};

export default AddMonhtlyRateDialog;
