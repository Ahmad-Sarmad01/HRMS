import { FC, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

interface ImageInputProps {
  label: string;
  required?: boolean;
  onChange?: (file: File | null) => void;
}

const ImageInput: FC<ImageInputProps> = ({ label, required, onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange?.(file);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width={170}>
      {/* LABEL */}
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          fontSize: "0.95rem",
          color: "#011527",
          mb: 1,
          width: "100%",
        }}
      >
        {label}
        {required && <span style={{ color: "#D32F2F" }}> *</span>}
      </Typography>

      {/* IMAGE PREVIEW BOX */}
      <Box
        sx={{
          width: 140,
          height: 160,
          borderRadius: 2,
          border: "1px solid #E5E7EB",
          backgroundColor: "#F3F4F6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          mb: 1.5,
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box textAlign="center" color="#6B7280" fontSize="0.8rem">
            <div style={{ fontSize: 40 }}>👤</div>
            PHOTO NOT AVAILABLE
          </Box>
        )}
      </Box>

      {/* UPLOAD BUTTON */}
      <input
        id="image-upload-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <Button
        variant="contained"
        component="label"
        htmlFor="image-upload-input"
        sx={{
          width: "100%",
          textTransform: "none",
          backgroundColor: "#D9C48C",
          color: "#011527",
          fontWeight: 600,
          borderRadius: 2,
          mb: 1,
          "&:hover": {
            backgroundColor: "#C7B078",
          },
        }}
      >
        Upload
      </Button>

      {/* CAMERA BUTTON */}
      <Button
        variant="outlined"
        sx={{
          width: "100%",
          textTransform: "none",
          borderRadius: 2,
          borderColor: "#D9C48C",
          color: "#011527",
          fontWeight: 600,
          mb: 1,
          "&:hover": {
            borderColor: "#C7B078",
            backgroundColor: "#F9F5EC",
          },
        }}
      >
        📷 Camera
      </Button>

      {/* ID CARD BUTTON */}
      <Button
        variant="contained"
        sx={{
          width: "100%",
          textTransform: "none",
          backgroundColor: "#011527",
          color: "#FFFFFF",
          borderRadius: 2,
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#0B2743",
          },
        }}
      >
        ID Card
      </Button>
    </Box>
  );
};

export default ImageInput;
