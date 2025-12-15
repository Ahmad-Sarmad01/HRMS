import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DocumentData {
  id: string;
  documentType: string;
  documentNumber: string;
  issuePlace: string;
  issueDate: string;
  expiryDate: string;
}

interface DocumentGridProps {
  documents: DocumentData[];
  loading?: boolean;
}

const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  loading = false,
}) => {
  const columns: GridColDef[] = [
    {
      field: "documentType",
      headerName: "Document Type",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "documentNumber",
      headerName: "Document Number",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "issuePlace",
      headerName: "Issue Place",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "issueDate",
      headerName: "Issue Date",
      flex: 1,
      minWidth: 120,
      valueFormatter: (value: any) => {
        if (!value) return "";
        const date = new Date(value);
        return date.toLocaleDateString("en-GB");
      },
    },
    {
      field: "expiryDate",
      headerName: "Expiry Date",
      flex: 1,
      minWidth: 120,
      valueFormatter: (value: any) => {
        if (!value) return "";
        const date = new Date(value);
        return date.toLocaleDateString("en-GB");
      },
      cellClassName: (params: any) => {
        if (!params.value) return "";
        const expiryDate = new Date(params.value);
        const today = new Date();
        const daysUntilExpiry = Math.ceil(
          (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysUntilExpiry < 0) return "expired-cell";
        if (daysUntilExpiry <= 30) return "expiring-soon-cell";
        return "";
      },
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        "& .MuiDataGrid-root": {
          border: "1px solid #E5E7EB",
          borderRadius: 2,
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#FAFAFA",
          color: "#011527",
          fontWeight: 600,
        },
        "& .MuiDataGrid-cell": {
          fontSize: "0.9rem",
          color: "#011527",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "rgba(217, 196, 140, 0.08)",
        },
        "& .expired-cell": {
          color: "#D32F2F",
          fontWeight: 600,
        },
        "& .expiring-soon-cell": {
          color: "#ED6C02",
          fontWeight: 600,
        },
      }}
    >
      <DataGrid
        rows={documents}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        autoHeight
        sx={{
          minHeight: 400,
        }}
      />
    </Box>
  );
};

export default DocumentGrid;
export type { DocumentData };
