import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AnimatedPage from "./../utils/AnimatedPage";
import GoogleAndFooter from "../../components/public/GoogleAndFooter";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ResMessage from "../../components/globals/ResMessage";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router";
import { loginUser } from "../../api/user/authApi";
import { setUserData } from "../../redux/actions/authActions";

export default function LoginPage() {
  const navigate = useNavigate();
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [body, changeBody] = useForm({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await loginUser(body);
    if (!res) return;
    if (res.data.status !== 200) return setResMessage(res.data.message);
    setUserData(res.data.message);
    navigate("/");
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              value={body.email}
              onChange={changeBody}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={body.password}
              onChange={changeBody}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign in
            </Button>
          </Box>
          <GoogleAndFooter signIn={true} />
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
        </Box>
      </Container>
    </AnimatedPage>
  );
}
