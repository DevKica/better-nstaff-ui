import { Box } from "@material-ui/core";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        color: "white",
        fontSize: "14px",
        bgcolor: "primary.main",
        p: 1,
      }}
    >
      Created by Paweł Kica
    </Box>
  );
};

export default Footer;
