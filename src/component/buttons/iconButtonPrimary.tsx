import React from "react";
import { Button, ButtonProps } from "@mui/material";

type IconButtonPrimaryProps = {
  icon?: React.ReactNode;
  label: string;
  onClick?: ButtonProps["onClick"];
  sx?: ButtonProps["sx"];
  variant?: ButtonProps["variant"];
  disabled?: boolean;
};

const IconButtonPrimary: React.FC<IconButtonPrimaryProps> = ({
  icon,
  label,
  onClick,
  sx,
  variant = "contained",
  disabled = false,
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      startIcon={icon}
      disabled={disabled}
      sx={{
        backgroundColor: "#D9C48C",
        color: "#011527",
        textTransform: "none",
        ...((sx as any) || {}),
      }}
    >
      {label}
    </Button>
  );
};

export default IconButtonPrimary;
