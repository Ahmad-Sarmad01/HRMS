import { FC } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email";
  required?: boolean;
  inputMode?: "text" | "numeric" | "email";
  maxLength?: number;
}

const TextInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "",
  type = "text",
  required = false,
  inputMode,
  maxLength,
}: TextInputProps<T>) => {
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
            type={type}
            placeholder={placeholder}
            fullWidth
            error={!!error}
            helperText={error?.message}
            inputProps={{
              inputMode: inputMode,
              maxLength: maxLength,
            }}
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
        )}
      />
    </Box>
  );
};

export default TextInput;
