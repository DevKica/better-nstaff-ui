import { Box, TextField, Grid, Typography, Snackbar } from "@material-ui/core";
import ResMessage from "../globals/ResMessage";
import { useRef, useState } from "react";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../config/default";
import { Link as RouterLink } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { useForm } from "../../hooks/useForm";
import { googleLogin, googleRegister } from "../../api/user/authApi";
import { GOOGLE_REGISTER } from "../../helpers/errors/errorMessages";
import { setUserData } from "../../redux/actions/authActions";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import AnimatedPage from "../../pages/utils/AnimatedPage";

const GoogleAndFooter = (props: { signIn: boolean }) => {
  const navigate = useNavigate();

  const { signIn } = props;
  const googleRef = useRef<HTMLDivElement>(null);

  const [googleOpen, setGoogleOpen] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [googleToken, setGoogleToken] = useState<string>("");
  const [passwords, setPasswords] = useForm({ password: "password1", repeatPassword: "password1" });

  const scrollToBottom = () => {
    googleRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const onGoogleSuccess = async (resGoogle: any) => {
    setGoogleToken(resGoogle.tokenId);

    const res = await googleLogin(resGoogle.tokenId);
    if (!res) return;
    if (res.data.status === 200) {
      setUserData(res.data.message);
      navigate("/");
      return;
    }
    if (res.data.message[0] === GOOGLE_REGISTER.message[0]) {
      setGoogleOpen(true);
      scrollToBottom();
    }
    setResMessage(res.data.message);
  };
  const onGoogleFailure = () => {
    // setResMessage(["Someting went wrong with google, try again later"]);
  };
  const handleGoogleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await googleRegister(googleToken, passwords);
    if (!res) return;
    if (res.data.status !== 200) return setResMessage(res.data.message);
    setUserData(res.data.message);
    navigate("/");
  };

  return (
    <AnimatedPage>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <GoogleLogin
            style={{ left: "50%" }}
            clientId={GOOGLE_CLIENT_ID}
            buttonText={`${signIn ? "Sign in" : "Sign up"} with google`}
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
          />
        </Grid>
        <Box component="form" onSubmit={handleGoogleSubmit} sx={{ mt: 1 }}>
          {googleOpen && (
            <div ref={googleRef}>
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="off"
                value={passwords.password}
                onChange={setPasswords}
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
                value={passwords.repeatPassword}
                onChange={setPasswords}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {signIn ? "Sign in" : "Sign up"} WITH GOOGLE
              </Button>
            </div>
          )}
        </Box>
        <RouterLink to="/special/forgotPassword">
          <Grid item xs={12}>
            <Typography style={{ color: "#1976d2" }}>Forgot password?</Typography>
          </Grid>
        </RouterLink>
        <RouterLink to={signIn ? "/public/signUp" : "/public/login"}>
          <Grid item xs={12}>
            <Typography style={{ color: "#1976d2" }}>
              {signIn ? "Dont't have an account? Sign Up" : "  Already have an account? Sign in"}
            </Typography>
          </Grid>
        </RouterLink>
        <Snackbar open={!!resMessage.length} autoHideDuration={100000} onClose={() => setResMessage([])}>
          <Alert onClose={() => setResMessage([])} severity="error">
            <ResMessage messages={resMessage} />
          </Alert>
        </Snackbar>
      </Grid>
    </AnimatedPage>
  );
};

export default GoogleAndFooter;
