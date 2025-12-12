import { FC } from "react";
import {
  Box,
  TextField,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";

interface EmployeeSearchProps {
  searchQuery: string;
  searchResults: any[];
  isSearching: boolean;
  onSearchChange: (query: string) => void;
  onSelectEmployee: (employee: any) => void;
}

const EmployeeSearch: FC<EmployeeSearchProps> = ({
  searchQuery,
  searchResults,
  isSearching,
  onSearchChange,
  onSelectEmployee,
}) => {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <TextField
        fullWidth
        label="Search by Staff Code or Name"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        InputProps={{
          endAdornment: isSearching ? <CircularProgress size={20} /> : null,
        }}
      />
      {searchResults.length > 0 && (
        <Paper sx={{ mt: 1, maxHeight: 200, overflowY: "auto" }} elevation={3}>
          <List>
            {searchResults.map((employee, index) => (
              <ListItemButton
                key={index}
                onClick={() => onSelectEmployee(employee)}
              >
                <ListItemText
                  primary={`${employee.staff_Code || ""} - ${
                    employee.staff_Name || employee.arabic_Name || "No Name"
                  }`}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default EmployeeSearch;
