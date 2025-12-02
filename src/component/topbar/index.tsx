import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Modal,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logoutUser } from "../../store/slices/userSlice";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { H6 } from "../responsiveText";
import { useAppSelector } from "../../store/hooks";
import { useState } from "react";

const Topbar = ({ isOpen, toggleSidebar }: { isOpen: any; toggleSidebar: any }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useAppDispatch();     // ✅ FIX
  const navigate = useNavigate();        // ✅ FIX

  const user = useAppSelector((state) => state.user);
  const [openLogout, setOpenLogout] = useState(false);

  const username = user.isAuthenticated && user.name ? user.name : "";


const handleLogout = () => {
  dispatch(logoutUser());

  localStorage.setItem("isAuthenticated", "false");

  navigate("/login");

  setOpenLogout(false);
};

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
        {/* LEFT SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            sx={{
              color: "secondary.main",
              transition: "all 0.3s ease",
              "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.12)" },
            }}
            onClick={toggleSidebar}
          >
            {isOpen ? <MenuOpenIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
          </IconButton>

          {/* HRMS always on left */}
          <H6 sx={{ ml: 1, color: "text.primary", fontWeight: 600 }}>HRMS</H6>
        </Box>

        {/* RIGHT SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Username clickable */}
            <H6
              sx={{ color: "#c7b078", fontWeight: 600, cursor: "pointer" }}
              onClick={() => setOpenLogout(true)}
            >
              {username || "HRMS"}
            </H6>

            {/* Vertical divider when sidebar is closed */}
            {!isOpen && (
              <Box
                sx={{ width: "1px", height: 30, backgroundColor: "#E0E0E0" }}
              />
            )}

            {/* Logo only when sidebar is CLOSED */}
            {!isOpen && (
              <img
                src="/Mechri-Logo.png"
                alt="Mechri Logo"
                style={{ height: 40, width: "auto", objectFit: "contain" }}
              />
            )}
          </Box>
        </Box>
      </Toolbar>

      {/* Logout Modal */}
      <Modal open={openLogout} onClose={() => setOpenLogout(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 300,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Logout!
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Are you sure you want to logout?
          </Typography>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Topbar;