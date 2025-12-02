import { FC, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface FileInputProps {
  label: string;
  accept?: string[];
  required?: boolean;
  onChange?: (file: File | null) => void;
}

const FileInput: FC<FileInputProps> = ({
  label,
  accept = [],
  required = false,
  onChange,
}) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || "");
    onChange?.(file);
  };

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
      <Button
        component="label"
        variant="outlined"
        fullWidth
        startIcon={<UploadFileIcon />}
        sx={{
          mt: 0.5,
          borderRadius: 2,
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          color: "#011527",
          fontWeight: 500,
          padding: "10px 12px",
          textTransform: "none",
          justifyContent: "flex-start",
          "&:hover": {
            borderColor: "#D9C48C",
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        {fileName || "Choose file"}
        <input
          type="file"
          hidden
          accept={accept.join(",")}
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  );
};

export default FileInput;
