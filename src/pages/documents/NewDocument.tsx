import React, { FC, useState, useRef, useEffect } from "react";
import {
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DocumentActionBar from "../../component/document/DocumentActionBar";
import DocumentForm, {
  DocumentFormData,
} from "../../component/document/DocumentForm";
import DocumentGrid, {
  DocumentData,
} from "../../component/document/DocumentGrid";

const NewDocument: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewConfirmDialog, setShowNewConfirmDialog] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const formRef = useRef<HTMLFormElement>(null);

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoadingDocuments(true);

      // TODO: Replace with actual API call
      // const response = await apiClient.get("/GetEmployeeDocuments");
      // setDocuments(response.data);

      // Mock data for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockDocuments: DocumentData[] = [
        {
          id: "1",
          documentType: "Passport",
          documentNumber: "P12345678",
          issuePlace: "Dubai",
          issueDate: "2020-01-15",
          expiryDate: "2025-01-14",
        },
        {
          id: "2",
          documentType: "Emirates ID",
          documentNumber: "784-1990-1234567-1",
          issuePlace: "Abu Dhabi",
          issueDate: "2021-03-20",
          expiryDate: "2024-03-19",
        },
        {
          id: "3",
          documentType: "Visa",
          documentNumber: "VIS987654",
          issuePlace: "Sharjah",
          issueDate: "2022-06-10",
          expiryDate: "2026-01-10",
        },
        {
          id: "4",
          documentType: "Labour Card",
          documentNumber: "LC456789",
          issuePlace: "Ajman",
          issueDate: "2021-09-05",
          expiryDate: "2024-12-25",
        },
        {
          id: "5",
          documentType: "Driving License",
          documentNumber: "DL123456",
          issuePlace: "Dubai",
          issueDate: "2019-11-12",
          expiryDate: "2029-11-11",
        },
      ];

      setDocuments(mockDocuments);
    } catch (error: any) {
      console.error("Error fetching documents:", error);
      setSnackbar({
        open: true,
        message: "Failed to load documents.",
        severity: "error",
      });
    } finally {
      setIsLoadingDocuments(false);
    }
  };

  const onSubmit = async (data: DocumentFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting document data:", data);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("employeeId", data.employeeId);
      formData.append("documentType", data.documentType);
      formData.append("issueDate", data.issueDate);
      if (data.documentFile) {
        formData.append("documentFile", data.documentFile);
      }

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

      // Refresh the document list
      await fetchDocuments();

      // Optionally clear the form after successful submission
      // setResetTrigger((prev) => prev + 1);
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

  const handleNew = () => {
    setShowNewConfirmDialog(true);
  };

  const handleSave = () => {
    // Trigger form submission
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const handleConfirmNew = () => {
    setResetTrigger((prev) => prev + 1);
    setShowNewConfirmDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 2 } }}>
      {/* Action Bar */}
      <DocumentActionBar
        onNew={handleNew}
        onSave={handleSave}
        isSaving={isSubmitting}
      />

      {/* Document Form */}
      <DocumentForm
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        formRef={formRef}
        resetTrigger={resetTrigger}
      />

      {/* Document Grid */}
      <DocumentGrid documents={documents} loading={isLoadingDocuments} />

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
