import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { getStoreUserAuth } from "../../redux/actions/authActions";
import MainActive from "./MainAcitve";
import SingleMonthPage from "./SingleMonthPage";

const ActiveUserRouter = () => {
  const navigate = useNavigate();
  const { isActive } = getStoreUserAuth();
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!isActive) {
      return navigate("/");
    } else {
      setLoaded(true);
    }
  }, [isActive, navigate]);
  return (
    <Routes>
      {loaded && (
        <>
          <Route path="/nstaff" element={<MainActive />} />
          <Route path="/monthDetails/:month" element={<SingleMonthPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
export default ActiveUserRouter;
