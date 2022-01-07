import { Navigate, Route, Routes } from "react-router";
import EasterEgg from "./EasterEgg";
import WelcomePage from "./WelcomePage";

const PublicMainPage = () => {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/easterEgg" element={<EasterEgg />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default PublicMainPage;
