import AnimatedPage from "../utils/AnimatedPage";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { CardActionArea } from "@material-ui/core";
import settingsStyles from "../../styles/user/settingsStyles";
import { useEffect, useState } from "react";
import GeneralInfoDialog from "../../components/user/settings/GeneralInfoDialog";
import EmailDialog from "./../../components/user/settings/EmailDialog";
import PasswordDialog from "./../../components/user/settings/PasswordDialog";
import DeleteAccountDialog from "./../../components/user/settings/DeleteAccountDialog";
import { getStoreUserAuth, setUserData } from "../../redux/actions/authActions";
import { getUserPrivateInfo, getUserProfilePhoto } from "../../api/user/profileApi";
import { userPrivateDataType } from "../../types/user";

const ProfilePage = () => {
  const [resMessage, setResMessage] = useState<string[] | []>([]);
  const [privateUser, setPrivateUser] = useState<userPrivateDataType | null>(null);
  const { isActive } = getStoreUserAuth();

  useEffect(() => {
    (async () => {
      const res = await getUserPrivateInfo();
      if (!res) return;
      setPrivateUser(res.data.message);
      setUserData(res.data.message);
    })();
  }, []);
  return (
    <AnimatedPage>
      {privateUser && (
        <>
          <Grid
            container
            sx={{ mb: 3 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ textAlign: "center" }}
          >
            <Grid item>
              <Avatar
                sx={{ m: "auto", bgcolor: "secondary.main", width: 140, height: 140 }}
                src={getUserProfilePhoto("large", privateUser.profilePhotoPath)}
              />
            </Grid>
            <Grid item sx={{ my: 4 }}>
              <Typography component="h1" variant="h3">
                {privateUser.name} {privateUser.surname}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h6">
                email: {privateUser.email}{" "}
                {isActive && (
                  <Typography component="div" variant="subtitle1" gutterBottom>
                    ( Please confirm it !!! )
                  </Typography>
                )}
              </Typography>

              <Typography variant="h6" gutterBottom>
                updated at: {privateUser.updatedAt.replace("T", " ").slice(0, 19)}
              </Typography>
              <Typography variant="h6" gutterBottom>
                created at: {privateUser.createdAt.replace("T", " ").slice(0, 19)}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </AnimatedPage>
  );
};

export default ProfilePage;
