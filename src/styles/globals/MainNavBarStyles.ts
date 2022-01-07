import { makeStyles } from "@material-ui/core";

const MainNavBarStyles = makeStyles(theme => ({
  appBar: {
    position: "sticky",
    color: "white",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  badge: {
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

export default MainNavBarStyles;
