import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import apiClient from "../../config/api";

interface AppointmentListProps {
  onSelect: (appointment: any) => void;
  onError: (message: string) => void;
  isVisible?: boolean;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  onSelect,
  onError,
  isVisible = true,
}) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const columns: GridColDef[] = [
    { field: "reference_No", headerName: "Ref No", width: 120 },
    { field: "staff_Name", headerName: "Staff Name", width: 200 },
    { field: "designation", headerName: "Designation", width: 150 },
    { field: "appointment_Date", headerName: "Date", width: 120 },
    { field: "date_of_Joining", headerName: "Joining Date", width: 120 },
    { field: "recruitment_Type", headerName: "Type", width: 150 },
    { field: "appointment_Status", headerName: "Status", width: 120 },
    { field: "salary", headerName: "Salary", width: 100 },
  ];

  useEffect(() => {
    if (isVisible && !hasFetched) {
      fetchAllAppointments();
    }
  }, [isVisible, hasFetched]);

  const fetchAllAppointments = async () => {
    if (hasFetched) return; // Prevent duplicate fetches

    try {
      setIsLoading(true);
      const response = await apiClient.get("/GetEmployeeAppointment");
      const data = response.data?.employeeAppointment || [];
      setAppointments(data);
      setHasFetched(true);
      console.log("Fetched appointments:", data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      onError("Failed to fetch appointments");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3, height: 600, width: "100%" }}>
      <DataGrid
        rows={appointments}
        columns={columns}
        getRowId={(row) => row.reference_No || Math.random()}
        pageSizeOptions={[5, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onRowClick={(params) => onSelect(params.row)}
        sx={{
          cursor: "pointer",
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      />
    </Box>
  );
};

export default AppointmentList;
