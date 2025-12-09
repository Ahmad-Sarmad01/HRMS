import { FC, useEffect, useState } from "react";
import { Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import { employeeService } from "../../services/employeeService";
import { Employee } from "../../types/employee";
import EmployeeTable from "../../component/employee/EmployeeTable";
import EmployeeDetailModal from "../../component/employee/EmployeeDetailModal";

const EmployeeList: FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
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

      <EmployeeDetailModal
        open={isModalOpen}
        onClose={handleCloseModal}
        employee={selectedEmployee}
      />

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
