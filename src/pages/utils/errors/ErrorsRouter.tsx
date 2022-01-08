import { Navigate, Routes } from "react-router";
import { Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { FORBIDDEN, NOT_FOUND, SERVER_ERROR, TOO_MANY_REQUEST } from "../../../helpers/errors/errorMessages";
import { EXPIRED_LINK } from "./../../../helpers/errors/errorMessages";
import ErrorPage from "./ErrorPage";

export const accessRoutes = [{ path: "/forbidden", text: FORBIDDEN.message[0] }];
export const basicErrorRoutes = [
  { path: "/tooManyRequest", text: TOO_MANY_REQUEST.message[0] },
  { path: "/expiredLink", text: EXPIRED_LINK.message[0] },
  { path: "/notFound", text: NOT_FOUND.message[0] },
  { path: "/serverError", text: SERVER_ERROR.message[0] },
];

export const allErrorRoutes = [
  ...accessRoutes,
  ...basicErrorRoutes,
  { path: "/network", text: "Network error, try again later" },
];

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
          {allErrorRoutes.map((e, index) => (
            <Route key={index} path={e.path} element={<ErrorPage text={e.text} />} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Grid>
    </div>
  );
};
export default ErrorsRouter;
