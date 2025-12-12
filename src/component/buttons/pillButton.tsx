import React from "react";
import { Box } from "@mui/material";

interface PillButtonProps {
  children: React.ReactNode;
  index: number;
  onClick: (index: number) => void;
  isActive?: boolean;
}

const PillButton: React.FC<PillButtonProps> = ({
  children,
  index,
  onClick,
  isActive = false,
}) => {
  return (
    <Box
      component="button"
      onClick={() => onClick(index)}
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
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: isActive
          ? "0 4px 8px rgba(0,0,0,0.2)"
          : "0 2px 4px rgba(0,0,0,0.1)",
        "&:hover": isActive
          ? { transform: "translateY(-2px)" }
          : {
              bgcolor: "var(--primary)",
              color: "var(--text-light)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transform: "translateY(-2px)",
            },
      }}
    >
      {children}
    </Box>
  );
};

export default PillButton;
