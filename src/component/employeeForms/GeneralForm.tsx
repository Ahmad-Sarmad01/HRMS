import { FC, useState } from "react";
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

interface QualificationItem {
  id: string;
  level: string;
  qualification: string;
  specialization: string;
  year: string;
  duration: string;
  mode: string;
  universityInstitute: string;
}

interface ExperienceItem {
  id: string;
  companyName: string;
  designation: string;
  fromDate: string;
  toDate: string;
  experience: string;
}

interface GeneralFormProps<T extends FieldValues> {
  control: Control<T>;
  disabled?: boolean;
  staffCode?: string;
  companyID?: string;
  branch?: string;
  onQualificationAdded?: () => void;
}

const GeneralForm = <T extends FieldValues>({
  control,
  disabled = false,
  staffCode,
  companyID,
  branch,
  onQualificationAdded,
}: GeneralFormProps<T>) => {
  const [qualificationSummary, setQualificationSummary] = useState("");
  const [internalExperience, setInternalExperience] = useState("");
  const [isSubmittingQualification, setIsSubmittingQualification] =
    useState(false);
  const [qualificationError, setQualificationError] = useState<string | null>(
    null
  );
  const [qualificationSuccess, setQualificationSuccess] = useState<
    string | null
  >(null);
  const [isSubmittingExperience, setIsSubmittingExperience] = useState(false);
  const [experienceError, setExperienceError] = useState<string | null>(null);
  const [experienceSuccess, setExperienceSuccess] = useState<string | null>(
    null
  );

  // Qualification State
  const [qualificationRows, setQualificationRows] = useState<
    QualificationItem[]
  >([]);
  const [qualificationOpen, setQualificationOpen] = useState(false);
  const [level, setLevel] = useState("");
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState("");
  const [universityInstitute, setUniversityInstitute] = useState("");
  const [qualPaginationModel, setQualPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize: 5,
    });

  // Experience State
  const [experienceRows, setExperienceRows] = useState<ExperienceItem[]>([]);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [experience, setExperience] = useState("");
  const [expPaginationModel, setExpPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize: 5,
    });

  // Qualification Columns
  const qualificationColumns: GridColDef[] = [
    { field: "level", headerName: "Level", flex: 1, minWidth: 50 },
    {
      field: "qualification",
      headerName: "Qualification",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 1,
      minWidth: 120,
    },
    { field: "year", headerName: "Year", width: 80 },
    { field: "duration", headerName: "Duration", flex: 1, minWidth: 100 },
    { field: "mode", headerName: "Mode", flex: 1, minWidth: 100 },
    {
      field: "universityInstitute",
      headerName: "University/Institute",
      flex: 1,
      minWidth: 150,
    },
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
            onClick={() => handleQualificationDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        );
      },
    },
  ];

  // Experience Columns
  const experienceColumns: GridColDef[] = [
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
      minWidth: 150,
    },
    { field: "designation", headerName: "Designation", flex: 1, minWidth: 140 },
    { field: "fromDate", headerName: "From Date", width: 120 },
    { field: "toDate", headerName: "To Date", width: 120 },
    { field: "experience", headerName: "Experience", flex: 1, minWidth: 200 },
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
            onClick={() => handleExperienceDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        );
      },
    },
  ];

  // Qualification Handlers
  const handleQualificationOpen = () => setQualificationOpen(true);
  const handleQualificationClose = () => {
    setQualificationOpen(false);
    setLevel("");
    setQualification("");
    setSpecialization("");
    setYear("");
    setDuration("");
    setMode("");
    setUniversityInstitute("");
  };

  const handleQualificationAdd = async () => {
    if (!qualification || !universityInstitute) {
      setQualificationError(
        "Qualification and University/Institute are required"
      );
      return;
    }

    // Check if staffCode is available
    if (!staffCode) {
      setQualificationError(
        "Please save the employee first to add qualifications"
      );
      return;
    }

    setIsSubmittingQualification(true);
    setQualificationError(null);
    setQualificationSuccess(null);

    try {
      // Post to API
      await employeeService.postEmployeeQualification({
        staff_Code: staffCode,
        action: "ADD",
        level: level,
        qualification: qualification,
        specialisation: specialization,
        year: year,
        duration: duration,
        mode: mode,
        university_Institution: universityInstitute,
        companyID: companyID || "",
        branch: branch || "",
      });

      // Add to local state on success
      const newItem: QualificationItem = {
        id: Date.now().toString(),
        level,
        qualification,
        specialization,
        year,
        duration,
        mode,
        universityInstitute,
      };
      setQualificationRows((prev) => [newItem, ...prev]);
      setQualificationSuccess("Qualification added successfully");

      // Notify parent if callback provided
      if (onQualificationAdded) {
        onQualificationAdded();
      }

      // Close dialog after a brief delay to show success message
      setTimeout(() => {
        handleQualificationClose();
        setQualificationSuccess(null);
      }, 1500);
    } catch (error: any) {
      console.error("Error adding qualification:", error);
      setQualificationError(
        error.message || "Failed to add qualification. Please try again."
      );
    } finally {
      setIsSubmittingQualification(false);
    }
  };

  const handleQualificationDelete = (id: string) => {
    setQualificationRows((prev) => prev.filter((r) => r.id !== id));
  };

  // Experience Handlers
  const handleExperienceOpen = () => setExperienceOpen(true);
  const handleExperienceClose = () => {
    setExperienceOpen(false);
    setCompanyName("");
    setDesignation("");
    setFromDate("");
    setToDate("");
    setExperience("");
  };

  const handleExperienceAdd = async () => {
    if (!companyName || !designation) {
      setExperienceError("Company Name and Designation are required");
      return;
    }

    // Check if staffCode is available
    if (!staffCode) {
      setExperienceError("Please save the employee first to add experience");
      return;
    }

    setIsSubmittingExperience(true);
    setExperienceError(null);
    setExperienceSuccess(null);

    try {
      // Post to API
      await employeeService.postEmployeeExperience({
        staff_Code: staffCode,
        action: "ADD",
        company_Name: companyName,
        designation: designation,
        from_Date: fromDate,
        to_Date: toDate,
        experience: experience,
        companyID: companyID || "",
        branch: branch || "",
      });

      // Add to local state on success
      const newItem: ExperienceItem = {
        id: Date.now().toString(),
        companyName,
        designation,
        fromDate,
        toDate,
        experience,
      };
      setExperienceRows((prev) => [newItem, ...prev]);
      setExperienceSuccess("Experience added successfully");

      // Notify parent if callback provided
      if (onQualificationAdded) {
        onQualificationAdded();
      }

      // Close dialog after a brief delay to show success message
      setTimeout(() => {
        handleExperienceClose();
        setExperienceSuccess(null);
      }, 1500);
    } catch (error: any) {
      console.error("Error adding experience:", error);
      setExperienceError(
        error.message || "Failed to add experience. Please try again."
      );
    } finally {
      setIsSubmittingExperience(false);
    }
  };

  const handleExperienceDelete = (id: string) => {
    setExperienceRows((prev) => prev.filter((r) => r.id !== id));
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
      {/* Qualification Section */}
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
          Qualification
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Qualification Summary"
            value={qualificationSummary}
            onChange={(e) => setQualificationSummary(e.target.value)}
            sx={{ minWidth: "40%" }}
          />
          <IconButtonPrimary
            icon={<AddIcon />}
            label="Add Qualification"
            onClick={handleQualificationOpen}
          />
        </Box>

        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={qualificationRows}
            columns={qualificationColumns}
            initialState={{
              pagination: { paginationModel: qualPaginationModel },
            }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            onPaginationModelChange={(model: GridPaginationModel) =>
              setQualPaginationModel(model)
            }
            slots={{
              noRowsOverlay: () => (
                <CustomNoRowsOverlay message="No qualification records added yet" />
              ),
            }}
          />
        </Paper>
      </Box>

      {/* Experience Section */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          border: "1px solid #E5E7EB",
          borderRadius: 2,
          backgroundColor: "#FAFAFA",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Experience
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Internal Experience"
            value={internalExperience}
            onChange={(e) => setInternalExperience(e.target.value)}
            sx={{ minWidth: "40%" }}
          />
          <IconButtonPrimary
            icon={<AddIcon />}
            label="Add Experience"
            onClick={handleExperienceOpen}
          />
        </Box>

        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={experienceRows}
            columns={experienceColumns}
            initialState={{
              pagination: { paginationModel: expPaginationModel },
            }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            onPaginationModelChange={(model: GridPaginationModel) =>
              setExpPaginationModel(model)
            }
            slots={{
              noRowsOverlay: () => (
                <CustomNoRowsOverlay message="No experience records added yet" />
              ),
            }}
          />
        </Paper>
      </Box>

      {/* Qualification Dialog */}
      <Dialog
        open={qualificationOpen}
        onClose={handleQualificationClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Qualification</DialogTitle>
        <DialogContent>
          {qualificationError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {qualificationError}
            </Alert>
          )}
          {qualificationSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {qualificationSuccess}
            </Alert>
          )}
          {!staffCode && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Please save the employee first before adding qualifications
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
              label="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              fullWidth
            />
            <TextField
              label="Qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
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
              label="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              fullWidth
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
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
              label="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              fullWidth
            />
            <TextField
              label="Mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="University/Institute"
              value={universityInstitute}
              onChange={(e) => setUniversityInstitute(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleQualificationClose}
            disabled={isSubmittingQualification}
          >
            Cancel
          </Button>
          <Button
            onClick={handleQualificationAdd}
            variant="contained"
            disabled={isSubmittingQualification || !staffCode}
            sx={{
              backgroundColor: "#D9C48C",
              color: "#011527",
              textTransform: "none",
            }}
          >
            {isSubmittingQualification ? (
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

      {/* Experience Dialog */}
      <Dialog
        open={experienceOpen}
        onClose={handleExperienceClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Experience</DialogTitle>
        <DialogContent>
          {experienceError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {experienceError}
            </Alert>
          )}
          {experienceSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {experienceSuccess}
            </Alert>
          )}
          {!staffCode && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Please save the employee first before adding experience
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
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
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
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleExperienceClose}
            disabled={isSubmittingExperience}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExperienceAdd}
            variant="contained"
            disabled={isSubmittingExperience || !staffCode}
            sx={{
              backgroundColor: "#D9C48C",
              color: "#011527",
              textTransform: "none",
            }}
          >
            {isSubmittingExperience ? (
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

export default GeneralForm;
