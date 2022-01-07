import { AppBar, Toolbar, Badge, Avatar } from "@material-ui/core";
import { Settings, Person } from "@material-ui/icons";
import { Login, QuestionMark } from "@mui/icons-material";
import MainNavBarStyles from "../../styles/globals/MainNavBarStyles";
import { Link } from "react-router-dom";
import { getStoreUserAuth } from "../../redux/actions/authActions";

const MainNavBar = () => {
  const classes = MainNavBarStyles();
  const { isAuthenticated } = getStoreUserAuth();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Badge color="secondary" className={classes.badge}>
          {isAuthenticated ? (
            <Link to="/user/profile">
              <Person />
            </Link>
          ) : (
            <Link to="/public/easterEgg">
              <QuestionMark />
            </Link>
          )}
        </Badge>
        <Link to="/">
          <Avatar alt="" className={classes.badge} src={require("../../static/NIcon.png")} />
        </Link>
        <Badge color="secondary" className={classes.badge}>
          {isAuthenticated ? (
            <Link to="/user/settings">
              <Settings />
            </Link>
          ) : (
            <Link to="/public/login">
              <Login />
            </Link>
          )}
        </Badge>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavBar;
