import React from "react";
import { Box, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";

interface PillButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const PillButton: React.FC<PillButtonProps> = ({
  children,
  onClick,
  isActive = false,
  type = "button",
  disabled = false,
}) => {
  return (
    <Box
      component="button"
      type={type}
      onClick={onClick}
      disabled={disabled}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        px: 2.2,
        py: 0.7,
        borderRadius: "12px",
        border: "1px solid var(--primary)",
        color: isActive ? "var(--text-light)" : "var(--primary)",
        bgcolor: isActive ? "var(--primary)" : "transparent",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.3s ease",
        boxShadow: isActive
          ? "0 4px 8px rgba(0,0,0,0.2)"
          : "0 2px 4px rgba(0,0,0,0.1)",
        "&:hover": !disabled
          ? isActive
            ? { transform: "translateY(-2px)" }
            : {
                bgcolor: "var(--primary)",
                color: "var(--text-light)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transform: "translateY(-2px)",
              }
          : {},
      }}
    >
      {children}
    </Box>
  );
};

interface DocumentActionBarProps {
  onNew: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

const DocumentActionBar: React.FC<DocumentActionBarProps> = ({
  onNew,
  onSave,
  isSaving = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        gap: 2,
        mb: 3,
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
        Document Registration
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      >
        <PillButton onClick={onNew} disabled={isSaving}>
          <AddIcon fontSize="small" />
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            New
          </Box>
        </PillButton>

        <PillButton type="submit" onClick={onSave} disabled={isSaving}>
          {isSaving ? (
            <CircularProgress size={16} sx={{ color: "inherit" }} />
          ) : (
            <SaveIcon fontSize="small" />
          )}
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Save
          </Box>
        </PillButton>
      </Box>
    </Box>
  );
};

export default DocumentActionBar;
