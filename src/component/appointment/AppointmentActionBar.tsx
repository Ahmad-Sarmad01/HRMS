import React from "react";
import { Box, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import PillButton from "../buttons/pillButton";

interface AppointmentRequestActionBarProps {
  activeBtn: number | null;
  isSubmitting: boolean;
  onButtonClick: (index: number, title?: string) => void;
  isEditing?: boolean;
}

const AppointmentRequestActionBar: React.FC<
  AppointmentRequestActionBarProps
> = ({ activeBtn, isSubmitting, onButtonClick, isEditing }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        gap: 2,
        mb: 2,
      }}
    >
      <Box
        component="h1"
        sx={{
          fontSize: { xs: "1.25rem", md: "1.5rem" },
          fontWeight: 600,
          color: "var(--primary)",
          m: 0,
        }}
      >
        {isEditing
          ? "View Staff Appointment Request"
          : "Staff Appointment Request"}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: { xs: 0.5, sm: 1 },
          flexWrap: "wrap",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <PillButton
          index={5}
          onClick={() => onButtonClick(5, "New")}
          isActive={activeBtn === 5}
        >
          <AddIcon fontSize="small" />
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            New
          </Box>
        </PillButton>
        <PillButton
          index={4}
          onClick={() => onButtonClick(4, "List")}
          isActive={false}
        >
          <ListIcon fontSize="small" />
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            List
          </Box>
        </PillButton>
        <PillButton
          index={0}
          type="submit"
          onClick={() => onButtonClick(0, "Save")}
          isActive={activeBtn === 0}
        >
          {isSubmitting && activeBtn === 0 ? (
            <CircularProgress size={16} sx={{ color: "inherit" }} />
          ) : (
            <SaveIcon fontSize="small" />
          )}
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Save
          </Box>
        </PillButton>
        <PillButton
          index={2}
          type="submit"
          onClick={() => onButtonClick(2)}
          isActive={activeBtn === 2}
        >
          {isSubmitting && activeBtn === 2 ? (
            <CircularProgress size={16} sx={{ color: "inherit" }} />
          ) : (
            <SendIcon fontSize="small" />
          )}
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Submit for Approval
          </Box>
        </PillButton>
      </Box>
    </Box>
  );
};

interface AppointmentListActionBarProps {
  activeBtn: number | null;
  onButtonClick: (index: number, title?: string) => void;
}

const AppointmentListActionBar: React.FC<AppointmentListActionBarProps> = ({
  activeBtn,
  onButtonClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        gap: 2,
        mb: 2,
      }}
    >
      <Box
        component="h1"
        sx={{
          fontSize: { xs: "1.25rem", md: "1.5rem" },
          fontWeight: 600,
          color: "var(--primary)",
          m: 0,
        }}
      >
        Appointment Register
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: { xs: 0.5, sm: 1 },
          flexWrap: "wrap",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <PillButton
          index={5}
          onClick={() => onButtonClick(5, "New")}
          isActive={activeBtn === 5}
        >
          <AddIcon fontSize="small" />
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            New
          </Box>
        </PillButton>
        <PillButton
          index={3}
          onClick={() => onButtonClick(3, "Search")}
          isActive={activeBtn === 3}
        >
          <SearchIcon fontSize="small" />
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Search
          </Box>
        </PillButton>
      </Box>
    </Box>
  );
};

export { AppointmentRequestActionBar, AppointmentListActionBar };
