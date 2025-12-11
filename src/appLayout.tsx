import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./component/sidebar";
import Topbar from "./component/topbar";

const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const toggleSidebar = () => setIsOpen(!isOpen);

  const closeSidebar = () => setIsOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar isOpen={isOpen} onClose={closeSidebar} />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Topbar toggleSidebar={toggleSidebar} isOpen={isOpen} />

        <Box
          component="div"
          sx={{
            flex: 1,
            p: 3,
            mt: 8,
            transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            backgroundColor: "#FAFAFA",
            overflow: "auto",
            minHeight: "calc(100vh - 120px)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
