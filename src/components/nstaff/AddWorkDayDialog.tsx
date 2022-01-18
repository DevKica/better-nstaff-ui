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
import CustomSnackBar from "../globals/CustomSnackBar";
import { createWorkDay } from "./../../api/nstaff/workDaysApi";

export const getDaysInMonth = (month: string, year: string) => {
  return new Date(parseInt(year), parseInt(month), 0).getDate();
};

const AddWorkDayDialog = ({ open, setOpen, month }: { open: boolean; setOpen: any; month: string | undefined }) => {
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [severity, setSeverity] = useState<AlertColor | undefined>("success");
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [body, handleChange] = useForm({
    date: `${month}-01`,
    startOfWork: "14:30",
    endOfWork: "22:30",
    tipCash: "0",
    tipCard: "0",
    receipts: "0",
  });

  const closePopUp = () => {
    if (severity === "success") {
      setOpen(false);
    }
    setOpenPopUp(false);
  };

  const handleSubmit = async () => {
    const res = await createWorkDay(body);
    if (!res) return;

    if (res.data.status === 200) {
      setSeverity("success");
      window.location.reload();
    } else {
      setSeverity("error");
    }
    setResMessage(res.data.message);
    setOpenPopUp(true);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      sx={{
        textAlign: "center",
      }}
    >
      <DialogTitle>Create new day</DialogTitle>
      <DialogContent>
        <Grid item sx={{ my: 2 }}>
          {month && (
            <TextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              InputProps={{
                inputProps: {
                  min: `${month}-01`,
                  max: `${month}-${getDaysInMonth(month.split("-")[1], month.split("-")[0])}`,
                },
              }}
              value={body.date}
              onChange={handleChange}
            />
          )}
        </Grid>
        <Grid item sx={{ my: 2 }}>
          <TextField
            fullWidth
            label="Start of work"
            name="startOfWork"
            type="time"
            value={body.startOfWork}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={{ my: 2 }}>
          <TextField
            fullWidth
            label="End of work"
            name="endOfWork"
            type="time"
            value={body.endOfWork}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={{ my: 2 }}>
          <TextField
            fullWidth
            label="Tip on cash"
            name="tipCash"
            type="number"
            value={body.tipCash}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={{ my: 2 }}>
          <TextField
            fullWidth
            label="Tip on card"
            name="tipCard"
            type="number"
            value={body.tipCard}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={{ my: 2 }}>
          <TextField
            fullWidth
            label="Receipts"
            name="receipts"
            type="number"
            value={body.receipts}
            onChange={handleChange}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
      <CustomSnackBar openPopUp={openPopUp} resMessage={resMessage} setter={closePopUp} severity={severity} />
    </Dialog>
  );
};

export default AddWorkDayDialog;
