import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { getStoreUserAuth } from "../../redux/actions/authActions";

const ActiveUserRouter = () => {
  const navigate = useNavigate();
  const { isActive } = getStoreUserAuth();
  useEffect(() => {
    if (!isActive) return navigate("/");
  }, [isActive, navigate]);
  return (
    <div>
      <Routes>
        <Route path="/nstaff" element={<div>main</div>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
export default ActiveUserRouter;
