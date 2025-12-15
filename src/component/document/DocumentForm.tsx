import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, Typography, Button, Paper } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { SelectInput, DateInput } from "../formFields";

interface DocumentFormData {
  employeeId: string;
  documentType: string;
  issueDate: string;
  documentFile: any;
}

interface DocumentFormProps {
  onSubmit: (data: DocumentFormData) => void;
  isSubmitting?: boolean;
  formRef?: React.RefObject<HTMLFormElement | null>;
  resetTrigger?: number;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  onSubmit,
  isSubmitting = false,
  formRef,
  resetTrigger = 0,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DocumentFormData>({
    defaultValues: {
      employeeId: "",
      documentType: "",
      issueDate: "",
      documentFile: null,
    },
  });

  // Reset form when resetTrigger changes
  React.useEffect(() => {
    if (resetTrigger > 0) {
      reset();
    }
  }, [resetTrigger, reset]);

  return (
    <Box
      component="form"
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mb: 3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid #E5E7EB",
          borderRadius: 2,
          backgroundColor: "#FAFAFA",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#011527",
            mb: 3,
            fontSize: "1.1rem",
          }}
        >
          Document Information
        </Typography>

        <Grid container spacing={3}>
          {/* Employee Selection */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <SelectInput
              name="employeeId"
              control={control}
              label="Select Employee"
              options={[
                "John Doe (EMP001)",
                "Jane Smith (EMP002)",
                "Ahmed Ali (EMP003)",
                "Sarah Johnson (EMP004)",
                "Mohammed Khan (EMP005)",
              ]}
              required
              disabled={isSubmitting}
            />
          </Grid>

          {/* Document Type */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <SelectInput
              name="documentType"
              control={control}
              label="Document Type"
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
              required
              disabled={isSubmitting}
            />
          </Grid>

          {/* Issue Date */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <DateInput
              name="issueDate"
              control={control}
              label="Issue Date"
              required
              disabled={isSubmitting}
            />
          </Grid>

          {/* File Upload */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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
                Upload Document <span style={{ color: "#D32F2F" }}> *</span>
              </Typography>
              <Controller
                name="documentFile"
                control={control}
                rules={{ required: "Document file is required" }}
                render={({
                  field: { onChange, value, ...field },
                  fieldState: { error },
                }) => (
                  <>
                    <Button
                      component="label"
                      variant="outlined"
                      fullWidth
                      disabled={isSubmitting}
                      startIcon={<UploadFileIcon />}
                      sx={{
                        mt: 0.5,
                        borderRadius: 2,
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
                      {value?.name || "Choose file"}
                      <input
                        {...field}
                        type="file"
                        hidden
                        disabled={isSubmitting}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file);
                        }}
                      />
                    </Button>
                    {error && (
                      <Typography
                        variant="caption"
                        sx={{ color: "#D32F2F", mt: 0.5 }}
                      >
                        {error.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default DocumentForm;
export type { DocumentFormData };
