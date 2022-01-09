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
import { Link } from "react-router-dom";
import { Add as AddIcon } from "@material-ui/icons";
import AddMonhtlyRateDialog from "../../components/nstaff/AddMonthlyRateDialog";

const MainActive = () => {
  const [monthlyRates, setMonthlyRates] = useState<singleMonthlyRate[] | []>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

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
  return (
    <AnimatedPage>
      {loaded && (
        <Container maxWidth="sm">
          <Grid container sx={{ mb: 3 }} direction="column" alignItems="center" justifyContent="center">
            <AddMonhtlyRateDialog open={open} setOpen={setOpen} />
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
                  <SingleMonthlyRate workDays={e.workDays} key={e._id} month={e.month} rate={e.rate} />
                ))
              ) : (
                <Link to="/">
                  <Button variant="outlined" sx={{ p: 2 }}>
                    Add your first month
                  </Button>
                </Link>
              )}
            </Box>
          </Grid>
        </Container>
      )}
    </AnimatedPage>
  );
};

export default MainActive;
