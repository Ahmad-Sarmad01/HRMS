import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { clearSelectedEmployee } from "../../store/slices/employeeSlice";
import {
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { PrimaryForm } from "../../component/employeeForms";
import EmployeeRegistrationButtons from "../../component/employee/EmployeeRegistrationButtons";
import EmployeeFormTabs from "../../component/employee/EmployeeFormTabs";
import {
  getDefaultFormValues,
  convertToAPIFormat,
  convertFromAPIFormat,
  fieldNameMapping,
} from "../../utils/employeeFieldMapping";
import { employeeService } from "../../services/employeeService";
import { setupService, SetupOption } from "../../services/setupService";

const EmployeeRegistration: FC = () => {
  const dispatch = useDispatch();
  const { selectedEmployee } = useSelector(
    (state: RootState) => state.employee
  );
  const [activeBtn, setActiveBtn] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewConfirmDialog, setShowNewConfirmDialog] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  // Setup options state
  const [setupOptions, setSetupOptions] = useState<{
    status: SetupOption[];
    branch: SetupOption[];
    designation: SetupOption[];
    subStatus: SetupOption[];
    nationality: SetupOption[];
    gender: SetupOption[];
    visaType: SetupOption[];
    section: SetupOption[];
    visaSponsor: SetupOption[];
    employmentType: SetupOption[];
    lineManager: SetupOption[];
    labourCardStatus: SetupOption[];
    position: SetupOption[];
    addResponsibility: SetupOption[];
    religion: SetupOption[];
  }>({
    status: [],
    branch: [],
    designation: [],
    subStatus: [],
    nationality: [],
    gender: [],
    visaType: [],
    section: [],
    visaSponsor: [],
    employmentType: [],
    lineManager: [],
    labourCardStatus: [],
    position: [],
    addResponsibility: [],
    religion: [],
  });
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: getDefaultFormValues(),
    mode: "onBlur",
  });

  // Fetch setup options on component mount
  useEffect(() => {
    const fetchSetupOptions = async () => {
      try {
        setIsLoadingOptions(true);
        const options = await setupService.getAllSetupOptions();
        setSetupOptions({
          status: options.status || [],
          branch: options.branch || [],
          designation: options.designation || [],
          subStatus: options.subStatus || [],
          nationality: options.nationality || [],
          gender: options.gender || [],
          visaType: options.visaType || [],
          section: options.section || [],
          visaSponsor: options.visaSponsor || [],
          employmentType: options.employmentType || [],
          lineManager: options.lineManager || [],
          labourCardStatus: options.labourCardStatus || [],
          position: options.position || [],
          addResponsibility: options.addResponsibility || [],
          religion: options.religion || [],
        });
      } catch (error) {
        console.error("Error loading setup options:", error);
        setSnackbar({
          open: true,
          message: "Failed to load dropdown options",
          severity: "error",
        });
      } finally {
        setIsLoadingOptions(false);
      }
    };

    fetchSetupOptions();
  }, []);

  // Load employee from slice on mount
  useEffect(() => {
    if (selectedEmployee) {
      const formData = convertFromAPIFormat(selectedEmployee);
      reset(formData);
    }
  }, [selectedEmployee, reset]);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      // Convert to API format directly from submitted form data
      const apiBody = convertToAPIFormat(data);

      console.log("Submitting data:", apiBody);

      // Use PUT if editing existing employee, POST if creating new
      const response = selectedEmployee
        ? await employeeService.updateEmployee(apiBody as any)
        : await employeeService.createEmployee(apiBody as any);

      if (!response.isSuccess) {
        throw new Error(
          response.message ||
            `Failed to ${selectedEmployee ? "update" : "register"} employee`
        );
      }

      setSnackbar({
        open: true,
        message: selectedEmployee
          ? "Employee updated successfully!"
          : "Employee registered successfully!",
        severity: "success",
      });

      reset(getDefaultFormValues());

      console.log("Response:", response);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSnackbar({
        open: true,
        message:
          error.message || "Failed to register employee. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleNewClick = () => {
    setShowNewConfirmDialog(true);
  };

  const handleConfirmNew = () => {
    reset(getDefaultFormValues());
    dispatch(clearSelectedEmployee());
    setShowNewConfirmDialog(false);
  };

  const handleCancelNew = () => {
    setShowNewConfirmDialog(false);
  };

  const handlePillButtonClick = async (index: number, title: string) => {
    setActiveBtn(index);

    if (title === "New") {
      handleNewClick();
    } else if (title === "Save") {
      // Trigger validation first
      const isValid = await trigger();
      if (!isValid) {
        setSnackbar({
          open: true,
          message:
            "Please fill all the required fields correctly before saving.",
          severity: "error",
        });
        return;
      }
      // Trigger form submission
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {selectedEmployee
            ? "View Employee Registration"
            : "New Employee Registration"}
        </Box>
        <EmployeeRegistrationButtons
          activeBtn={activeBtn}
          isSubmitting={isSubmitting}
          onButtonClick={handlePillButtonClick}
        />
      </Box>

      {isLoadingOptions ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <PrimaryForm
            control={control}
            statusOptions={setupOptions.status}
            branchOptions={setupOptions.branch}
            designationOptions={setupOptions.designation}
            subStatusOptions={setupOptions.subStatus}
            nationalityOptions={setupOptions.nationality}
          />

          <EmployeeFormTabs
            control={control}
            setupOptions={setupOptions}
            errors={errors}
          />
        </>
      )}

      {/* Snackbar for notifications */}
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

      {/* Confirmation Dialog for New button */}
      <Dialog
        open={showNewConfirmDialog}
        onClose={handleCancelNew}
        aria-labelledby="new-confirm-dialog-title"
        aria-describedby="new-confirm-dialog-description"
      >
        <DialogTitle id="new-confirm-dialog-title">Clear Form?</DialogTitle>
        <DialogContent>
          <DialogContentText id="new-confirm-dialog-description">
            Are you sure you want to clear the form? All unsaved data will be
            lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelNew} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmNew} color="error" autoFocus>
            Clear Form
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default EmployeeRegistration;
