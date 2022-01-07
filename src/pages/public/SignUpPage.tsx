import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AnimatedPage from "../utils/AnimatedPage";
import GoogleAndFooter from "./../../components/public/GoogleAndFooter";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../../api/user/authApi";
import { setUserData } from "../../redux/actions/authActions";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ResMessage from "../../components/globals/ResMessage";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [body, handleChange] = useForm({
    name: "example",
    surname: "example",
    email: "devKica777@gmail.com",
    password: "password1",
    repeatPassword: "password1",
  });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await registerUser(body);
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={body.email}
              onChange={handleChange}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              label="Name"
              name="name"
              value={body.name}
              onChange={handleChange}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              label="Surname"
              name="surname"
              value={body.surname}
              onChange={handleChange}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={body.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              name="repeatPassword"
              label="Repeat Password"
              type="password"
              autoComplete="new-password"
              value={body.repeatPassword}
              onChange={handleChange}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign up
            </Button>
          </Box>
          <GoogleAndFooter signIn={false} />

          <Snackbar open={!!resMessage.length} autoHideDuration={100000} onClose={() => setResMessage([])}>
            <Alert onClose={() => setResMessage([])} severity="error">
              <ResMessage messages={resMessage} />
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </AnimatedPage>
  );
}
