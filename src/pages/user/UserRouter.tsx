import { Navigate, Route, Routes } from "react-router";
import ProfilePage from "./ProfilePage";
const UserRouter = () => {
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
