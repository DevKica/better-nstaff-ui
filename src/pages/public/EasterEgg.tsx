import { CardMedia } from "@material-ui/core";
import AnimatedPage from "../utils/AnimatedPage";

const EasterEgg = () => {
  return (
    <AnimatedPage>
      <div>
        <div>{`<3`}</div>
        <CardMedia
          image={require("../../static/easterEgg/easterEgg.png")}
          style={{
            height: "70vh",
            width: "90vw",
            margin: "auto",
            backgroundSize: "auto",
            backgroundRepeat: "none",
          }}
        />
      </div>
    </AnimatedPage>
  );
};

export default EasterEgg;
