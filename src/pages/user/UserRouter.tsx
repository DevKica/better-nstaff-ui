import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { getStoreUserAuth } from "../../redux/actions/authActions";
import PreviewNstaff from "./PreviewNstaff";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";

const UserRouter = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isActive } = getStoreUserAuth();
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
    setLoaded(true);
  }, [isAuthenticated, navigate]);
  return (
    <div>
      {loaded && (
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {!isActive && <Route path="/previewN" element={<PreviewNstaff />} />}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
};
export default UserRouter;
