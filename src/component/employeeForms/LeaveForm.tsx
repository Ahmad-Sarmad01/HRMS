import { FC, useState, useEffect } from "react";
import { Control, FieldValues } from "react-hook-form";
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
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { employeeService, LeaveType } from "../../services/employeeService";
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

interface LeaveItem {
  id: string;
  sNo: number;
  fromDate: string;
  toDate: string;
  leaveType: string;
  duration: string;
  effDays: string;
  status: string;
}

interface LeaveFormProps<T extends FieldValues> {
  control: Control<T>;
  disabled?: boolean;
  staffCode?: string;
  companyID?: string;
}

const LeaveForm = <T extends FieldValues>({
  control,
  disabled = false,
  staffCode = "",
  companyID = "",
}: LeaveFormProps<T>) => {
  // Leave State
  const [leaveRows, setLeaveRows] = useState<LeaveItem[]>([]);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [duration, setDuration] = useState("");
  const [effDays, setEffDays] = useState("");
  const [status, setStatus] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  // API State
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Leave Types on mount
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await employeeService.getLeaveTypes();
        if (response.isSuccess && response.getSetupLeaveType) {
          setLeaveTypes(response.getSetupLeaveType);
        }
      } catch (err: any) {
        console.error("Error fetching leave types:", err);
        setError("Failed to fetch leave types");
      }
    };

    fetchLeaveTypes();
  }, []);

  // Fetch Leave Records on mount or when staffCode changes
  useEffect(() => {
    if (staffCode) {
      fetchLeaveRecords(staffCode);
    }
  }, [staffCode]);

  // Fetch Leave Records function
  const fetchLeaveRecords = async (search: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeService.getEmployeeLeave(search);
      if (response.isSuccess && response.employeeLeave) {
        const formattedRows = response.employeeLeave.map((leave, index) => ({
          id: `${leave.staff_Code}_${index}`,
          sNo: index + 1,
          fromDate: leave.from_Date,
          toDate: leave.to_Date,
          leaveType: leave.leave_Type,
          duration: leave.duration,
          effDays: leave.effective_Days,
          status: leave.status,
        }));
        setLeaveRows(formattedRows);
      }
    } catch (err: any) {
      console.error("Error fetching leave records:", err);
      setError("Failed to fetch leave records");
    } finally {
      setLoading(false);
    }
  };

  // Leave Columns
  const leaveColumns: GridColDef[] = [
    { field: "sNo", headerName: "S.No", width: 80 },
    { field: "fromDate", headerName: "From Date", flex: 1, minWidth: 120 },
    { field: "toDate", headerName: "To Date", flex: 1, minWidth: 120 },
    { field: "leaveType", headerName: "Leave Type", flex: 1, minWidth: 130 },
    { field: "duration", headerName: "Duration", flex: 1, minWidth: 100 },
    { field: "effDays", headerName: "Eff. Days", flex: 1, minWidth: 100 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
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
            onClick={() => handleLeaveDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        );
      },
    },
  ];

  // Leave Handlers
  const handleLeaveOpen = () => setLeaveOpen(true);
  const handleLeaveClose = () => {
    setLeaveOpen(false);
    setFromDate("");
    setToDate("");
    setLeaveType("");
    setDuration("");
    setEffDays("");
    setStatus("");
  };

  const handleLeaveAdd = async () => {
    if (!fromDate || !toDate) {
      setError("From Date and To Date are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const leaveData = {
        staff_Code: staffCode,
        from_Date: fromDate,
        to_Date: toDate,
        leave_Type: leaveType,
        duration: duration,
        effective_Days: effDays,
        status: status,
        companyID: companyID,
      };

      await employeeService.postEmployeeLeave(leaveData);

      // Add to local state
      const newItem: LeaveItem = {
        id: Date.now().toString(),
        sNo: leaveRows.length + 1,
        fromDate,
        toDate,
        leaveType,
        duration,
        effDays,
        status,
      };
      setLeaveRows((prev) => [newItem, ...prev]);

      // Optionally refresh the list from API
      if (staffCode) {
        await fetchLeaveRecords(staffCode);
      }

      handleLeaveClose();
    } catch (err: any) {
      console.error("Error adding leave:", err);
      setError("Failed to add leave record");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveDelete = (id: string) => {
    setLeaveRows((prev) => prev.filter((r) => r.id !== id));
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
      {/* Leave Section */}
      <Box
        sx={{
          mt: 2,
          p: 2,
          border: "1px solid #E5E7EB",
          borderRadius: 2,
          backgroundColor: "#FAFAFA",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Leave Records
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          <IconButtonPrimary
            icon={<AddIcon />}
            label="Add Leave"
            onClick={handleLeaveOpen}
          />
          <Box sx={{ display: "flex", gap: 1, flex: 1, maxWidth: 400 }}>
            <TextField
              size="small"
              placeholder="Search by staff code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={() => fetchLeaveRecords(searchTerm)}
              disabled={loading}
              sx={{
                backgroundColor: "#D9C48C",
                color: "#011527",
                textTransform: "none",
                "&:hover": { backgroundColor: "#C5B17A" },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Search"}
            </Button>
          </Box>
        </Box>

        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={leaveRows}
            columns={leaveColumns}
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
                <CustomNoRowsOverlay message="No leave records added yet" />
              ),
            }}
          />
        </Paper>
      </Box>

      {/* Leave Dialog */}
      <Dialog
        open={leaveOpen}
        onClose={handleLeaveClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Leave</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 1,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              label="From Date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="To Date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
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
              select
              label="Leave Type"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              fullWidth
            >
              {leaveTypes.map((type) => (
                <MenuItem key={type.id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
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
              label="Eff. Days"
              value={effDays}
              onChange={(e) => setEffDays(e.target.value)}
              fullWidth
            />
            <TextField
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLeaveClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleLeaveAdd}
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "#D9C48C",
              color: "#011527",
              textTransform: "none",
              "&:hover": { backgroundColor: "#C5B17A" },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Leave Section with FormGrid */}
      <Box sx={{ mt: 4 }}>
        <FormGrid
          control={control}
          label="Leave"
          disabled={disabled}
          fields={[
            {
              name: "openingLeave",
              label: "Opening Leave",
              type: "text",
              fieldSize: "normal",
              required: false,
            },
            {
              name: "openingDate",
              label: "Opening Date",
              type: "date",
              fieldSize: "normal",
              required: false,
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default LeaveForm;
