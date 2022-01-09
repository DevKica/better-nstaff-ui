import AnimatedPage from "../utils/AnimatedPage";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import SingleMonthlyRate from "../../components/nstaff/SingleMonth";
import { useState, useEffect } from "react";
import { getAllMonthlyRates } from "../../api/nstaff/monthlyRatesApi";
import { singleMonthlyRate } from "../../types/nstaff";
import Button from "@mui/material/Button";
import { Add as AddIcon } from "@material-ui/icons";
import AddMonhtlyRateDialog from "../../components/nstaff/AddMonthlyRateDialog";
import EditMonthlyRateDialog from "./../../components/nstaff/EditMonthlyRate";

const MainActive = () => {
  const [monthlyRates, setMonthlyRates] = useState<singleMonthlyRate[] | []>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const res = await getAllMonthlyRates();
      if (!res) return;
      if (!unmounted) {
        setMonthlyRates(res.data.message);
        setLoaded(true);
      }
    })();
    return () => {
      unmounted = true;
    };
  }, []);

  const edited = [...monthlyRates.filter(e => e._id === editId)][0];

  return (
    <AnimatedPage>
      {loaded && (
        <Container maxWidth="sm">
          <Grid container sx={{ mb: 3 }} direction="column" alignItems="center" justifyContent="center">
            <AddMonhtlyRateDialog open={open} setOpen={setOpen} />
            {edited && <EditMonthlyRateDialog monthlyRate={edited} open={openEdit} setOpen={setOpenEdit} />}

            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <DateRangeIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Nstaff - Control your incomes (expenses too pls)
            </Typography>
            <Box sx={{ position: "relative", width: "100%", mt: 2 }}>
              {monthlyRates.length ? (
                <Tooltip
                  title="Add month"
                  aria-label="Add month"
                  style={{ position: "absolute", top: 0, right: -5 }}
                  onClick={() => setOpen(true)}
                >
                  <Fab color="primary">
                    <AddIcon />
                  </Fab>
                </Tooltip>
              ) : (
                ""
              )}
              {monthlyRates.length ? (
                monthlyRates.map(e => (
                  <SingleMonthlyRate
                    setEditId={setEditId}
                    setOpenEdit={setOpenEdit}
                    workDays={e.workDays}
                    key={e._id}
                    id={e._id}
                    month={e.month}
                    rate={e.rate}
                  />
                ))
              ) : (
                <Button variant="outlined" sx={{ p: 2 }} onClick={() => setOpen(true)}>
                  Add your first month
                </Button>
              )}
            </Box>
          </Grid>
        </Container>
      )}
    </AnimatedPage>
  );
};

export default MainActive;
