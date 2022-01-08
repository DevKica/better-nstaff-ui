import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { getStoreUserAuth } from "../../redux/actions/authActions";
import PreviewNstaff from "./PreviewNstaff";
import ProfilePage from "./ProfilePage";
const UserRouter = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isActive } = getStoreUserAuth();
  useEffect(() => {
    if (!isAuthenticated) return navigate("/");
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        {!isActive && <Route path="/previewN" element={<PreviewNstaff />} />}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
export default UserRouter;
