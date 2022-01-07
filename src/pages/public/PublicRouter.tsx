import { Navigate, Route, Routes } from "react-router";
import EasterEgg from "./EasterEgg";
import WelcomePage from "./WelcomePage";
import LoginPage from "./LoginPage";

const PublicMainPage = () => {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/easterEgg" element={<EasterEgg />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default PublicMainPage;
