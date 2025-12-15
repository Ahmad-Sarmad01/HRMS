import React, { FC, useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";
import {
  DocumentUpdateHeader,
  DocumentUpdateGrid,
  EmployeeDocumentData,
} from "../../component/document";

// Main Component
const DocumentUpdate: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  // Mock data for employee documents
  const mockData: EmployeeDocumentData[] = [
    {
      id: 1,
      sNo: 1,
      code: "EMP001",
      staffName: "John Doe",
      designation: "Software Engineer",
      doj: "2023-01-15",
      status: "Active",
      emiratesId: "784-1234-5678901-2",
      insurance: "INS123456",
      passport: "AB123456",
      branch: "Dubai",
    },
    {
      id: 2,
      sNo: 2,
      code: "EMP002",
      staffName: "Jane Smith",
      designation: "Project Manager",
      doj: "2022-03-20",
      status: "Active",
      emiratesId: "784-2345-6789012-3",
      insurance: "INS234567",
      passport: "CD234567",
      branch: "Abu Dhabi",
    },
    {
      id: 3,
      sNo: 3,
      code: "EMP003",
      staffName: "Ahmed Hassan",
      designation: "Designer",
      doj: "2023-06-10",
      status: "Active",
      emiratesId: "784-3456-7890123-4",
      insurance: "INS345678",
      passport: "EF345678",
      branch: "Sharjah",
    },
  ];

  // Handler functions
  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    setSnackbar({
      open: true,
      message: "Excel export functionality will be implemented soon!",
      severity: "info",
    });
  };

  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
    setSnackbar({
      open: true,
      message: "PDF export functionality will be implemented soon!",
      severity: "info",
    });
  };

  const handleClearFilter = () => {
    setSearchQuery("");
    setSnackbar({
      open: true,
      message: "Filters cleared successfully!",
      severity: "success",
    });
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    setSnackbar({
      open: true,
      message: `Searching for: ${searchQuery}`,
      severity: "info",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with title, search, and action buttons */}
      <DocumentUpdateHeader
        onExportExcel={handleExportExcel}
        onExportPDF={handleExportPDF}
        onClearFilter={handleClearFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* DataGrid */}
      <DocumentUpdateGrid
        data={mockData}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
