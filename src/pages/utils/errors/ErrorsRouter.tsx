import { Navigate, Routes } from "react-router";
import { Route } from "react-router-dom";
import NetworkPage from "./Network";
import ForbiddenPage from "./Forbidden";
import ServerErrorPage from "./ServerError";
import { Grid } from "@material-ui/core";
import ExpiredLink from "./ExpiredLink";
const ErrorsRouter = () => {
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }}
      >
        <Routes>
          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route path="/expiredLink" element={<ExpiredLink />} />
          <Route path="/serverError" element={<ServerErrorPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Grid>
    </div>
  );
};
export default ErrorsRouter;
