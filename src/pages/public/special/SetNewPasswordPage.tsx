import { Alert } from "@material-ui/lab";
import ResMessage from "../../../components/globals/ResMessage";
import AnimatedPage from "../../utils/AnimatedPage";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useEffect, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { Container, Box, Typography, TextField, Snackbar } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useParams, useNavigate } from "react-router-dom";
import { setNewPassword, verifyResetPasswordToken } from "../../../api/user/authApi";
import { removeUserData } from "../../../redux/actions/authActions";

const SetNewPasswordPage = () => {
  const { token } = useParams();
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);
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
    if (res.data.status !== 200) return setResMessage(res.data.message);
    removeUserData();
    setResMessage([`Success, you've confirmed your email. Now you can sign in to your active account!`]);
    setSuccess(true);
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
          {!success && (
            <Snackbar
              style={{ bottom: 70 }}
              open={!!resMessage.length}
              autoHideDuration={100000}
              onClose={() => setResMessage([])}
            >
              <Alert onClose={() => setResMessage([])} severity="error">
                <ResMessage messages={resMessage} />
              </Alert>
            </Snackbar>
          )}

          <Snackbar
            style={{ bottom: 70 }}
            open={success}
            autoHideDuration={100000}
            onClose={() => {
              navigate("/public/login");
            }}
          >
            <Alert
              onClose={() => {
                navigate("/public/login");
              }}
              severity="success"
            >
              <ResMessage messages={resMessage} />
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </AnimatedPage>
  );
};

export default SetNewPasswordPage;
