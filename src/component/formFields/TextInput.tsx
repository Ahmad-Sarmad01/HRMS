import { FC } from "react";
import { Box, Typography, TextField } from "@mui/material";

interface TextInputProps {
  label: string;
  placeholder?: string;
  type?: "text" | "email";
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<TextInputProps> = ({
  label,
  placeholder = "",
  type = "text",
  required = false,
  value,
  onChange,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          fontSize: "0.95rem",
          color: "#011527",
          mb: 0.2,
        }}
      >
        {label}
        {required && <span style={{ color: "#D32F2F" }}> *</span>}
      </Typography>
      <TextField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        fullWidth
        sx={{
          mt: 0.5,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
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
        }}
      />
    </Box>
  );
};

export default TextInput;
