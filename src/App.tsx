import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import MainNavBar from "./components/globals/MainNavBar";
import Redirect from "./pages/utils/Redirect";
import ErrorsRouter from "./pages/utils/errors/ErrorsRouter";
import PublicMainPage from "./pages/public/PublicRouter";
import UserRouter from "./pages/user/UserRouter";
import Footer from "./components/globals/Footer";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deepAuthActiveUser, getUserData } from "./api/user/authApi";
import { CONFIRM_EMAIL } from "./helpers/errors/errorMessages";
import { getUserDataLocalStorage } from "./helpers/localStorage";
import { AUTH } from "./redux/actionTypes/auth";
import { stateType } from "./redux/reducers/mainReducer";
import { CssBaseline } from "@material-ui/core";
import ActiveUserRouter from "./pages/active/ActiveUserRouter";
import EmailConfirmationPage from "./pages/public/special/ConfirmEmailPage";
import SetNewPasswordPage from "./pages/public/special/SetNewPasswordPage";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loaded, setIsLoaded] = useState(false);
  const { isAuthenticated } = useSelector((state: stateType) => state.auth);
  useEffect(() => {
    (async () => {
      if (isAuthenticated === null) {
        try {
          const authenticationResult = await deepAuthActiveUser();
          const resActive = authenticationResult.data.status === 200;
          if (resActive || authenticationResult.data.message[0] === CONFIRM_EMAIL.message[0]) {
            const user = getUserDataLocalStorage();
            if (user) {
              if (resActive) {
                dispatch({ type: AUTH.SET_ACTIVE_USER, payload: JSON.parse(user) });
              } else {
                dispatch({ type: AUTH.SET_USER, payload: JSON.parse(user) });
              }
            } else {
              const { data } = await getUserData();
              if (resActive) {
                dispatch({ type: AUTH.SET_ACTIVE_USER, payload: data.message });
              } else {
                dispatch({ type: AUTH.SET_USER, payload: data.message });
              }
            }
          } else {
            dispatch({ type: AUTH.REMOVE_USER });
          }
        } catch (e) {
          dispatch({ type: AUTH.REMOVE_USER });
          navigate("/errors/network");
        }
      }
      setIsLoaded(true);
    })();
  }, [location, dispatch, isAuthenticated, navigate]);
  return (
    <div className="container">
      <CssBaseline />
      {loaded && (
        <>
          <MainNavBar />
          <main>
            <AnimatePresence exitBeforeEnter>
              <Routes key={location.pathname} location={location}>
                <Route path="/special/confirmEmail/:token" element={<EmailConfirmationPage />} />
                <Route path="/special/resetPassword/:token" element={<SetNewPasswordPage />} />

                <Route path="/errors/*" element={<ErrorsRouter />} />

                <Route path="/" element={<Redirect />} />

                <Route path="/public/*" element={<PublicMainPage />} />

                <Route path="/user/*" element={<UserRouter />} />

                <Route path="/active/*" element={<ActiveUserRouter />} />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
