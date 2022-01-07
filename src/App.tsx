import { Navigate, Route, Routes, useLocation } from "react-router";
import MainNavBar from "./components/globals/MainNavBar";
import Redirect from "./pages/utils/Redirect";
import ErrorsRouter from "./pages/utils/errors/ErrorsRouter";
import PublicMainPage from "./pages/public/PublicRouter";
import UserRouter from "./pages/user/UserRouter";
import Footer from "./components/globals/Footer";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const location = useLocation();
  return (
    <div className="container">
      <MainNavBar />
      <main>
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route path="/errors/*" element={<ErrorsRouter />} />

            <Route path="/" element={<Redirect />} />

            <Route path="/public/*" element={<PublicMainPage />} />

            <Route path="/user/*" element={<UserRouter />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default App;
