import Typography from "@mui/material/Typography";
import AnimatedPage from "../AnimatedPage";

const ErrorPage = (props: { text: string }) => {
  return (
    <AnimatedPage>
      <Typography variant="h5">{props.text}</Typography>
    </AnimatedPage>
  );
};

export default ErrorPage;
