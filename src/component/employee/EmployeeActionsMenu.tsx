import { FC } from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TableViewIcon from "@mui/icons-material/TableView";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";

interface EmployeeActionsMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const EmployeeActionsMenu: FC<EmployeeActionsMenuProps> = ({
  anchorEl,
  onClose,
}) => {
  const menuOpen = Boolean(anchorEl);

  const handleMenuItemClick = (action: string) => {
    console.log(`${action} clicked`);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        "& .MuiPaper-root": {
          mt: 0.5,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderRadius: 2,
          minWidth: 180,
        },
      }}
    >
      <MenuItem
        onClick={() => handleMenuItemClick("Bulk upload")}
        sx={{
          py: 1.5,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(217, 196, 140, 0.15)",
            transform: "translateX(4px)",
          },
        }}
      >
        <ListItemIcon>
          <UploadFileIcon fontSize="small" sx={{ color: "#D9C48C" }} />
        </ListItemIcon>
        <ListItemText
          primary="Bulk upload"
          primaryTypographyProps={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "#011527",
          }}
        />
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuItemClick("Export to Excel")}
        sx={{
          py: 1.5,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(217, 196, 140, 0.15)",
            transform: "translateX(4px)",
          },
        }}
      >
        <ListItemIcon>
          <TableViewIcon fontSize="small" sx={{ color: "#10B981" }} />
        </ListItemIcon>
        <ListItemText
          primary="Export to Excel"
          primaryTypographyProps={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "#011527",
          }}
        />
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuItemClick("Export to PDF")}
        sx={{
          py: 1.5,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(217, 196, 140, 0.15)",
            transform: "translateX(4px)",
          },
        }}
      >
        <ListItemIcon>
          <PictureAsPdfIcon fontSize="small" sx={{ color: "#EF4444" }} />
        </ListItemIcon>
        <ListItemText
          primary="Export to PDF"
          primaryTypographyProps={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "#011527",
          }}
        />
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuItemClick("Print")}
        sx={{
          py: 1.5,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(217, 196, 140, 0.15)",
            transform: "translateX(4px)",
          },
        }}
      >
        <ListItemIcon>
          <PrintIcon fontSize="small" sx={{ color: "#3B82F6" }} />
        </ListItemIcon>
        <ListItemText
          primary="Print"
          primaryTypographyProps={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "#011527",
          }}
        />
      </MenuItem>
    </Menu>
  );
};

export default EmployeeActionsMenu;
