"use client"
import { FC, CSSProperties, ReactNode } from "react";
import { Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material";

interface TextProps  {
  children: React.ReactElement | string | Array<React.ReactElement | string>;
  color?: string;
  onClick?: () => void;
   sx?: SxProps<Theme>;
  hoverEffect?: CSSProperties; 
  textAlign?: "center"|"left"|"right"
}

const H1: FC<TextProps> = ({ children, color, hoverEffect,textAlign,onClick,sx }) => {
  return (
    <Typography
      component="h1"
      onClick={onClick}
      color={color}
      textAlign={textAlign}
      sx={{
        fontFamily: "var(--font-heading)",
        fontWeight: 600,
        fontSize:"clamp(32px, 5vw, 64px)", 
        lineHeight:"clamp(40px, 6vw, 78px)", 
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": hoverEffect, 
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const H2: FC<TextProps> = ({ children, color, hoverEffect,textAlign,onClick,sx }) => {
  return (
    <Typography
      component="h1"
      onClick={onClick}
      color={color}
      textAlign={textAlign}
      sx={{
         ...sx,
        fontFamily: "var(--font-heading)",
        fontWeight: 600,
        fontSize:"clamp(24px, 4vw, 46px)", 
        lineHeight:"clamp(32px, 5vw, 56px)", 
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": hoverEffect, 
      }}
    >
      {children}
    </Typography>
  );
};


const H6: FC<TextProps> = ({ children, color, hoverEffect,textAlign,onClick,sx }) => {
  return (
    <Typography
      component="h2"
      onClick={onClick}
      color={color}
      textAlign={textAlign}
      sx={{
        fontFamily: "var(--font-heading)",
        fontWeight: 600,
        fontSize: "clamp(18px, 3vw, 28px)", 
        lineHeight: "clamp(26px, 4vw, 38px)",
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": hoverEffect,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};


const Text1: FC<TextProps> = ({ children, color, hoverEffect, onClick, textAlign, sx }) => {
  return (
    <Typography
      component="p"
      onClick={onClick}
      color={color}
      textAlign={textAlign}
      sx={{
        fontFamily: "var(--font-body)",
        fontWeight: 400,
        fontSize: "clamp(16px, 2vw, 18px)", 
        lineHeight: "clamp(22px, 3vw, 28px)",
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": hoverEffect,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const Text2: FC<TextProps> = ({ children, color, hoverEffect,textAlign, onClick, sx }) => {
  return (
    <Typography
      component="p"
      onClick={onClick}
      color={color}
      textAlign={textAlign}
      sx={{
        fontFamily: "var(--font-body)",
        fontWeight: 400,
        fontSize: "clamp(16px, 2vw, 22px)", 
        lineHeight:  "clamp(24px, 3vw, 32px)",
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": hoverEffect,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};


const Text3: FC<TextProps> = ({ children, color, hoverEffect,textAlign,onClick,sx }) => {
  return (
    <Typography
      component="p"
      onClick={onClick}
      color={color}
      textAlign={textAlign}
      sx={{
        fontFamily: "var(--font-body)",
        fontSize:"clamp(18px, 2vw, 24px)",
        lineHeight:"clamp(22px, 3vw, 34px)",
        fontWeight:400,
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": hoverEffect, 
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};


export { H1,H2,H6,Text2,Text1,Text3 };
