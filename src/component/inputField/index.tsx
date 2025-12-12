import { Box, Button, Drawer, SxProps, TextField, Theme, Typography, styled } from "@mui/material";
import React,{FC} from "react";

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  value?: string;
  sx?: SxProps<Theme>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Styled TextField
const InputField = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    transition: "all 0.3s ease",
    "&:hover fieldset": {
      borderColor: "#D9C48C",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D9C48C",
      borderWidth: 2,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "0.95rem",
    color: "#011527",
    padding: "10px 12px",
    fontWeight: 500,
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#A08B5F",
    opacity: 0.7,
  },
  "& .MuiOutlinedInput-root.Mui-disabled": {
    backgroundColor: "#F5F5F5",
  },
}));

const TextArea: FC<TextAreaProps> = ({
  label = "Staff Code",
  placeholder = "",
  multiline = false,
  rows = 1,
  value,
  onChange,
  sx
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="body1"  sx={{fontWeight: 600, fontSize: "0.95rem", color: "#011527", mb: 0.5}}> {label} </Typography>
      <InputField placeholder={placeholder} multiline={multiline} rows={rows} value={value} onChange={onChange} variant="outlined" sx={sx}/>
    </Box>
  );
};

export {TextArea}