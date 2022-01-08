import AnimatedPage from "../utils/AnimatedPage";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import { Snackbar, Typography } from "@material-ui/core";
import { useState } from "react";
import welcomeStyles from "./../../styles/public/WelcomeStyles";
import { Alert, AlertColor } from "@mui/material";
import ResMessage from "../../components/globals/ResMessage";
import { resendEmail } from "../../api/user/authApi";

const PreviewNstaff = () => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor | undefined>("success");
  const [resMessage, setResMessage] = useState<string[] | []>(["dsadsaasd"]);
  const styles = welcomeStyles();
  const resendEmailHandler = async () => {
    const res = await resendEmail();
    console.log(res);
    if (!res) return;
    if (res.data.status !== 200) setSeverity("error");
    setResMessage(res.data.message);
    setOpen(true);
  };
  return (
    <AnimatedPage>
      <Card className={styles.container}>
        <CardActionArea>
          <CardHeader title="Confirm your email to access nstaff!"></CardHeader>
          <Typography>If you haven't received any email </Typography>
        </CardActionArea>
        <Button onClick={resendEmailHandler}>Resend confirmation email here</Button>
      </Card>
      <Snackbar style={{ bottom: 100 }} open={open} autoHideDuration={200000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={severity}>
          <ResMessage messages={resMessage} />
        </Alert>
      </Snackbar>
    </AnimatedPage>
  );
};

export default PreviewNstaff;
