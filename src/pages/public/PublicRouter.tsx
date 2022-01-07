import { Navigate, Route, Routes, useNavigate } from "react-router";
import EasterEgg from "./EasterEgg";
import WelcomePage from "./WelcomePage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import { getStoreUserAuth } from "../../redux/actions/authActions";
import { useEffect } from "react";

const PublicMainPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = getStoreUserAuth();
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/easterEgg" element={<EasterEgg />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default PublicMainPage;
