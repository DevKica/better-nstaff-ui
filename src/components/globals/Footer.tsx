import { Box } from "@material-ui/core";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        color: "white",
        fontSize: "14px",
        bgcolor: "primary.main",
        p: 1,
      }}
      style={{ opacity: "1 !important", zIndex: 1399 }}
    >
      Created by Paweł Kica 2022
    </Box>
  );
};

export default Footer;
