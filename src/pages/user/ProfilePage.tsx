import AnimatedPage from "../utils/AnimatedPage";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { getStoreUserAuth, setUserData } from "../../redux/actions/authActions";
import { getUserPrivateInfo, getUserProfilePhoto } from "../../api/user/profileApi";
import { userPrivateDataType } from "../../types/user";
import Button from "@mui/material/Button";
import ChangePhotoDialog from "./../../components/user/profile/ChangePhotoDialog";

const ProfilePage = () => {
  const [privateUser, setPrivateUser] = useState<userPrivateDataType | null>(null);
  const { isActive } = getStoreUserAuth();
  const [edit, setEdit] = useState<boolean>(false);

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
        <Container maxWidth="sm">
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              boxShadow: "0px 4px 12px 2px rgba(66, 68, 90, 1)",
            }}
          >
            <CardContent>
              <Avatar
                sx={{ mx: "auto", my: 2, bgcolor: "secondary.main", width: 140, height: 140 }}
                src={getUserProfilePhoto("large", privateUser.profilePhotoPath)}
                style={{ border: "0.2px black solid" }}
              />
              <Button onClick={() => setEdit(true)}>Change profile photo</Button>
              <Typography component="h1" variant="h4" sx={{ my: 2 }}>
                {privateUser.surname} {privateUser.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                email: {privateUser.email}{" "}
                {!isActive && (
                  <Typography component="div" variant="subtitle1" gutterBottom>
                    ( Please confirm it !!! )
                  </Typography>
                )}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                updated at: {privateUser.updatedAt.replace("T", " ").slice(0, 19)}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                created at: {privateUser.createdAt.replace("T", " ").slice(0, 19)}
              </Typography>
            </CardContent>
          </Card>
          <ChangePhotoDialog
            setPrivateUser={(data: any) =>
              setPrivateUser({ ...data, updatedAt: privateUser.updatedAt, createdAt: privateUser.createdAt })
            }
            open={edit}
            setOpen={setEdit}
          />
        </Container>
      )}
    </AnimatedPage>
  );
};

export default ProfilePage;
