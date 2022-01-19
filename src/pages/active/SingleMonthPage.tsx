import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMonthlyRate } from "../../api/nstaff/monthlyRatesApi";
import { deleteWorkDay, getAllWorkDays } from "../../api/nstaff/workDaysApi";
import { hourDiff } from "../../helpers/hourDiff";
import { calculateDayEarnings, roundTo2Decimals } from "../../helpers/nstaff";
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
import EditWorkDayDialog from "../../components/nstaff/EditMonthlyRateDialog";

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
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [loaded, setLoaded] = useState(false);

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
        setAllEarnings(roundTo2Decimals(allE));
        setAllHours(roundTo2Decimals(allH));
        setAllTipCash(roundTo2Decimals(allTIC));
        setAllTipCard(roundTo2Decimals(allTCC));
        setAllReceipts(roundTo2Decimals(allR));
      }
      if (!unmounted) {
        setLoaded(true);
      }
    })();
    return () => {
      unmounted = true;
    };
  }, [month, rate]);

  const edited = [...days.filter(e => e._id === editId)][0];

  const handleDelete = async (id: string) => {
    const res = await deleteWorkDay(id);
    if (!res) return;

    setDays(prev => prev.filter(e => e._id !== id));
  };

  return (
    <AnimatedPage>
      {loaded && (
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
                  <Typography>Salary: {roundTo2Decimals(allEarnings - allTipCash)}zł</Typography>
                  <Typography>
                    All tip on card: {roundTo2Decimals(allTipCard * cardTipTax)}zł ( before tax: {allTipCard}zł)
                  </Typography>
                  <Typography>
                    All receipts: {allReceipts}zł ( tax to kitchen: {roundTo2Decimals(taxToKitchen * allReceipts)}zł)
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
                  <Typography>Tip in cash: {roundTo2Decimals(e.tipCash)}zł</Typography>
                  <Typography>
                    Tip on card: {roundTo2Decimals(e.tipCard * cardTipTax)}zł ( before tax: {e.tipCard}zł )
                  </Typography>
                  <Typography>
                    Receipts: {e.receipts}zł (tax to kitchen: {roundTo2Decimals(taxToKitchen * e.receipts)}zł)
                  </Typography>
                  <Typography>Hours: {hourDiff(e.startOfWork, e.endOfWork)}h</Typography>
                  <CardActions sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setEditId(e._id);
                        setOpenEdit(true);
                      }}
                    >
                      edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(e._id)}>
                      delete
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
          {edited && <EditWorkDayDialog workDayToEdit={edited} month={month} open={openEdit} setOpen={setOpenEdit} />}
        </Container>
      )}
    </AnimatedPage>
  );
};

export default SingleMonthPage;
