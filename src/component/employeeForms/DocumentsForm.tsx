import { FC, useState } from "react";
import { Control, FieldValues } from "react-hook-form";
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

interface DocumentItem {
  id: string;
  type: string;
  documentNo: string;
  issueDate: string;
  expiry: string;
  issuePlace: string;
}

interface DocumentsFormProps<T extends FieldValues> {
  control: Control<T>;
  disabled?: boolean;
}

const DocumentsForm = <T extends FieldValues>({
  control,
  disabled = false,
}: DocumentsFormProps<T>) => {
  const [rows, setRows] = useState<DocumentItem[]>([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Passport");
  const [documentNo, setDocumentNo] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiry, setExpiry] = useState("");
  const [issuePlace, setIssuePlace] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const columns: GridColDef[] = [
    { field: "sNo", headerName: "S.No", width: 80 },
    { field: "type", headerName: "Type", flex: 1, minWidth: 120 },
    { field: "documentNo", headerName: "Document No.", flex: 1, minWidth: 150 },
    { field: "issueDate", headerName: "Issue Date", flex: 1, minWidth: 120 },
    { field: "expiry", headerName: "Expiry Date", flex: 1, minWidth: 120 },
    { field: "issuePlace", headerName: "Issue Place", flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 100,
      align: "right",
      headerAlign: "right",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        );
      },
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setType("Passport");
    setDocumentNo("");
    setIssueDate("");
    setExpiry("");
    setIssuePlace("");
  };

  const handleAdd = () => {
    if (!documentNo) return;
    const newItem: DocumentItem & { sNo: number } = {
      id: Date.now().toString(),
      sNo: rows.length + 1,
      type,
      documentNo,
      issueDate,
      expiry,
      issuePlace,
    };
    setRows((prev) => [newItem, ...prev]);
    handleClose();
  };

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const CustomNoRowsOverlay = () => (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography color="text.secondary">No documents added yet</Typography>
    </Box>
  );

  return (
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
          label="Add Document"
          onClick={handleOpen}
        />
      </Box>

      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          onPaginationModelChange={(model: GridPaginationModel) =>
            setPaginationModel(model)
          }
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Document</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 1,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              fullWidth
              sx={{ height: 42 }}
            >
              <MenuItem value="Passport">Passport</MenuItem>
              <MenuItem value="Visa">Visa</MenuItem>
              <MenuItem value="Emirates ID">Emirates ID</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <TextField
              label="Document No."
              value={documentNo}
              onChange={(e) => setDocumentNo(e.target.value)}
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 4,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              label="Issue Date"
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Expiry Date"
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Issue Place"
              value={issuePlace}
              onChange={(e) => setIssuePlace(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleAdd}
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
    </Box>
  );
};

export default DocumentsForm;
