import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { workDayType } from "./../../types/nstaff";
import { useState } from "react";
import { useEffect } from "react";
import { calculateDayEarnings, roundTo2Decimals } from "./../../helpers/nstaff";
import { hourDiff } from "./../../helpers/hourDiff";

const SingleMonthlyRate = ({
  month,
  rate,
  workDays,
  setEditId,
  setOpenEdit,
  id,
}: {
  month: string;
  rate: number;
  workDays: workDayType[];
  setEditId: any;
  setOpenEdit: any;
  id: string;
}) => {
  const [TotalEarnings, setTotalEarnings] = useState(0);
  const [TotalHours, setTotalHours] = useState(0);
  const [TotalTipInCash, setTotalTipInCash] = useState(0);
  useEffect(() => {
    let unmounted = false;
    let TotalE = 0;
    let TotalH = 0;
    let TotalTIC = 0;
    workDays.forEach(e => {
      TotalE += calculateDayEarnings(e, rate);
      TotalH += hourDiff(e.startOfWork, e.endOfWork);
      TotalTIC += e.tipCash;
    });

    if (!unmounted) {
      setTotalEarnings(roundTo2Decimals(TotalE));
      setTotalHours(roundTo2Decimals(TotalH));
      setTotalTipInCash(roundTo2Decimals(TotalTIC));
    }
    return () => {
      unmounted = true;
    };
  }, [rate, workDays]);
  return (
    <Card variant="outlined" sx={{ my: 2, width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} gutterBottom>
          {month}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography>Total earnings: {TotalEarnings}zł</Typography>
          <Typography>Total tip in cash: {TotalTipInCash}zł</Typography>
          <Typography>Total Hours: {TotalHours}h</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
        <Link to={`/active/monthDetails/${month}`}>
          <Button variant="outlined" sx={{ mx: 1 }}>
            go to details
          </Button>
        </Link>
        <Button
          variant="outlined"
          sx={{ mx: 1 }}
          onClick={() => {
            setOpenEdit(true);
            setEditId(id);
          }}
        >
          edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default SingleMonthlyRate;
