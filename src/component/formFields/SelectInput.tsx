import { FC } from "react";
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";

interface SelectInputProps {
  label: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const SelectInput: FC<SelectInputProps> = ({
  label,
  options = [],
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
      <FormControl fullWidth sx={{ mt: 0.5 }}>
        <Select
          value={value || ""}
          onChange={(e) => onChange?.(e.target.value)}
          displayEmpty
          sx={{
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover": {
              borderColor: "#D9C48C",
            },
            "&.Mui-focused": {
              borderColor: "#D9C48C",
              borderWidth: 2,
            },
            "& .MuiSelect-select": {
              fontSize: "0.95rem",
              color: "#011527",
              padding: "10px 12px",
              fontWeight: 500,
            },
          }}
        >
          <MenuItem value="" disabled>
            <em>Select {label.toLowerCase()}</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectInput;
