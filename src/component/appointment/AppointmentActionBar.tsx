import React from "react";
import { Box, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import PillButton from "../buttons/pillButton";

interface AppointmentActionBarProps {
  activeBtn: number | null;
  isSubmitting: boolean;
  onButtonClick: (index: number, title?: string) => void;
  showList?: boolean;
}

const AppointmentActionBar: React.FC<AppointmentActionBarProps> = ({
  activeBtn,
  isSubmitting,
  onButtonClick,
  showList,
}) => {
  return (
    <Box sx={{ mt: 0 }}>
      <Box
        gap={1}
        minHeight={{ xs: "auto", sm: 40 }}
        boxShadow="0 2px 6px rgba(0,0,0,0.05)"
        borderRadius={2}
        p={{ xs: 0.5, sm: 1 }}
        border="1px solid var(--primary)"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
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
            index={4}
            onClick={() => onButtonClick(4, "List")}
            isActive={showList}
          >
            <ListIcon fontSize="small" />
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              List
            </Box>
          </PillButton>
          {!showList && (
            <>
              <PillButton
                index={0}
                onClick={() => onButtonClick(0, "Save")}
                isActive={activeBtn === 0}
              >
                {isSubmitting && activeBtn === 0 ? (
                  <CircularProgress size={16} sx={{ color: "inherit" }} />
                ) : (
                  <SaveIcon fontSize="small" />
                )}
                <Box
                  component="span"
                  sx={{ display: { xs: "none", sm: "inline" } }}
                >
                  Save
                </Box>
              </PillButton>
              <PillButton
                index={2}
                onClick={() => onButtonClick(2)}
                isActive={activeBtn === 2}
              >
                {isSubmitting && activeBtn === 2 ? (
                  <CircularProgress size={16} sx={{ color: "inherit" }} />
                ) : (
                  <SendIcon fontSize="small" />
                )}
                <Box
                  component="span"
                  sx={{ display: { xs: "none", sm: "inline" } }}
                >
                  Submit for Approval
                </Box>
              </PillButton>
            </>
          )}
          <PillButton
            index={3}
            onClick={() => onButtonClick(3, "Search")}
            isActive={activeBtn === 3}
          >
            <SearchIcon fontSize="small" />
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              Search
            </Box>
          </PillButton>
        </Box>

        <Box
          sx={{
            fontWeight: 600,
            fontSize: { xs: "0.9rem", sm: "1.1rem" },
            color: "var(--primary)",
            textAlign: "right",
            flexShrink: 0,
            ml: 1,
            minWidth: 0,
          }}
        >
          Staff Appointment Request
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentActionBar;
