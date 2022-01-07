import { Navigate } from "react-router";

const Redirect = () => {
  return (
    <div>
      <Navigate to="/public/welcome" />
    </div>
  );
};

export default Redirect;
