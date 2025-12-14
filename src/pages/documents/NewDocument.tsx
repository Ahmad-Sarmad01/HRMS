import React, { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Reusable PillButton Component
interface PillButtonProps {
  children: React.ReactNode;
  index: number;
  onClick: (index: number) => void;
  isActive?: boolean;
  type?: "button" | "submit" | "reset";
}

const PillButton: React.FC<PillButtonProps> = ({
  children,
  index,
  onClick,
  isActive = false,
  type = "button",
}) => {
  return (
    <Box
      component="button"
      type={type}
      onClick={() => onClick(index)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        px: 2.2,
        py: 0.7,
        borderRadius: "12px",
        border: "1px solid var(--primary)",
        color: isActive ? "var(--text-light)" : "var(--primary)",
        bgcolor: isActive ? "var(--primary)" : "transparent",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: isActive
          ? "0 4px 8px rgba(0,0,0,0.2)"
          : "0 2px 4px rgba(0,0,0,0.1)",
        "&:hover": isActive
          ? { transform: "translateY(-2px)" }
          : {
              bgcolor: "var(--primary)",
              color: "var(--text-light)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transform: "translateY(-2px)",
            },
      }}
    >
      {children}
    </Box>
  );
};

// Form Field Component
interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "date" | "select" | "number" | "checkbox" | "file";
  required?: boolean;
  control: any;
  options?: string[];
  error?: any;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  required = false,
  control,
  options = [],
  error,
  disabled = false,
}) => {
  if (type === "checkbox") {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={!!field.value}
                disabled={disabled}
                sx={{
                  color: "#011527",
                  "&.Mui-checked": { color: "#D9C48C" },
                }}
              />
            }
            label={
              <Typography sx={{ fontWeight: 600, color: "#011527" }}>
                {label}
                {required && <span style={{ color: "#D32F2F" }}> *</span>}
              </Typography>
            }
          />
        )}
      />
    );
  }

  if (type === "file") {
    return (
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#011527",
            mb: 0.5,
          }}
        >
          {label}
          {required && <span style={{ color: "#D32F2F" }}> *</span>}
        </Typography>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              disabled={disabled}
              sx={{
                borderColor: "#D9C48C",
                color: "#011527",
                textTransform: "none",
                fontWeight: 600,
                justifyContent: "flex-start",
                "&:hover": {
                  borderColor: "#B8A361",
                  backgroundColor: "rgba(217, 196, 140, 0.08)",
                },
              }}
            >
              {value ? value.name || "File selected" : "Choose file"}
              <input
                {...field}
                type="file"
                hidden
                disabled={disabled}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file);
                }}
              />
            </Button>
          )}
        />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column">
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          fontSize: "0.95rem",
          color: "#011527",
          mb: 0.5,
        }}
      >
        {label}
        {required && <span style={{ color: "#D32F2F" }}> *</span>}
      </Typography>

      {type === "select" ? (
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <FormControl fullWidth error={!!error}>
              <Select
                {...field}
                displayEmpty
                disabled={disabled}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#FFFFFF",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #E5E7EB",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D9C48C",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
          )}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <TextField
              {...field}
              type={type}
              fullWidth
              disabled={disabled}
              error={!!error}
              placeholder={`Enter ${label.toLowerCase()}`}
              InputLabelProps={type === "date" ? { shrink: true } : undefined}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#FFFFFF",
                  "& fieldset": {
                    border: "1px solid #E5E7EB",
                  },
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
      )}
    </Box>
  );
};

// Form Section Component
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        backgroundColor: "#FAFAFA",
        mb: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#011527",
          mb: 2,
          fontSize: "1.1rem",
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

// Form Data Interface based on client requirements
interface DocumentFormData {
  // Basic Information
  staffCode: string;
  staffName: string;
  documentType: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  issuePlace: string;
  issueCountry: string;
  
  // Additional Details
  status: string;
  remarks: string;
  isVerified: boolean;
  verifiedBy: string;
  verifiedDate: string;
  
  // File Upload
  documentFile: any;
  
  // Notification Settings
  enableExpiryAlert: boolean;
  alertBeforeDays: string;
}

// Main Component
const NewDocument: FC = () => {
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewConfirmDialog, setShowNewConfirmDialog] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm<DocumentFormData>({
    defaultValues: {
      staffCode: "",
      staffName: "",
      documentType: "",
      documentNumber: "",
      issueDate: "",
      expiryDate: "",
      issuePlace: "",
      issueCountry: "",
      status: "Active",
      remarks: "",
      isVerified: false,
      verifiedBy: "",
      verifiedDate: "",
      documentFile: null,
      enableExpiryAlert: true,
      alertBeforeDays: "30",
    },
  });

  const onSubmit = async (data: DocumentFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting document data:", data);

      // Create FormData for file upload
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === "boolean") {
          formData.append(key, value ? "Yes" : "No");
        } else {
          formData.append(key, value?.toString() || "");
        }
      });

      // TODO: Replace with actual API call
      // const response = await apiClient.post("/PostEmployeeDocument", formData, {
      //   headers: { "Content-Type": "multipart/form-data" }
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSnackbar({
        open: true,
        message: "Document registered successfully!",
        severity: "success",
      });

      // Keep form data after successful submission
      // reset();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSnackbar({
        open: true,
        message: "Failed to register document. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePillButtonClick = (index: number, title?: string) => {
    setActiveBtn(index);

    if (title === "New") {
      setShowNewConfirmDialog(true);
    } else if (title === "Save") {
      // The button will trigger form submit through type="submit"
    }
  };

  const handleConfirmNew = () => {
    reset();
    setShowNewConfirmDialog(false);
    setActiveBtn(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ px: { xs: 1, sm: 2 } }}>
      {/* Action Bar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
        }}
      >
        <Box
          component="h1"
          sx={{
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            fontWeight: 600,
            color: "var(--primary)",
            m: 0,
          }}
        >
          New Document Registration
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-end" } }}>
          <PillButton
            index={0}
            onClick={() => handlePillButtonClick(0, "New")}
            isActive={activeBtn === 0}
          >
            <AddIcon fontSize="small" />
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              New
            </Box>
          </PillButton>

          <PillButton
            index={1}
            type="submit"
            onClick={() => handlePillButtonClick(1, "Save")}
            isActive={activeBtn === 1}
          >
            {isSubmitting && activeBtn === 1 ? (
              <CircularProgress size={16} sx={{ color: "inherit" }} />
            ) : (
              <SaveIcon fontSize="small" />
            )}
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Save
            </Box>
          </PillButton>

          <PillButton
            index={2}
            onClick={() => handlePillButtonClick(2, "Search")}
            isActive={activeBtn === 2}
          >
            <SearchIcon fontSize="small" />
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Search
            </Box>
          </PillButton>

          <PillButton
            index={3}
            onClick={() => handlePillButtonClick(3, "List")}
            isActive={activeBtn === 3}
          >
            <ListIcon fontSize="small" />
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              List
            </Box>
          </PillButton>
        </Box>
      </Box>

      {/* Basic Information Section */}
      <FormSection title="Basic Information">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Staff Code"
              name="staffCode"
              required
              control={control}
              error={errors.staffCode}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Staff Name"
              name="staffName"
              required
              control={control}
              error={errors.staffName}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Document Type"
              name="documentType"
              type="select"
              required
              control={control}
              options={[
                "Passport",
                "Visa",
                "Emirates ID",
                "Labour Card",
                "Insurance Card",
                "Driving License",
                "Education Certificate",
                "Experience Certificate",
                "Medical Certificate",
                "Police Clearance",
                "Other",
              ]}
              error={errors.documentType}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Document Number"
              name="documentNumber"
              required
              control={control}
              error={errors.documentNumber}
            />
          </Grid>
        </Grid>
      </FormSection>

      {/* Document Details Section */}
      <FormSection title="Document Details">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Issue Date"
              name="issueDate"
              type="date"
              required
              control={control}
              error={errors.issueDate}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Expiry Date"
              name="expiryDate"
              type="date"
              required
              control={control}
              error={errors.expiryDate}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Issue Place"
              name="issuePlace"
              required
              control={control}
              error={errors.issuePlace}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Issue Country"
              name="issueCountry"
              type="select"
              required
              control={control}
              options={[
                "UAE",
                "India",
                "Pakistan",
                "Bangladesh",
                "Philippines",
                "Egypt",
                "Jordan",
                "Sri Lanka",
                "Nepal",
                "Other",
              ]}
              error={errors.issueCountry}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Status"
              name="status"
              type="select"
              required
              control={control}
              options={["Active", "Expired", "Pending", "Cancelled", "Renewed"]}
              error={errors.status}
            />
          </Grid>
        </Grid>
      </FormSection>

      {/* Verification Details Section */}
      <FormSection title="Verification Details">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Is Verified"
              name="isVerified"
              type="checkbox"
              control={control}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Verified By"
              name="verifiedBy"
              control={control}
              error={errors.verifiedBy}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Verified Date"
              name="verifiedDate"
              type="date"
              control={control}
              error={errors.verifiedDate}
            />
          </Grid>
        </Grid>
      </FormSection>

      {/* Document Upload Section */}
      <FormSection title="Document Upload">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormField
              label="Upload Document"
              name="documentFile"
              type="file"
              control={control}
              error={errors.documentFile}
            />
          </Grid>
        </Grid>
      </FormSection>

      {/* Expiry Alert Settings Section */}
      <FormSection title="Expiry Alert Settings">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Enable Expiry Alert"
              name="enableExpiryAlert"
              type="checkbox"
              control={control}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormField
              label="Alert Before Days"
              name="alertBeforeDays"
              type="number"
              control={control}
              error={errors.alertBeforeDays}
            />
          </Grid>
        </Grid>
      </FormSection>

      {/* Remarks Section */}
      <FormSection title="Remarks">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <FormField
              label="Remarks"
              name="remarks"
              control={control}
              error={errors.remarks}
            />
          </Grid>
        </Grid>
      </FormSection>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog for New button */}
      <Dialog
        open={showNewConfirmDialog}
        onClose={() => setShowNewConfirmDialog(false)}
      >
        <DialogTitle>Clear Form?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear the form? All unsaved data will be
            lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowNewConfirmDialog(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmNew} color="error" autoFocus>
            Clear Form
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewDocument;
