import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { getStoreUserAuth } from "../../redux/actions/authActions";
import ProfilePage from "./ProfilePage";
const UserRouter = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = getStoreUserAuth();
  useEffect(() => {
    if (!isAuthenticated) return navigate("/");
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
export default UserRouter;
