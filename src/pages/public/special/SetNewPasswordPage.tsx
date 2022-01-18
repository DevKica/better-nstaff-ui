import AnimatedPage from "../../utils/AnimatedPage";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useEffect, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { Container, Box, Typography, TextField } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { setNewPassword, verifyResetPasswordToken } from "../../../api/user/authApi";
import CustomSnackBar from "../../../components/globals/CustomSnackBar";
import { AlertColor } from "@mui/material";

const SetNewPasswordPage = () => {
  const { token } = useParams();
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [severity, setSeverity] = useState<AlertColor | undefined>("error");
  const [open, setOpen] = useState<boolean>(false);
  const [body, changeBody] = useForm({ password: "password2", repeatPassword: "password2" });
  useEffect(() => {
    (async () => {
      const res = await verifyResetPasswordToken(token);
      if (!res) return;
    })();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await setNewPassword(token, body);
    if (!res) return;
    if (res.data.status !== 200) {
      setSeverity("error");
      setResMessage(res.data.message);
    } else {
      setSeverity("success");
      setResMessage([`Success, you've created new password, now you can log in`]);
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
            Create new password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
              value={body.password}
              onChange={changeBody}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="repeatPassword"
              label="Repeat Password"
              type="password"
              autoComplete="off"
              value={body.repeatPassword}
              onChange={changeBody}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              submit
            </Button>
          </Box>
          <CustomSnackBar
            openPopUp={open}
            resMessage={resMessage}
            setter={() => {
              if (severity === "success") {
                window.location.href = `/public/login`;
              }
              setOpen(false);
            }}
            severity={severity}
          />
        </Box>
      </Container>
    </AnimatedPage>
  );
};

export default SetNewPasswordPage;
