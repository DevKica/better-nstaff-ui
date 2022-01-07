import { makeStyles } from "@material-ui/core";

const welcomeStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",
    // display: "flex",
    flexDirection: "column",
    margin: "20px auto",
    width: "fit-content",
    padding: theme.spacing(3),
    boxShadow: "0px 3px 2px -1px rgb(0 0 0 / 20%), 0px 3px 3px 2px rgb(0 0 0 / 14%), 3px 2px 3px 4px rgb(0 0 0 / 12%);",
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
