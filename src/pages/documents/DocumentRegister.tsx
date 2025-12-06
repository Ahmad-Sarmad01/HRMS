import React, { FC, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableViewIcon from "@mui/icons-material/TableView";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RestoreIcon from "@mui/icons-material/Restore";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import FormGrid from "../../component/formFields/FormGrid";

interface DocumentRecord {
  id: string;
  code: string;
  staffName: string;
  passportNo: string;
  passportExpiryDate: string;
  visaNo: string;
  visaExpiryDate: string;
  emirateId: string;
  emirateIdExpiryDate: string;
  designation: string;
  category: string;
  jDate: string;
  employeeBranch: string;
  status: string;
}

const DocumentRegister: FC = () => {
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [daysValue, setDaysValue] = useState<number>(30);
  const [rows, setRows] = useState<DocumentRecord[]>([]);
  const [open, setOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [formData, setFormData] = useState({
    code: "",
    staffName: "",
    passportNo: "",
    passportExpiryDate: "",
    visaNo: "",
    visaExpiryDate: "",
    emirateId: "",
    emirateIdExpiryDate: "",
    designation: "",
    category: "",
    jDate: "",
    employeeBranch: "",
    status: "",
  });

  const documentFormFields = [
    { name: "code", label: "Code", type: "text", required: true },
    { name: "staffName", label: "Staff Name", type: "text", required: true },
    { name: "passportNo", label: "Passport No.", type: "text", required: true },
    {
      name: "passportExpiryDate",
      label: "Passport Expiry Date",
      type: "date",
      required: true,
    },
    { name: "visaNo", label: "Visa No.", type: "text" },
    { name: "visaExpiryDate", label: "Visa Expiry Date", type: "date" },
    { name: "emirateId", label: "Emirates ID", type: "text" },
    {
      name: "emirateIdExpiryDate",
      label: "Emirates ID Expiry Date",
      type: "date",
    },
    { name: "designation", label: "Designation", type: "text", required: true },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: ["Teaching", "Non-Teaching", "Administrative", "Support Staff"],
    },
    { name: "jDate", label: "Joining Date", type: "date", required: true },
    {
      name: "employeeBranch",
      label: "Employee Branch",
      type: "select",
      options: ["Main Branch", "Branch 1", "Branch 2", "Branch 3"],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive", "On Leave", "Resigned"],
    },
  ];

  const columns: GridColDef[] = [
    { field: "sNo", headerName: "S.No", width: 50 },
    { field: "code", headerName: "Code", width: 80 },
    { field: "staffName", headerName: "Staff Name", flex: 1, minWidth: 150 },
    { field: "passportNo", headerName: "Passport No.", width: 130 },
    {
      field: "passportExpiryDate",
      headerName: "Passport ExpiryDate",
      width: 100,
    },
    { field: "visaNo", headerName: "Visa No.", width: 120 },
    { field: "visaExpiryDate", headerName: "Visa ExpiryDate", width: 100 },
    { field: "emirateId", headerName: "EmiratesID", width: 130 },
    {
      field: "emirateIdExpiryDate",
      headerName: "EmiratesID ExpiryDate",
      width: 100,
    },
    { field: "designation", headerName: "Designation", width: 130 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "jDate", headerName: "J.Date", width: 100 },
    { field: "employeeBranch", headerName: "Employee Branch", width: 130 },
    { field: "status", headerName: "Status", width: 100 },
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
    setFormData({
      code: "",
      staffName: "",
      passportNo: "",
      passportExpiryDate: "",
      visaNo: "",
      visaExpiryDate: "",
      emirateId: "",
      emirateIdExpiryDate: "",
      designation: "",
      category: "",
      jDate: "",
      employeeBranch: "",
      status: "",
    });
  };

  const handleAdd = () => {
    if (!formData.code || !formData.staffName || !formData.passportNo) return;

    const newRecord: DocumentRecord & { sNo: number } = {
      id: Date.now().toString(),
      sNo: rows.length + 1,
      ...formData,
    };

    setRows((prev) => [newRecord, ...prev]);
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
      <Typography color="text.secondary">
        No documents registered yet
      </Typography>
    </Box>
  );

  const PillButton = ({
    children,
    index,
    onClick,
  }: {
    children: React.ReactNode;
    index: number;
    onClick: (i: number) => void;
  }) => {
    const isActive = index === activeBtn;

    return (
      <Box
        component="button"
        onClick={() => onClick(index)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: { xs: 1, sm: 2 },
          py: { xs: 0.25, sm: 0.5 },
          borderRadius: "12px",
          border: "1px solid var(--primary)",
          color: isActive ? "var(--text-light)" : "var(--primary)",
          bgcolor: isActive ? "var(--primary)" : "transparent",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: isActive
            ? "0 4px 8px rgba(0,0,0,0.2)"
            : "0 2px 4px rgba(0,0,0,0.1)",
          fontSize: { xs: "0.75rem", sm: "0.95rem" },
          "&:hover": isActive
            ? { transform: "translateY(-2px)" }
            : {
                bgcolor: "var(--primary)",
                color: "var(--text-light)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transform: "translateY(-2px)",
              },
        }}
      >
        {/* Render children; hide plain text on extra-small screens to keep buttons compact */}
        {React.Children.map(children, (child) => {
          if (typeof child === "string" || typeof child === "number") {
            return (
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                {child}
              </Box>
            );
          }
          return child;
        })}
      </Box>
    );
  };

  return (
    <Box>
      <Box
        gap={1}
        height={{ xs: "auto", sm: 40 }}
        boxShadow="0 2px 6px rgba(0,0,0,0.05)"
        borderRadius={2}
        p={{ xs: 0.5, sm: 1 }}
        border="1px solid var(--primary)"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 0.5, sm: 1 },
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <PillButton index={0} onClick={handleOpen}>
            <AddIcon fontSize="small" />
            New
          </PillButton>
          <PillButton index={1} onClick={(index) => setActiveBtn(index)}>
            <TableViewIcon fontSize="small" />
            Excel
          </PillButton>
          <PillButton index={2} onClick={(index) => setActiveBtn(index)}>
            <PictureAsPdfIcon fontSize="small" />
            PDF
          </PillButton>
          <PillButton index={3} onClick={(index) => setActiveBtn(index)}>
            <RestoreIcon fontSize="small" />
            Default
          </PillButton>
          <PillButton index={4} onClick={(index) => setActiveBtn(index)}>
            <FilterAltOffIcon fontSize="small" />
            Clear Filter
          </PillButton>
          <TextField
            size="small"
            placeholder="Employee ID / Code"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              width: { xs: 140, sm: 200 },
              mt: { xs: 0.5, sm: 0 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                "& fieldset": {
                  borderColor: "var(--primary)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--primary)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--primary)",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    sx={{
                      color: "var(--primary)",
                      "&:hover": {
                        backgroundColor: "rgba(217, 196, 140, 0.1)",
                      },
                    }}
                  >
                    <PersonSearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            size="small"
            type="number"
            value={daysValue}
            onChange={(e) => setDaysValue(Number(e.target.value))}
            sx={{
              width: { xs: 80, sm: 100 },
              mt: { xs: 0.5, sm: 0 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                "& fieldset": {
                  borderColor: "var(--primary)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--primary)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--primary)",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--primary)",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Days
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            color: "var(--primary)",
            pr: 1,
          }}
        >
          Document Register
        </Box>
      </Box>

      {/* DataGrid Section */}
      <Box sx={{ overflowX: "auto" }}>
        <Paper sx={{ mt: 3, width: "100%", height: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 25, 50]}
            onPaginationModelChange={(model: GridPaginationModel) =>
              setPaginationModel(model)
            }
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{ border: 0, width: { md: "1250px" } }}
          />
        </Paper>
      </Box>

      {/* Add Document Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Add New Document Record</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormGrid fields={documentFormFields} columns={3} />
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
              "&:hover": {
                backgroundColor: "#c4b17d",
              },
            }}
          >
            Add Record
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentRegister;
