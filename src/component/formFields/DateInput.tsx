import { FC } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface DateInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

const DateInput = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  disabled = false,
}: DateInputProps<T>) => {
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
          <TextField
            {...field}
            value={field.value || ""}
            type="date"
            fullWidth
            disabled={disabled}
            error={!!error}
            helperText={error?.message}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              pattern: "\\d{4}-\\d{2}-\\d{2}",
            }}
            sx={{
              mt: 0.5,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
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
            }}
          />
        )}
      />
    </Box>
  );
};

export default DateInput;
