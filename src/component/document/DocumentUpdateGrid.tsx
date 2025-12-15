import React from "react";
import { Box, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

// Employee Document Data Interface
export interface EmployeeDocumentData {
  id: number;
  sNo: number;
  code: string;
  staffName: string;
  designation: string;
  doj: string;
  status: string;
  emiratesId: string;
  insurance: string;
  passport: string;
  branch: string;
}

interface DocumentUpdateGridProps {
  data: EmployeeDocumentData[];
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
}

const DocumentUpdateGrid: React.FC<DocumentUpdateGridProps> = ({
  data,
  paginationModel,
  onPaginationModelChange,
}) => {
  // DataGrid columns
  const columns: GridColDef[] = [
    { field: "sNo", headerName: "S No.", width: 80 },
    { field: "code", headerName: "Code", width: 100 },
    { field: "staffName", headerName: "Staff Name", width: 150 },
    { field: "designation", headerName: "Designation", width: 150 },
    { field: "doj", headerName: "DOJ", width: 120 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "emiratesId", headerName: "Emirates ID", width: 180 },
    { field: "insurance", headerName: "Insurance", width: 120 },
    { field: "passport", headerName: "Passport", width: 120 },
    { field: "branch", headerName: "Branch", width: 120 },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={onPaginationModelChange}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #D9C48C",
              fontWeight: 600,
              color: "#011527",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(217, 196, 140, 0.04)",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default DocumentUpdateGrid;