import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { menuSections } from "./content";

const expandedWidth = 240;

const Sidebar = ({ isOpen } : { isOpen:any }) => {
  const theme = useTheme()
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDropdownClick = (menu : any) => {
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

  const renderMenuItem = (item: any, level: number = 0) => {
    const marginLeft = level * 2.5;
    const hasRoute = item.route && !item.children;
    const hasChildren = item.children && item.children.length > 0;

    if (hasRoute) {
      // Render as Link if it has a route and no children
      return (
        <Link to={item.route} style={{ textDecoration: "none", color: "inherit" }} key={item.key || item.title}>
          <ListItemButton sx={{ ml: marginLeft, borderRadius: 1, my: 0.3, px: 1.2, py: 0.9, "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.22)" }, "& .MuiListItemIcon-root": { minWidth: 36 } }}>
            <ListItemIcon sx={{ color: "black", mr: 0.8, ml: 1, minWidth: 36 }}> {item.icon} </ListItemIcon>
            <ListItemText sx={{m:0, p:0, gap:0, "& .MuiListItemText-primary": { fontSize: "0.9rem", fontWeight: 500 } }} primary={item.title} />
          </ListItemButton>
        </Link>
      );
    } else if (hasChildren) {
      // Render as expandable group
      return (
        <Box key={item.key}>
          <ListItemButton onClick={() => isOpen ? handleDropdownClick(item.key): null}
            sx={{
              transition: "all 0.3s ease",
              borderRadius: 1.5,
              mx: level === 0 ? 0.5 : 0,
              ml: level > 0 ? marginLeft : undefined,
              my: 0.75,
              px: 1.5,
              py: 1.2,
              justifyContent: isOpen ? "flex-start" : "center",
              backgroundColor: openDropdowns.has(item.key) ? "rgba(217, 196, 140, 0.18)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(217, 196, 140, 0.22)",
              },
              "& .MuiListItemIcon-root": {
                color: openDropdowns.has(item.key) ? "primary.main" : "text.primary",
                minWidth: isOpen ? 40 : 0,
              },
              "& .MuiListItemText-primary": {
                fontWeight: openDropdowns.has(item.key) ? 600 : 500,
                fontSize: "0.95rem",
              }
            }}>
            <ListItemIcon sx={{ mr: 1.2, justifyContent: "center", color: "primary.main", minWidth: 40 }}> {item.icon} </ListItemIcon>
            {isOpen && ( <ListItemText primary={item.title} sx={{ flexGrow: 1 }} /> )}
            {isOpen && (
            <ExpandMoreIcon sx={{ transform: openDropdowns.has(item.key) ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", color: "primary.main", fontSize: "small" }}/>)}
          </ListItemButton>

          {/* Dropdown Menu */}
          <Collapse in={openDropdowns.has(item.key)} timeout="auto" unmountOnExit>
            {item.children.map((child: any) => renderMenuItem(child, level + 1))}
          </Collapse>
        </Box>
      );
    } else {
      // Render as non-clickable item (fallback)
      return (
        <ListItemButton key={item.key || item.title} sx={{ ml: marginLeft, borderRadius: 1, my: 0.3, px: 1.2, py: 0.9, "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.22)" }, "& .MuiListItemIcon-root": { minWidth: 36 } }}>
          <ListItemIcon sx={{ color: "primary.main", mr: 0.8, minWidth: 36 }}> {item.icon} </ListItemIcon>
          <ListItemText sx={{m:0, p:0, gap:0, "& .MuiListItemText-primary": { fontSize: "0.9rem", fontWeight: 500 } }} primary={item.title} />
        </ListItemButton>
      );
    }
  };
  
  return (
    <Drawer
      variant="permanent"  open={isOpen}
      sx={{position:isMobile? "absolute" : "sticky", width: isOpen ? expandedWidth : 0, transition: "width 0.3s ease", "& .MuiDrawer-paper": { width: isOpen ? expandedWidth : 0, overflowX: "hidden", transition: "width 0.3s ease",borderRight: "1px solid #E5E7EB",backgroundColor: "#FAFAFA",},}}>
      
      <Toolbar sx={{mt: isMobile? 8.5 : 0, display: "flex", justifyContent: isOpen ? "space-between" : "center", px: 0.5, position: "sticky", top: 0, zIndex: 1100, backgroundColor: "white", borderBottom: "1px solid #E5E7EB" }}>
        {isOpen && ( 
          <img 
            src="/Mechri-Logo.png" 
            alt="Mechri Logo" 
            style={{ height: 40, width: 'auto', objectFit: 'contain', marginTop: 10 }} 
          /> 
        )}
      </Toolbar>

      <List sx={{ p: 0.5, "& .MuiListItemButton-root": { transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" } }}>
        {menuSections.map((item) => renderMenuItem(item, 0))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
