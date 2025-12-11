import { FC, useEffect, useState } from "react";
import { Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { employeeService } from "../../services/employeeService";
import { Employee } from "../../types/employee";
import EmployeeTable from "../../component/employee/EmployeeTable";
import EmployeeListButtons from "../../component/employee/EmployeeListButtons";
import EmployeeActionsMenu from "../../component/employee/EmployeeActionsMenu";
import EmployeeSearch from "../../component/employee/EmployeeSearch";
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

  // Search states
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Menu states
  const [activeBtn, setActiveBtn] = useState<number>(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(menuAnchorEl);

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await employeeService.searchEmployees(searchQuery);
        setSearchResults(results);
        console.log("Search results:", results);
      } catch (error) {
        console.error("Error searching employees:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handlePillButtonClick = (index: number, title: string) => {
    setActiveBtn(index);

    if (title === "Search") {
      // Toggle search
      setShowSearch(!showSearch);
      if (!showSearch) {
        setSearchQuery("");
        setSearchResults([]);
      }
    }
    // Handle other buttons as needed
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2,
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
          Employee Register
        </Box>
        <Box onMouseLeave={handleMenuClose}>
          <EmployeeListButtons
            activeBtn={activeBtn}
            onButtonClick={handlePillButtonClick}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
          />
          <EmployeeActionsMenu
            anchorEl={menuAnchorEl}
            onClose={handleMenuClose}
          />
        </Box>
      </Box>

      {showSearch && (
        <EmployeeSearch
          searchQuery={searchQuery}
          searchResults={searchResults}
          isSearching={isSearching}
          onSearchChange={setSearchQuery}
          onSelectEmployee={handleView}
        />
      )}

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
