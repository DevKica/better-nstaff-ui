import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { getStoreUserAuth } from "../../redux/actions/authActions";

const ActiveUserRouter = () => {
  const navigate = useNavigate();
  const { isActive } = getStoreUserAuth();
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!isActive) return navigate("/");
    setLoaded(true);
  }, [isActive, navigate]);
  return (
    <div>
      {loaded && (
        <Routes>
          <Route path="/nstaff" element={<div>main</div>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
};
export default ActiveUserRouter;
