import { FC } from "react";
import { FormControlLabel, Checkbox, Box, Typography } from "@mui/material";

interface CheckboxInputProps {
  label: string;
  required?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxInput: FC<CheckboxInputProps> = ({
  label,
  required = false,
  checked = false,
  onChange,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            sx={{ color: "#011527", "&.Mui-checked": { color: "#D9C48C" } }}
          />
        }
        label={
          <Typography sx={{ fontWeight: 600, color: "#011527" }}>
            {label}
            {required && <span style={{ color: "#D32F2F" }}> *</span>}
          </Typography>
        }
      />
    </Box>
  );
};

export default CheckboxInput;
