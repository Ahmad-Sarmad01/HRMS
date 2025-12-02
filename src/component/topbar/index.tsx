import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { H6 } from "../responsiveText";
import { useAppSelector } from "../../store/hooks";

const Topbar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: any;
  toggleSidebar: any;
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const user = useAppSelector((state) => state.user);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        color: "primary.main",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: isDesktop ? `calc(100% - ${isOpen ? 240 : 0}px)` : "100%",
        transition: "width 0.3s ease, box-shadow 0.3s ease",
        ml: isDesktop && isOpen ? `${240}px` : 0,
        p: 0,
        borderBottom: "1px solid #E5E7EB",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            sx={{
              color: "secondary.main",
              transition: "all 0.3s ease",
              "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.12)" },
            }}
            onClick={toggleSidebar}
          >
            {" "}
            {isOpen ? (
              <MenuOpenIcon fontSize="medium" />
            ) : (
              <MenuIcon fontSize="medium" />
            )}{" "}
          </IconButton>
          {isOpen && (
            <H6 sx={{ ml: 1, color: "text.primary", fontWeight: 600 }}>
              {user.isAuthenticated && user.name ? user.name : "HRMS"}
            </H6>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!isOpen && (
            <H6 sx={{ color: "text.primary", fontWeight: 600 }}>
              {user.isAuthenticated && user.name ? user.name : "HRMS"}
            </H6>
          )}
          {!isOpen && (
            <img
              src="/Mechri-Logo.png"
              alt="Mechri Logo"
              style={{ height: 40, width: "auto", objectFit: "contain" }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
