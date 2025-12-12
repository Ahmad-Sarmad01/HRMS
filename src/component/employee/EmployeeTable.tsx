import { FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Employee } from "../../types/employee";

interface EmployeeTableProps {
  employees: Employee[];
  onView: (employee: Employee) => void;
}

const EmployeeTable: FC<EmployeeTableProps> = ({ employees, onView }) => {
  const columns: GridColDef[] = [
    { field: "staff_Code", headerName: "Staff Code", flex: 1 },
    { field: "staff_Name", headerName: "Staff Name", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      // flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => onView(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", mt: 3 }}>
      <DataGrid
        rows={employees}
        columns={columns}
        getRowId={(row) => row.staff_Code}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default EmployeeTable;
