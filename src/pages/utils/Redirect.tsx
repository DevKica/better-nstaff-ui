import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getStoreUserAuth } from "../../redux/actions/authActions";

const RedirectPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isActive } = getStoreUserAuth();
  useEffect(() => {
    if (isActive) return navigate("/active/profile");
    if (isAuthenticated) return navigate("/user/profile");
    return navigate("/public/welcome");
  }, [isAuthenticated, navigate, isActive]);
  return <div>loading</div>;
};
export default RedirectPage;
