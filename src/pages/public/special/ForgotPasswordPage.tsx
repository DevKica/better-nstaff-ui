import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useState } from "react";
import { Container, Box, Typography, TextField } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AnimatedPage from "../../utils/AnimatedPage";
import CustomSnackBar from "../../../components/globals/CustomSnackBar";
import { AlertColor } from "@mui/material";
import { useForm } from "../../../hooks/useForm";
import { resetPassword } from "../../../api/user/authApi";

const ForgotPasswordPage = () => {
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [severity, setSeverity] = useState<AlertColor | undefined>("success");
  const [open, setOpen] = useState<boolean>(false);
  const [body, changeBody] = useForm({ email: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await resetPassword(body);
    if (!res) return;
    if (res.data.status !== 200) {
      setSeverity("error");
      setResMessage(res.data.message);
    } else {
      setSeverity("success");
      setResMessage([`Success, check your email`]);
    }
    setOpen(true);
  };
  return (
    <AnimatedPage>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset your password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Your email"
              autoComplete="off"
              value={body.password}
              onChange={changeBody}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              submit
            </Button>
          </Box>
          <CustomSnackBar openPopUp={open} resMessage={resMessage} setter={() => setOpen(false)} severity={severity} />
        </Box>
      </Container>
    </AnimatedPage>
  );
};

export default ForgotPasswordPage;
