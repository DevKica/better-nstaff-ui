import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AnimatedPage from "../utils/AnimatedPage";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { CardActionArea } from "@material-ui/core";
import settingsStyles from "../../styles/user/settingsStyles";
import { useState } from "react";
import GeneralInfoDialog from "../../components/user/settings/GeneralInfoDialog";
import EmailDialog from "./../../components/user/settings/EmailDialog";
import PasswordDialog from "./../../components/user/settings/PasswordDialog";
import DeleteAccountDialog from "./../../components/user/settings/DeleteAccountDialog";
import { singleLogout, logoutFromAll } from "../../api/user/authApi";

export type SettingsModalType = "general" | "email" | "password" | "deleteAccount" | "";

const SettingsPage = () => {
  const styles = settingsStyles();
  const [selectedModal, setSelectedModal] = useState<SettingsModalType>("");

  const handleLogoutSingle = async () => {
    await singleLogout();
    window.location.href = `/`;
  };
  const handleLogoutAll = async () => {
    const res = await logoutFromAll();
    if (!res) return;
    window.location.href = `/`;
  };

  return (
    <AnimatedPage>
      <Container maxWidth="sm">
        <Grid container sx={{ mb: 3 }} direction="column" alignItems="center" justifyContent="center">
          <Avatar sx={{ m: "auto", bgcolor: "secondary.main" }}>
            <AdminPanelSettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Settings
          </Typography>
        </Grid>
        <Grid sx={{ my: 4 }} container direction="column">
          <Grid item sx={{ mb: 5 }} onClick={() => setSelectedModal("general")}>
            <CardActionArea>
              <Card className={styles.item}>
                <Typography variant="subtitle1">Change your general info</Typography>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item sx={{ mb: 5 }} onClick={() => setSelectedModal("email")}>
            <CardActionArea>
              <Card className={styles.item}>
                <Typography variant="subtitle1">Change your email</Typography>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item sx={{ mb: 5 }} onClick={() => setSelectedModal("password")}>
            <CardActionArea>
              <Card className={styles.item}>
                <Typography variant="subtitle1">Change your password</Typography>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item sx={{ mb: 5 }} onClick={handleLogoutSingle}>
            <CardActionArea>
              <Card className={styles.item}>
                <Typography variant="subtitle1">Logout</Typography>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item sx={{ mb: 5 }} onClick={handleLogoutAll}>
            <CardActionArea>
              <Card className={styles.item}>
                <Typography variant="subtitle1">Logout from all sessions</Typography>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item onClick={() => setSelectedModal("deleteAccount")}>
            <CardActionArea>
              <Card className={styles.item}>
                <Typography variant="subtitle1">Delete your account</Typography>
              </Card>
            </CardActionArea>
          </Grid>
        </Grid>
        <GeneralInfoDialog setOpen={setSelectedModal} open={selectedModal === "general"} />
        <EmailDialog setOpen={setSelectedModal} open={selectedModal === "email"} />
        <PasswordDialog setOpen={setSelectedModal} open={selectedModal === "password"} />
        <DeleteAccountDialog setOpen={setSelectedModal} open={selectedModal === "deleteAccount"} />
      </Container>
    </AnimatedPage>
  );
};

export default SettingsPage;
