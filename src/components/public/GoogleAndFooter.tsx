import { Box, TextField, Button, Grid, Typography } from "@material-ui/core";
import ResMessage from "../globals/ResMessage";
import { useRef, useState } from "react";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../config/default";
import { Link as RouterLink } from "react-router-dom";

const GoogleAndFooter = (props: { signIn: boolean }) => {
  const { signIn } = props;
  const [googleOpen, setGoogleOpen] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const googleRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    googleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onGoogleSuccess = () => {
    setGoogleOpen(true);
    scrollToBottom();
    setResMessage([""]);
  };
  const handleGoogleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <GoogleLogin
          style={{ left: "50%" }}
          clientId={GOOGLE_CLIENT_ID}
          buttonText={`${signIn ? "Sign in" : "Sign up"} with google`}
          onSuccess={onGoogleSuccess}
          onFailure={() => {}}
        />
      </Grid>
      <Box component="form" onSubmit={handleGoogleSubmit} sx={{ mt: 1 }}>
        {googleOpen && (
          <div ref={googleRef}>
            <ResMessage messages={resMessage} />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
            />{" "}
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="repeatPassword"
              label="Repeat Password"
              type="password"
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#1976d2", color: "white", marginTop: "10px", marginBottom: "10px" }}
            >
              {signIn ? "Sign in" : "Sign up"} WITH GOOGLE
            </Button>
          </div>
        )}
      </Box>
      <RouterLink to="/public/forgotPassword">
        <Grid item xs={12}>
          <Typography style={{ color: "#1976d2", textDecoration: "underline" }}>Forgot password?</Typography>
        </Grid>
      </RouterLink>
      <RouterLink to={signIn ? "/public/signUp" : "/public/login"}>
        <Grid item xs={12}>
          <Typography style={{ color: "#1976d2", textDecoration: "underline" }}>
            {signIn ? "Dont't have an account? Sign Up" : "  Already have an account? Sign in"}
          </Typography>
        </Grid>
      </RouterLink>
    </Grid>
  );
};

export default GoogleAndFooter;
