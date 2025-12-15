import { FC, useState, useEffect } from "react";
import { Control, FieldValues } from "react-hook-form";
import { employeeService } from "../../services/employeeService";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import IconButtonPrimary from "../buttons/iconButtonPrimary";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";

interface DependantItem {
  id: string;
  name: string;
  relationship: string;
  dob: string;
  age: string;
  maritalStatus: string;
  medical: boolean;
  status: string;
  remarks: string;
}

interface DependantFormProps<T extends FieldValues> {
  control: Control<T>;
  disabled?: boolean;
  staffCode?: string;
  companyID?: string;
  onDependantAdded?: () => void;
}

const DependantForm = <T extends FieldValues>({
  control,
  disabled = false,
  staffCode,
  companyID,
  onDependantAdded,
}: DependantFormProps<T>) => {
  // Dependant State
  const [dependantRows, setDependantRows] = useState<DependantItem[]>([]);
  const [dependantOpen, setDependantOpen] = useState(false);
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [medical, setMedical] = useState(false);
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [isSubmittingDependant, setIsSubmittingDependant] = useState(false);
  const [dependantError, setDependantError] = useState<string | null>(null);
  const [dependantSuccess, setDependantSuccess] = useState<string | null>(null);
  const [isLoadingDependants, setIsLoadingDependants] = useState(false);

  // Fetch dependants when staffCode is available
  useEffect(() => {
    if (staffCode) {
      fetchDependants();
    }
  }, [staffCode]);

  const fetchDependants = async () => {
    if (!staffCode) return;

    setIsLoadingDependants(true);
    try {
      const response = await employeeService.getEmployeeDependants(staffCode);
      if (response.isSuccess && response.employeeDependant) {
        const mappedDependants: DependantItem[] =
          response.employeeDependant.map((item: any, index: number) => ({
            id: `${staffCode}_dep_${index}`, // Unique id
            name: item.name || "",
            relationship: item.relationship || "",
            dob: formatDateForInput(item.date_Of_Birth),
            age: calculateAge(item.date_Of_Birth) || "",
            maritalStatus: item.marital_Status || "",
            medical: item.medical === "Yes",
            status: item.status || "",
            remarks: item.remarks || "",
          }));
        setDependantRows(mappedDependants);
      }
    } catch (error: any) {
      console.error("Error fetching dependants:", error);
      // Optionally set an error state
    } finally {
      setIsLoadingDependants(false);
    }
  };

  // Helper function to format API date to YYYY-MM-DD
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return "";
    // API returns "12/14/2025 12:00:00 AM"
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  // Helper function to calculate age from date of birth
  const calculateAge = (dateString: string): string => {
    if (!dateString) return "";
    const birthDate = new Date(dateString);
    if (isNaN(birthDate.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age.toString();
  };

  // Dependant Columns
  const dependantColumns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    {
      field: "relationship",
      headerName: "Relationship",
      flex: 1,
      minWidth: 120,
    },
    { field: "dob", headerName: "DOB", width: 120 },
    { field: "age", headerName: "Age", width: 80 },
    {
      field: "maritalStatus",
      headerName: "Marital Status",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "medical",
      headerName: "Medical",
      width: 100,
      renderCell: (params: GridRenderCellParams) =>
        params.row.medical ? "Yes" : "No",
    },
    { field: "status", headerName: "Status", flex: 1, minWidth: 100 },
    { field: "remarks", headerName: "Remarks", flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 80,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <IconButton
            size="small"
            onClick={() => handleDependantDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        );
      },
    },
  ];

  // Dependant Handlers
  const handleDependantOpen = () => setDependantOpen(true);
  const handleDependantClose = () => {
    setDependantOpen(false);
    setName("");
    setRelationship("");
    setDob("");
    setAge("");
    setMaritalStatus("");
    setMedical(false);
    setStatus("");
    setRemarks("");
  };

  const handleDependantAdd = async () => {
    if (!name || !relationship) {
      setDependantError("Name and Relationship are required");
      return;
    }

    // Check if staffCode is available
    if (!staffCode) {
      setDependantError("Please save the employee first to add dependants");
      return;
    }

    setIsSubmittingDependant(true);
    setDependantError(null);
    setDependantSuccess(null);

    try {
      // Post to API
      await employeeService.postEmployeeDependant({
        staff_Code: staffCode,
        name: name,
        relationship: relationship,
        date_Of_Birth: dob,
        marital_Status: maritalStatus,
        medical: medical ? "Yes" : "No",
        status: status,
        remarks: remarks,
        upload_Photo_Name: "",
        companyID: companyID || "",
      });

      // Add to local state on success
      const newItem: DependantItem = {
        id: Date.now().toString(),
        name,
        relationship,
        dob,
        age,
        maritalStatus,
        medical,
        status,
        remarks,
      };
      setDependantRows((prev) => [newItem, ...prev]);
      setDependantSuccess("Dependant added successfully");

      // Notify parent if callback provided
      if (onDependantAdded) {
        onDependantAdded();
      }

      // Close dialog after a brief delay to show success message
      setTimeout(() => {
        handleDependantClose();
        setDependantSuccess(null);
      }, 1500);
    } catch (error: any) {
      console.error("Error adding dependant:", error);
      setDependantError(
        error.message || "Failed to add dependant. Please try again."
      );
    } finally {
      setIsSubmittingDependant(false);
    }
  };

  const handleDependantDelete = (id: string) => {
    setDependantRows((prev) => prev.filter((r) => r.id !== id));
  };

  const CustomNoRowsOverlay = ({ message }: { message: string }) => (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );

  return (
    <Box>
      {/* Dependant Section */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <IconButtonPrimary
            icon={<AddIcon />}
            label="Add Dependant"
            onClick={handleDependantOpen}
          />
        </Box>

        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={dependantRows}
            columns={dependantColumns}
            initialState={{
              pagination: { paginationModel },
            }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            onPaginationModelChange={(model: GridPaginationModel) =>
              setPaginationModel(model)
            }
            slots={{
              noRowsOverlay: () => (
                <CustomNoRowsOverlay message="No dependants added yet" />
              ),
            }}
          />
        </Paper>
      </Box>

      {/* Dependant Dialog */}
      <Dialog
        open={dependantOpen}
        onClose={handleDependantClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Dependant</DialogTitle>
        <DialogContent>
          {dependantError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {dependantError}
            </Alert>
          )}
          {dependantSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {dependantSuccess}
            </Alert>
          )}
          {!staffCode && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Please save the employee first before adding dependants
            </Alert>
          )}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 1,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              label="DOB"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              label="Marital Status"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              fullWidth
            />
            <TextField
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={medical}
                  onChange={(e) => setMedical(e.target.checked)}
                />
              }
              label="Medical"
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDependantClose}
            disabled={isSubmittingDependant}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDependantAdd}
            variant="contained"
            disabled={isSubmittingDependant || !staffCode}
            sx={{
              backgroundColor: "#D9C48C",
              color: "#011527",
              textTransform: "none",
            }}
          >
            {isSubmittingDependant ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Adding...
              </>
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DependantForm;
