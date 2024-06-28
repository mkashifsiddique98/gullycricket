import { Box, Typography } from "@mui/material";


const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       
      }}
      
    >
        <Typography variant="h2" fontWeight={700}>Page Not Found  Error- 404!</Typography>
    </Box>
  );
};

export default NotFound;
