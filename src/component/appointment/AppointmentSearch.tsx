import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  CircularProgress,
  Paper,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import apiClient from "../../config/api";

interface AppointmentSearchProps {
  onSelect: (appointment: any) => void;
  isVisible: boolean;
}

const AppointmentSearch: React.FC<AppointmentSearchProps> = ({
  onSelect,
  isVisible,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Reset search when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setSearchQuery("");
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [isVisible]);

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim() || !isVisible) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await apiClient.get(
          `/GetEmployeeAppointment_search?search=${encodeURIComponent(
            searchQuery
          )}`
        );
        const results = response.data?.employeeAppointment || [];
        setSearchResults(results);
        console.log("Search results:", results);
      } catch (error) {
        console.error("Error searching appointments:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <TextField
        fullWidth
        label="Search by Reference No or Staff Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        InputProps={{
          endAdornment: isSearching ? <CircularProgress size={20} /> : null,
        }}
      />
      {searchResults.length > 0 && (
        <Paper sx={{ mt: 1, maxHeight: 300, overflowY: "auto" }} elevation={3}>
          <List>
            {searchResults.map((appointment: any, index: number) => (
              <ListItemButton key={index} onClick={() => onSelect(appointment)}>
                <ListItemText
                  primary={`${appointment.reference_No || ""} - ${
                    appointment.staff_Name || "No Name"
                  }`}
                  secondary={`Status: ${
                    appointment.appointment_Status || "N/A"
                  } | Date: ${appointment.appointment_Date || "N/A"}`}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default AppointmentSearch;
