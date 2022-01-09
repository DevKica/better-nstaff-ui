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

const SingleMonthlyRate = ({ month, rate, workDays }: { month: string; rate: number; workDays: workDayType[] }) => {
  const [allEarnings, setAllEarnings] = useState(0);
  const [allHours, setAllHours] = useState(0);
  const [allTipInCash, setAllTipInCash] = useState(0);
  useEffect(() => {
    let unmounted = false;
    let allE = 0;
    let allH = 0;
    let allTIC = 0;
    workDays.forEach(e => {
      allE += calculateDayEarnings(e, rate);
      allH += hourDiff(e.startOfWork, e.endOfWork);
      allTIC += e.tipCash;
    });

    if (!unmounted) {
      setAllEarnings(roundTo2Decimals(allE));
      setAllHours(roundTo2Decimals(allH));
      setAllTipInCash(roundTo2Decimals(allTIC));
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
          <Typography>All earnings: {allEarnings}zł</Typography>
          <Typography>Tip in cash: {allTipInCash}zł</Typography>
          <Typography>Hours: {allHours}h</Typography>
        </Box>
      </CardContent>
      <Link to={`/active/monthDetails/${month}`}>
        <CardActions sx={{ textAlign: "center" }}>
          <Button variant="outlined" style={{ margin: "auto" }}>
            go to details
          </Button>
        </CardActions>
      </Link>
    </Card>
  );
};

export default SingleMonthlyRate;
