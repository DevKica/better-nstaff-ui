import { Card, CardActionArea, CardHeader, CardMedia } from "@material-ui/core";
import { Link } from "react-router-dom";
import welcomeStyles from "../../styles/public/WelcomeStyles";
import AnimatedPage from "../utils/AnimatedPage";

const WelcomePage = () => {
  const styles = welcomeStyles();
  return (
    <AnimatedPage>
      <Link to="/login">
        <Card className={styles.container}>
          <CardActionArea>
            <CardHeader title="Join the best team in Poland!"></CardHeader>
            <CardMedia image={require("../../static/nolioLogo.png")} className={styles.image} />
          </CardActionArea>
        </Card>
      </Link>
    </AnimatedPage>
  );
};

export default WelcomePage;
