import { makeStyles } from "@material-ui/core";

const welcomeStyles = makeStyles(theme => ({
  container: {
    margin: "20px auto",
    width: "fit-content",
    padding: theme.spacing(3),
    boxShadow: "0px 4px 10px 2px rgba(66, 68, 90, 1) !important",
  },
  image: {
    height: "200px",
    margin: "auto",
    backgroundPosition: "center",
    backgroundSize: "initial",
    backgroundRepeat: "no-repeat",
  },
}));

export default welcomeStyles;
