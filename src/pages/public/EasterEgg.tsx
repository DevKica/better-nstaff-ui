import { CardMedia } from "@material-ui/core";
import AnimatedPage from "../utils/AnimatedPage";

const EasterEgg = () => {
  return (
    <AnimatedPage>
      <div>
        <div>{`<3`}</div>
        <CardMedia
          image={require("../../static/easterEgg.png")}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            height: "70vh",
            width: "90vw",
            backgroundSize: "auto",
            backgroundRepeat: "none",
          }}
        />
      </div>
    </AnimatedPage>
  );
};

export default EasterEgg;
