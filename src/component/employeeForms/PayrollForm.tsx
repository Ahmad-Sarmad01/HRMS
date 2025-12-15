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
  Paper,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import IconButtonPrimary from "../buttons/iconButtonPrimary";
import FormGrid from "../formFields/FormGrid";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";

interface AllowanceItem {
  id: string;
  allowances: string;
  amount: string;
}

interface PayrollFormProps<T extends FieldValues> {
  control: Control<T>;
  disabled?: boolean;
  staffCode?: string;
  companyID?: string;
  onAllowanceAdded?: () => void;
}

const PayrollForm = <T extends FieldValues>({
  control,
  disabled = false,
  staffCode,
  companyID,
  onAllowanceAdded,
}: PayrollFormProps<T>) => {
  // Salary fields
  const salaryFields = [
    {
      name: "basicSalary",
      label: "Basic Salary",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "ministrySalary",
      label: "Ministry Salary",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "grossSalary",
      label: "Gross Salary",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
  ];

  // Contract Details fields
  const contractDetailsFields = [
    {
      name: "accommodationAmount",
      label: "Accommodation Amount",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "startDate1",
      label: "Start Date",
      type: "date",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "endDate1",
      label: "End Date",
      type: "date",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "educationalReimbursement",
      label: "Educational Reimbursement",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "startDate2",
      label: "Start Date",
      type: "date",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "endDate2",
      label: "End Date",
      type: "date",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "remarks",
      label: "Remarks",
      type: "text",
      fieldSize: "large",
      required: false,
    },
  ];

  // Bank Details fields
  const bankDetailsFields = [
    {
      name: "creditAccount",
      label: "Credit Account",
      type: "select",
      fieldSize: "normal",
      options: ["Account 1", "Account 2"],
      required: false,
    },
    {
      name: "ibanNo",
      label: "IBAN No",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "employeeBank",
      label: "Employee Bank",
      type: "select",
      fieldSize: "normal",
      options: ["Bank A", "Bank B", "Bank C"],
      required: false,
    },
  ];

  // Allowance State
  const [allowanceRows, setAllowanceRows] = useState<AllowanceItem[]>([]);
  const [allowanceOpen, setAllowanceOpen] = useState(false);
  const [selectedAllowance, setSelectedAllowance] = useState("");
  const [allowanceAmount, setAllowanceAmount] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [isSubmittingAllowance, setIsSubmittingAllowance] = useState(false);
  const [allowanceError, setAllowanceError] = useState<string | null>(null);
  const [allowanceSuccess, setAllowanceSuccess] = useState<string | null>(null);
  const [isLoadingAllowances, setIsLoadingAllowances] = useState(false);

  // Fetch allowances when staffCode is available
  useEffect(() => {
    if (staffCode) {
      fetchAllowances();
    }
  }, [staffCode]);

  const fetchAllowances = async () => {
    if (!staffCode) return;

    setIsLoadingAllowances(true);
    try {
      const response = await employeeService.getEmployeeAllowances(staffCode);
      if (response.isSuccess && response.employeeAllowance) {
        const mappedAllowances: AllowanceItem[] =
          response.employeeAllowance.map((item: any, index: number) => ({
            id: `${staffCode}_allow_${index}`, // Unique id
            allowances: item.allowance_Type || "",
            amount: item.allowance_Amount || "",
          }));
        setAllowanceRows(mappedAllowances);
      }
    } catch (error: any) {
      console.error("Error fetching allowances:", error);
      // Optionally set an error state
    } finally {
      setIsLoadingAllowances(false);
    }
  };

  // Allowance Columns
  const allowanceColumns: GridColDef[] = [
    { field: "allowances", headerName: "Allowances", flex: 1, minWidth: 200 },
    { field: "amount", headerName: "Amount", flex: 1, minWidth: 150 },
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
            onClick={() => handleAllowanceDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        );
      },
    },
  ];

  // Allowance Handlers
  const handleAllowanceOpen = () => setAllowanceOpen(true);
  const handleAllowanceClose = () => {
    setAllowanceOpen(false);
    setSelectedAllowance("");
    setAllowanceAmount("");
  };

  const handleAllowanceAdd = async () => {
    if (!selectedAllowance || !allowanceAmount) {
      setAllowanceError("Allowance Type and Amount are required");
      return;
    }

    // Check if staffCode is available
    if (!staffCode) {
      setAllowanceError("Please save the employee first to add allowances");
      return;
    }

    setIsSubmittingAllowance(true);
    setAllowanceError(null);
    setAllowanceSuccess(null);

    try {
      // Post to API
      await employeeService.postEmployeeAllowance({
        staff_Code: staffCode,
        allowance_Type: selectedAllowance,
        allowance_Amount: allowanceAmount,
        companyID: companyID || "",
      });

      // Add to local state on success
      const newItem: AllowanceItem = {
        id: Date.now().toString(),
        allowances: selectedAllowance,
        amount: allowanceAmount,
      };
      setAllowanceRows((prev) => [newItem, ...prev]);
      setAllowanceSuccess("Allowance added successfully");

      // Notify parent if callback provided
      if (onAllowanceAdded) {
        onAllowanceAdded();
      }

      // Close dialog after a brief delay to show success message
      setTimeout(() => {
        handleAllowanceClose();
        setAllowanceSuccess(null);
      }, 1500);
    } catch (error: any) {
      console.error("Error adding allowance:", error);
      setAllowanceError(
        error.message || "Failed to add allowance. Please try again."
      );
    } finally {
      setIsSubmittingAllowance(false);
    }
  };

  const handleAllowanceDelete = (id: string) => {
    setAllowanceRows((prev) => prev.filter((r) => r.id !== id));
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
      {/* Top Section - 3 Columns on md+ */}
      <Box
        sx={{
          p: 2,
          border: "1px solid #E5E7EB",
          borderRadius: 2,
          backgroundColor: "#FAFAFA",
        }}
      >
        <Grid container spacing={2}>
          {/* Salary Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  color: "#011527",
                  fontSize: "1.1rem",
                }}
              >
                Salary
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {salaryFields.map((field) => (
                  <TextField
                    key={field.name}
                    label={field.label}
                    fullWidth
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* DataGrid Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  color: "#011527",
                  fontSize: "1.1rem",
                }}
              >
                Allowances
              </Typography>
              <Paper sx={{ height: 150, width: "100%" }}>
                <DataGrid
                  rows={allowanceRows}
                  columns={allowanceColumns}
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
                      <CustomNoRowsOverlay message="No records to display" />
                    ),
                  }}
                />
              </Paper>
            </Box>
          </Grid>

          {/* Allowance Input Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  color: "#011527",
                  fontSize: "1.1rem",
                }}
              >
                Add Allowance
              </Typography>
              {allowanceError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {allowanceError}
                </Alert>
              )}
              {allowanceSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {allowanceSuccess}
                </Alert>
              )}
              {!staffCode && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Please save the employee first before adding allowances
                </Alert>
              )}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Select Allowance</InputLabel>
                  <Select
                    value={selectedAllowance}
                    onChange={(e) => setSelectedAllowance(e.target.value)}
                    label="Select Allowance"
                    size="small"
                  >
                    <MenuItem value="Housing Allowance">
                      Housing Allowance
                    </MenuItem>
                    <MenuItem value="Transport Allowance">
                      Transport Allowance
                    </MenuItem>
                    <MenuItem value="Food Allowance">Food Allowance</MenuItem>
                    <MenuItem value="Medical Allowance">
                      Medical Allowance
                    </MenuItem>
                    <MenuItem value="Other Allowance">Other Allowance</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Amount"
                  value={allowanceAmount}
                  onChange={(e) => setAllowanceAmount(e.target.value)}
                  fullWidth
                  size="small"
                />
                <IconButtonPrimary
                  icon={
                    isSubmittingAllowance ? (
                      <CircularProgress size={20} />
                    ) : (
                      <AddIcon />
                    )
                  }
                  label={
                    isSubmittingAllowance ? "Adding..." : "Update Allowance"
                  }
                  onClick={handleAllowanceAdd}
                  disabled={isSubmittingAllowance || !staffCode}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* Contract Details Section */}
      <Box sx={{ mt: 3 }}>
        <FormGrid
          fields={contractDetailsFields}
          control={control}
          label="Contract Details"
          disabled={disabled}
        />
      </Box>

      {/* Bank Details Section */}
      <Box sx={{ mt: 3 }}>
        <FormGrid
          fields={bankDetailsFields}
          control={control}
          label="Bank Details"
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

export default PayrollForm;
