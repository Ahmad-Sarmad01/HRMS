import { FC, useState } from "react";
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

const LeaveForm: FC = () => {
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

  const handleLeaveAdd = () => {
    if (!fromDate || !toDate) return;
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
    handleLeaveClose();
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <IconButtonPrimary
            icon={<AddIcon />}
            label="Add Leave"
            onClick={handleLeaveOpen}
          />
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
              label="Leave Type"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              fullWidth
            />
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
          <Button onClick={handleLeaveClose}>Cancel</Button>
          <Button
            onClick={handleLeaveAdd}
            variant="contained"
            sx={{
              backgroundColor: "#D9C48C",
              color: "#011527",
              textTransform: "none",
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Leave Section with FormGrid */}
      <Box sx={{ mt: 4 }}>
        <FormGrid
          label="Leave"
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
