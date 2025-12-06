import { FC } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SelectInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: string[];
  required?: boolean;
}

const SelectInput = <T extends FieldValues>({
  name,
  control,
  label,
  options = [],
  required = false,
}: SelectInputProps<T>) => {
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
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth sx={{ mt: 0.5 }} error={!!error}>
            <Select
              {...field}
              value={field.value || ""}
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
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </Box>
  );
};

export default SelectInput;
