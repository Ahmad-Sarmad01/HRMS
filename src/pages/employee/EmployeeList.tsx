import { FC, useEffect, useState } from "react";
import { Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { employeeService } from "../../services/employeeService";
import { Employee } from "../../types/employee";
import EmployeeTable from "../../component/employee/EmployeeTable";
import { setSelectedEmployee } from "../../store/slices/employeeSlice";

const EmployeeList: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const data = await employeeService.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch employees",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (employee: Employee) => {
    console.log("Viewing employee:", employee);
    dispatch(setSelectedEmployee(employee));
    navigate("/employees/new");
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <EmployeeTable employees={employees} onView={handleView} />
      )}

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

export default EmployeeList;
