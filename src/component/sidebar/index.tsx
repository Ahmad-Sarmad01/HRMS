import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  Box,
  Collapse,
  useMediaQuery,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { menuSections } from "./content";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logoutUser } from "../../store/slices/userSlice";
import { clearAuthData } from "../../utils/localStorage";

const expandedWidth = 240;

const Sidebar = ({ isOpen }: { isOpen: any }) => {
  const theme = useTheme();
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const [hoverOpen, setHoverOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    clearAuthData();
    navigate("/login");
  };

  const handleSidebarOpen = () => {
    setHoverOpen(true);
  };

  const handleSidebarClose = () => {
    setHoverOpen(false);
  };

  const handleDropdownClick = (menu: any) => {
    setOpenDropdowns((prev) => {
      const updated = new Set(prev);
      if (updated.has(menu)) {
        updated.delete(menu);
      } else {
        updated.add(menu);
      }
      return updated;
    });
  };

  const isSidebarOpen = isOpen || hoverOpen;

  const renderMenuItem = (item: any, level: number = 0) => {
    const marginLeft = level * 2.5;
    const hasRoute = item.route && !item.children;
    const hasChildren = item.children && item.children.length > 0;

    if (hasRoute) {
      // Render as Link if it has a route and no children
      return (
        <Link
          to={item.route}
          style={{ textDecoration: "none", color: "inherit" }}
          key={item.key || item.title}
        >
          <ListItemButton
            sx={{
              ml: marginLeft,
              borderRadius: 1,
              my: 0.6,
              px: 1.2,
              py: 1.2,
              "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.22)" },
              "& .MuiListItemIcon-root": { minWidth: 36 },
            }}
          >
            <ListItemIcon sx={{ color: "black", mr: 0.8, ml: 1, minWidth: 36 }}>
              {" "}
              {item.icon}{" "}
            </ListItemIcon>
            <ListItemText
              sx={{
                m: 0,
                p: 0,
                gap: 0,
                "& .MuiListItemText-primary": {
                  fontSize: "0.9rem",
                  fontWeight: 500,
                },
              }}
              primary={item.title}
            />
          </ListItemButton>
        </Link>
      );
    } else if (hasChildren) {
      // Render as expandable group
      return (
        <Box key={item.key}>
          <ListItemButton
            onClick={() =>
              isSidebarOpen ? handleDropdownClick(item.key) : null
            }
            sx={{
              transition: "all 0.3s ease",
              borderRadius: 1.5,
              mx: level === 0 ? 0.5 : 0,
              ml: level > 0 ? marginLeft : undefined,
              my: 0.6,
              px: 1.5,
              py: 1.2,
              justifyContent: isSidebarOpen ? "flex-start" : "center",
              backgroundColor: openDropdowns.has(item.key)
                ? "rgba(217, 196, 140, 0.18)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(217, 196, 140, 0.22)",
              },
              "& .MuiListItemIcon-root": {
                color: openDropdowns.has(item.key)
                  ? "primary.main"
                  : "text.primary",
                minWidth: isSidebarOpen ? 40 : 0,
              },
              "& .MuiListItemText-primary": {
                fontWeight: openDropdowns.has(item.key) ? 600 : 500,
                fontSize: "0.95rem",
              },
            }}
          >
            <ListItemIcon
              sx={{
                mr: 1.2,
                justifyContent: "center",
                color: "primary.main",
                minWidth: 40,
              }}
            >
              {" "}
              {item.icon}{" "}
            </ListItemIcon>
            {isSidebarOpen && (
              <ListItemText primary={item.title} sx={{ flexGrow: 1 }} />
            )}
            {isSidebarOpen && (
              <ExpandMoreIcon
                sx={{
                  transform: openDropdowns.has(item.key)
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  color: "primary.main",
                  fontSize: "small",
                }}
              />
            )}
          </ListItemButton>

          {/* Dropdown Menu */}
          <Collapse
            in={openDropdowns.has(item.key)}
            timeout="auto"
            unmountOnExit
          >
            {item.children.map((child: any) =>
              renderMenuItem(child, level + 1)
            )}
          </Collapse>
        </Box>
      );
    } else {
      // Render as non-clickable item (fallback)
      return (
        <ListItemButton
          key={item.key || item.title}
          sx={{
            ml: marginLeft,
            borderRadius: 1,
            my: 0.3,
            px: 1.2,
            py: 0.9,
            "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.22)" },
            "& .MuiListItemIcon-root": { minWidth: 36 },
          }}
        >
          <ListItemIcon sx={{ color: "primary.main", mr: 0.8, minWidth: 36 }}>
            {" "}
            {item.icon}{" "}
          </ListItemIcon>
          <ListItemText
            sx={{
              m: 0,
              p: 0,
              gap: 0,
              "& .MuiListItemText-primary": {
                fontSize: "0.9rem",
                fontWeight: 500,
              },
            }}
            primary={item.title}
          />
        </ListItemButton>
      );
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isSidebarOpen && (
        <IconButton
          onMouseEnter={handleSidebarOpen}
          sx={{
            position: "fixed",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 32,
            height: 48,
            borderRadius: "0 24px 24px 0",
            backgroundColor: "#D9C48C",
            color: "white",
            zIndex: 1300,
            transition: "all 0.3s ease",
            boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
            "&:hover": {
              backgroundColor: "#B8A361",
              width: 36,
              boxShadow: "3px 0 12px rgba(0,0,0,0.2)",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1.2rem",
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}

      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        onMouseLeave={hoverOpen ? handleSidebarClose : undefined}
        sx={{
          position: isMobile ? "absolute" : "sticky",
          width: isSidebarOpen ? expandedWidth : 0,
          transition: "width 0.3s ease",
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? expandedWidth : 0,
            overflowX: "hidden",
            transition: "width 0.3s ease",
            borderRight: "1px solid #E5E7EB",
            backgroundColor: "#FAFAFA",
          },
        }}
      >
        <Toolbar
          sx={{
            mt: isMobile ? 8.5 : 0,
            display: "flex",
            justifyContent: isSidebarOpen ? "space-between" : "center",
            px: 0.5,
            position: "sticky",
            top: 0,
            zIndex: 1100,
            backgroundColor: "white",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          {isSidebarOpen && (
            <img
              src="/Mechri-Logo.png"
              alt="Mechri Logo"
              style={{
                height: 40,
                width: "auto",
                objectFit: "contain",
                marginTop: 10,
              }}
            />
          )}
        </Toolbar>

        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <List
            sx={{
              p: 0.5,
              flexGrow: 1,
              "& .MuiListItemButton-root": {
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              },
            }}
          >
            {menuSections.map((item) => renderMenuItem(item, 0))}
          </List>

          {/* Logout Button */}
          {isSidebarOpen && user.isAuthenticated && (
            <Box sx={{ p: 1.5, borderTop: "1px solid #E5E7EB" }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  color: "#011527",
                  borderColor: "#E5E7EB",
                  textTransform: "none",
                  fontWeight: 500,
                  py: 1,
                  "&:hover": {
                    borderColor: "#D9C48C",
                    backgroundColor: "rgba(217, 196, 140, 0.08)",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
