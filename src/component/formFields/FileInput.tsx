import { FC, useState } from "react";
import { Box, Typography, Button, FormHelperText } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FileInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  accept?: string[];
  required?: boolean;
  disabled?: boolean;
}

const FileInput = <T extends FieldValues>({
  name,
  control,
  label,
  accept = [],
  required = false,
  disabled = false,
}: FileInputProps<T>) => {
  const [fileName, setFileName] = useState<string>("");

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
        render={({
          field: { onChange, value, ...field },
          fieldState: { error },
        }) => (
          <>
            <Button
              component="label"
              variant="outlined"
              fullWidth
              disabled={disabled}
              startIcon={<UploadFileIcon />}
              sx={{
                mt: 0.5,
                borderRadius: 1,
                backgroundColor: "#FFFFFF",
                border: `1px solid ${error ? "#D32F2F" : "#E5E7EB"}`,
                color: "#011527",
                fontWeight: 500,
                padding: "10px 12px",
                textTransform: "none",
                justifyContent: "flex-start",
                "&:hover": {
                  borderColor: error ? "#D32F2F" : "#D9C48C",
                  backgroundColor: "#FFFFFF",
                },
              }}
            >
              {fileName || "Choose file"}
              <input
                {...field}
                type="file"
                hidden
                disabled={disabled}
                accept={accept.join(",")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFileName(file?.name || "");
                  onChange(file?.name || "");
                }}
              />
            </Button>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </Box>
  );
};

export default FileInput;
