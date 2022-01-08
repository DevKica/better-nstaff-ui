import { getStoreUserAuth } from "../../redux/actions/authActions";
import AnimatedPage from "../utils/AnimatedPage";

const ProfilePage = () => {
  const user = getStoreUserAuth();
  return (
    <AnimatedPage>
      <div>
        ProfilePage
        <p>{JSON.stringify(user)}</p>
      </div>
    </AnimatedPage>
  );
};

export default ProfilePage;
