import { FC } from "react";
import {
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface CheckboxInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

const CheckboxInput = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  disabled = false,
}: CheckboxInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field, fieldState: { error } }) => (
        <Box display="flex" flexDirection="column">
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={!!field.value}
                disabled={disabled}
                onChange={(e) => field.onChange(e.target.checked)}
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
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </Box>
      )}
    />
  );
};

export default CheckboxInput;
