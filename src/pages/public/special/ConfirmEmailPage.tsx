import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { confirmEmail } from "../../../api/user/authApi";
import { getStoreUserAuth, removeUserData } from "../../../redux/actions/authActions";
import { Grid } from "@material-ui/core";
import ResMessage from "../../../components/globals/ResMessage";
import { Button } from "@material-ui/core";
import AnimatedPage from "../../utils/AnimatedPage";

const EmailConfirmationPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [resMsg, setRespondMsg] = useState<[string] | []>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { isActive } = getStoreUserAuth();

  useEffect(() => {
    if (isActive) return navigate("/");
    (async () => {
      const res = await confirmEmail(token);
      if (!res) return;
      setLoaded(true);
      if (res.data.status !== 200) return setRespondMsg(res.data.message);
      removeUserData();
    })();
  }, [token, isActive, navigate]);
  return (
    <AnimatedPage>
      <div>
        {loaded && (
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            {resMsg.length ? (
              <ResMessage messages={resMsg} />
            ) : (
              `Success, you've confirmed your email. Now you can sign in to your active account!`
            )}
            <Link to={"/public/login"}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#1976d2", color: "white", marginTop: "10px", marginBottom: "10px" }}
              >
                Sign in
              </Button>
            </Link>
          </Grid>
        )}
      </div>
    </AnimatedPage>
  );
};
export default EmailConfirmationPage;
