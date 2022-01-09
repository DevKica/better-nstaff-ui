import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMonthlyRate } from "../../api/nstaff/monthlyRatesApi";
import { getAllWorkDays } from "../../api/nstaff/workDaysApi";
import { hourDiff } from "../../helpers/hourDiff";
import { calculateDayEarnings } from "../../helpers/nstaff";
import { workDayType } from "../../types/nstaff";
import AnimatedPage from "../utils/AnimatedPage";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import { cardTipTax } from "../../constants/taxes";
import { Add } from "@material-ui/icons";
import { taxToKitchen } from "./../../constants/taxes";
import AddWorkDayDialog from "../../components/nstaff/AddWorkDayDialog";

const SingleMonthPage = () => {
  const { month } = useParams();
  const [rate, setRate] = useState(0);
  const [allEarnings, setAllEarnings] = useState(0);
  const [allHours, setAllHours] = useState(0);
  const [allTipCash, setAllTipCash] = useState(0);
  const [allTipCard, setAllTipCard] = useState(0);
  const [allReceipts, setAllReceipts] = useState(0);
  const [days, setDays] = useState<workDayType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const res1 = await getSingleMonthlyRate(month);
      if (!res1) {
        unmounted = true;
        return;
      }

      const res = await getAllWorkDays(month);
      if (!res) {
        unmounted = true;
        return;
      }

      if (!unmounted) {
        setRate(res1.data.message.rate);
        setDays(res.data.message);
      }

      let allE = 0;
      let allH = 0;
      let allTIC = 0;
      let allTCC = 0;
      let allR = 0;

      if (!unmounted) {
        res.data.message.forEach((e: workDayType) => {
          allE += calculateDayEarnings(e, rate);
          allH += hourDiff(e.startOfWork, e.endOfWork);
          allTIC += e.tipCash;
          allTCC += e.tipCard;
          allR += e.receipts;
        });
      }

      if (!unmounted) {
        setAllEarnings(Math.round(allE * 100) / 100);
        setAllHours(Math.round(allH * 100) / 100);
        setAllTipCash(Math.round(allTIC * 100) / 100);
        setAllTipCard(Math.round(allTCC * 100) / 100);
        setAllReceipts(Math.round(allR * 100) / 100);
      }
    })();
    return () => {
      unmounted = true;
    };
  }, [month, rate]);

  return (
    <AnimatedPage>
      <Container maxWidth="sm">
        <Box sx={{ width: "100%", position: "relative", fontSize: "2rem !important" }}>
          <Tooltip
            title="Add day"
            aria-label="Add day"
            style={{ position: "absolute", bottom: -10, right: -20, zIndex: 10 }}
            onClick={() => setOpen(true)}
          >
            <Fab color="primary">
              <Add />
            </Fab>
          </Tooltip>
          <Card variant="outlined" sx={{ my: 2, position: "relative" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Month: {month}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: "20px" }}>
                <Typography>All earnings: {allEarnings}zł</Typography>
                <Typography>All tip in cash: {allTipCash}zł</Typography>
                <Typography>Salary: {Math.round((allEarnings - allTipCash) * 100) / 100}zł</Typography>
                <Typography>
                  All tip on card: {allTipCard * cardTipTax}zł ( before tax: {allTipCard}zł)
                </Typography>
                <Typography>
                  All receipts: {allReceipts}zł ( tax to kitchen: {taxToKitchen * allReceipts}zł)
                </Typography>
                <Typography>All hours: {allHours}h</Typography>
                <Typography>Rate: {rate}zł/h</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        {days.length ? (
          days.map(e => (
            <Card key={e._id} variant="outlined" sx={{ my: 2, width: "100%", position: "relative" }}>
              <CardContent>
                <Typography sx={{ fontSize: 18 }} gutterBottom>
                  Day: {e.day}
                </Typography>
                <Typography>Earnings: {calculateDayEarnings(e, rate)}zł</Typography>
                <Typography>Tip in cash: {e.tipCash}zł</Typography>
                <Typography>
                  Tip on card: {e.tipCard * cardTipTax}zł ( before tax: {e.tipCard}zł )
                </Typography>
                <Typography>
                  Receipts: {e.receipts}zł (tax to kitchen: {taxToKitchen * e.receipts}zł)
                </Typography>
                <Typography>Hours: {hourDiff(e.startOfWork, e.endOfWork)}h</Typography>
                <CardActions sx={{ textAlign: "center" }}>
                  <Button variant="outlined" style={{ margin: "auto" }}>
                    edit
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))
        ) : (
          <Button variant="outlined" sx={{ p: 2, width: "100%" }} onClick={() => setOpen(true)}>
            Add some days
          </Button>
        )}
        <AddWorkDayDialog month={month} open={open} setOpen={setOpen} />
      </Container>
    </AnimatedPage>
  );
};

export default SingleMonthPage;
