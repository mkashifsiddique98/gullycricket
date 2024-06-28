/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useTheme } from "@mui/material/styles";
import { Box, Container, useMediaQuery } from "@mui/material";
const Layout = ({ children }) => {
  const theme = useTheme();
  let matches = useMediaQuery(theme.breakpoints.down("md"));
  const [SidebarOpen, setSideBarShow] = useState(matches);
  const handleSidebar = () => {
    setSideBarShow((prevSidebarOpen) => !prevSidebarOpen);
  };
  useEffect(() => {
    setSideBarShow(matches);
  }, [matches]);
  // End Side Bar Show  and Hide Manage
  return (
    <>
      {/* Header */}
      <Header handleSidebar={handleSidebar} />
      {/* Sidebar */}
      <Box sx={{ display: "flex", height: "100vh", mt: 10 }}>
        <SideBar SidebarOpen={SidebarOpen} />
        <Container maxWidth='lg'>{children}</Container>
      </Box>
    </>
  );
};

export default Layout;
