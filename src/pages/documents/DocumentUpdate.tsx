import React, { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Paper,
  IconButton,
  Button,
  InputAdornment,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";

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
  type?: "text" | "date" | "select" | "number" | "file";
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
        p: { xs: 1.5, sm: 2 },
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
          fontSize: { xs: "1rem", sm: "1.1rem" },
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

// Document Update Form Data Interface
interface DocumentUpdateFormData {
  // Search Criteria
  staffCode: string;
  staffName: string;
  documentType: string;
  
  // Document Details for Update
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  issuePlace: string;
  issueCountry: string;
  status: string;
  remarks: string;
  
  // Update Details
  updateReason: string;
  updatedBy: string;
  updateDate: string;
  
  // File Upload for replacement
  replacementDocument: any;
}

// Mock data for document records
interface DocumentRecord {
  id: number;
  staffCode: string;
  staffName: string;
  documentType: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  lastUpdated: string;
}

// Main Component
const DocumentUpdate: FC = () => {
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentRecord | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Mock data - replace with actual API call
  const [documentRecords] = useState<DocumentRecord[]>([
    {
      id: 1,
      staffCode: "EMP001",
      staffName: "John Doe",
      documentType: "Passport",
      documentNumber: "AB123456",
      issueDate: "2020-01-15",
      expiryDate: "2025-01-15",
      status: "Active",
      lastUpdated: "2024-01-10",
    },
    {
      id: 2,
      staffCode: "EMP002",
      staffName: "Jane Smith",
      documentType: "Emirates ID",
      documentNumber: "784-1234-5678901-2",
      issueDate: "2021-03-20",
      expiryDate: "2026-03-20",
      status: "Active",
      lastUpdated: "2024-02-15",
    },
    {
      id: 3,
      staffCode: "EMP003",
      staffName: "Ahmed Hassan",
      documentType: "Visa",
      documentNumber: "VS789012",
      issueDate: "2022-06-10",
      expiryDate: "2025-06-10",
      status: "Expiring Soon",
      lastUpdated: "2024-03-01",
    },
  ]);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<DocumentUpdateFormData>({
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
      updateReason: "",
      updatedBy: "",
      updateDate: new Date().toISOString().split('T')[0],
      replacementDocument: null,
    },
  });

  // DataGrid columns
  const columns: GridColDef[] = [
    { field: "staffCode", headerName: "Staff Code", width: 120 },
    { field: "staffName", headerName: "Staff Name", width: 180 },
    { field: "documentType", headerName: "Document Type", width: 150 },
    { field: "documentNumber", headerName: "Document No.", width: 150 },
    { field: "issueDate", headerName: "Issue Date", width: 120 },
    { field: "expiryDate", headerName: "Expiry Date", width: 120 },
    { 
      field: "status", 
      headerName: "Status", 
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.875rem",
            fontWeight: 600,
            backgroundColor: 
              params.value === "Active" ? "rgba(16, 185, 129, 0.1)" :
              params.value === "Expiring Soon" ? "rgba(245, 158, 11, 0.1)" :
              "rgba(239, 68, 68, 0.1)",
            color:
              params.value === "Active" ? "#10B981" :
              params.value === "Expiring Soon" ? "#F59E0B" :
              "#EF4444",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    { field: "lastUpdated", headerName: "Last Updated", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => handleView(params.row)}
            sx={{
              color: "#3B82F6",
              "&:hover": { backgroundColor: "rgba(59, 130, 246, 0.1)" },
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleEdit(params.row)}
            sx={{
              color: "#D9C48C",
              "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.1)" },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDelete(params.row.id)}
            sx={{
              color: "#EF4444",
              "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.1)" },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleView = (document: DocumentRecord) => {
    console.log("Viewing document:", document);
    setSelectedDocument(document);
    setShowUpdateForm(true);
    // Populate form with document data
    setValue("staffCode", document.staffCode);
    setValue("staffName", document.staffName);
    setValue("documentType", document.documentType);
    setValue("documentNumber", document.documentNumber);
    setValue("issueDate", document.issueDate);
    setValue("expiryDate", document.expiryDate);
    setValue("status", document.status);
  };

  const handleEdit = (document: DocumentRecord) => {
    console.log("Editing document:", document);
    setSelectedDocument(document);
    setShowUpdateForm(true);
    // Populate form with document data
    setValue("staffCode", document.staffCode);
    setValue("staffName", document.staffName);
    setValue("documentType", document.documentType);
    setValue("documentNumber", document.documentNumber);
    setValue("issueDate", document.issueDate);
    setValue("expiryDate", document.expiryDate);
    setValue("status", document.status);
  };

  const handleDelete = (id: number) => {
    console.log("Deleting document:", id);
    setSnackbar({
      open: true,
      message: "Document deleted successfully!",
      severity: "success",
    });
  };

  const onSubmit = async (data: DocumentUpdateFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Updating document:", data);

      // TODO: Replace with actual API call
      // const response = await apiClient.put("/UpdateEmployeeDocument", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSnackbar({
        open: true,
        message: "Document updated successfully!",
        severity: "success",
      });

      setShowUpdateForm(false);
      reset();
    } catch (error: any) {
      console.error("Error updating document:", error);
      setSnackbar({
        open: true,
        message: "Failed to update document. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePillButtonClick = (index: number, title?: string) => {
    setActiveBtn(index);

    if (title === "Search") {
      // Search functionality
      console.log("Searching:", searchQuery);
    } else if (title === "Refresh") {
      setSearchQuery("");
      setShowUpdateForm(false);
      reset();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const CustomNoRowsOverlay = () => (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography color="text.secondary">
        No documents found. Try adjusting your search criteria.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ px: { xs: 1, sm: 2 } }}>
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
          Document Update Details
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center", justifyContent: { xs: "center", md: "flex-end" } }}>
          <TextField
            size="small"
            placeholder="Search by Staff Code or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: { xs: "100%", sm: 250 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                "& fieldset": {
                  borderColor: "#D9C48C",
                },
                "&:hover fieldset": {
                  borderColor: "#D9C48C",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#D9C48C",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => handlePillButtonClick(0, "Search")}
                    sx={{
                      color: "var(--primary)",
                      "&:hover": {
                        backgroundColor: "rgba(217, 196, 140, 0.1)",
                      },
                    }}
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <PillButton
            index={1}
            onClick={() => handlePillButtonClick(1, "Refresh")}
            isActive={activeBtn === 1}
          >
            <RefreshIcon fontSize="small" />
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              Refresh
            </Box>
          </PillButton>
        </Box>
      </Box>

      {/* Document List DataGrid */}
      {!showUpdateForm && (
        <Paper sx={{ width: "100%", mb: 3, overflow: "auto" }}>
          <Box sx={{ height: 500, width: "100%", minWidth: { xs: 800, md: "100%" } }}>
            <DataGrid
              rows={documentRecords}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 25, 50]}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              sx={{
                border: 0,
                "& .MuiDataGrid-cell:hover": {
                  cursor: "pointer",
                },
                "& .MuiDataGrid-columnHeaders": {
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                },
                "& .MuiDataGrid-cell": {
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                },
              }}
            />
          </Box>
        </Paper>
      )}

      {/* Update Form */}
      {showUpdateForm && (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Document Information Section */}
          <FormSection title="Document Information">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormField
                  label="Staff Code"
                  name="staffCode"
                  required
                  control={control}
                  disabled
                  error={errors.staffCode}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormField
                  label="Staff Name"
                  name="staffName"
                  required
                  control={control}
                  disabled
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

          {/* Update Details Section */}
          <FormSection title="Update Details">
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
                  control={control}
                  error={errors.issuePlace}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormField
                  label="Issue Country"
                  name="issueCountry"
                  type="select"
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

          {/* Update Information Section */}
          <FormSection title="Update Information">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                  label="Update Reason"
                  name="updateReason"
                  type="select"
                  required
                  control={control}
                  options={[
                    "Document Renewal",
                    "Information Correction",
                    "Document Replacement",
                    "Expiry Date Extension",
                    "Status Change",
                    "Other",
                  ]}
                  error={errors.updateReason}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                  label="Updated By"
                  name="updatedBy"
                  required
                  control={control}
                  error={errors.updatedBy}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                  label="Update Date"
                  name="updateDate"
                  type="date"
                  required
                  control={control}
                  error={errors.updateDate}
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* Document Replacement Section */}
          <FormSection title="Document Replacement (Optional)">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <FormField
                  label="Upload Replacement Document"
                  name="replacementDocument"
                  type="file"
                  control={control}
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

          {/* Form Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", md: "flex-end" }, mb: 3, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              onClick={() => {
                setShowUpdateForm(false);
                reset();
              }}
              fullWidth={false}
              sx={{
                borderColor: "#D9C48C",
                color: "#011527",
                textTransform: "none",
                fontWeight: 600,
                minWidth: { xs: "45%", sm: 120 },
                "&:hover": {
                  borderColor: "#B8A361",
                  backgroundColor: "rgba(217, 196, 140, 0.08)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              fullWidth={false}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={20} sx={{ color: "inherit" }} />
                ) : (
                  <SaveIcon />
                )
              }
              sx={{
                backgroundColor: "#D9C48C",
                color: "#011527",
                textTransform: "none",
                fontWeight: 600,
                minWidth: { xs: "45%", sm: 180 },
                "&:hover": {
                  backgroundColor: "#B8A361",
                },
              }}
            >
              {isSubmitting ? "Updating..." : "Update Document"}
            </Button>
          </Box>
        </Box>
      )}

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
    </Box>
  );
};

export default DocumentUpdate;
